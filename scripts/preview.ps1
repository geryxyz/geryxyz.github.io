#Requires -Version 5.1
[CmdletBinding()]
param(
    [ValidateRange(1024, 65535)]
    [int]$Port = 8080,
    [ValidateRange(1024, 65535)]
    [int]$WebSocketPort = 3001,
    [switch]$BuildOnly
)

$ErrorActionPreference = 'Stop'
# Avoid Windows PowerShell's progress overlay in integrated terminals.
$ProgressPreference = 'SilentlyContinue'
$repoRoot = Split-Path -Parent $PSScriptRoot
$contentPath = Join-Path $repoRoot 'content'
$configPath = Join-Path $repoRoot 'quartz.config.yaml'
if (-not (Test-Path -LiteralPath $configPath -PathType Leaf)) {
    throw "Missing site settings: $configPath"
}
if (-not (Test-Path -LiteralPath (Join-Path $contentPath 'index.md') -PathType Leaf)) {
    throw "Add content/index.md before starting the preview. Repository: $repoRoot"
}

# Read the CI pin so local previews and CI use the same Quartz release.
$workflow = Get-Content -LiteralPath (Join-Path $repoRoot '.github/workflows/deploy.yml') -Raw
$refMatch = [regex]::Match($workflow, '(?m)^\s+QUARTZ_REF:\s*([a-f0-9]{40})\s*$')
if (-not $refMatch.Success) {
    throw 'Cannot read QUARTZ_REF from the CI workflow.'
}

$nodePath = (Get-Command node -CommandType Application -ErrorAction Stop | Select-Object -First 1).Source
$gitPath = (Get-Command git -CommandType Application -ErrorAction Stop | Select-Object -First 1).Source
$nodeVersion = [version]((& $nodePath --version).TrimStart('v'))
if ($nodeVersion.Major -lt 24) {
    throw "Node.js 24 or newer is required to match CI. Found $nodeVersion."
}

# Invoke npm's CLI directly to avoid broken npm.ps1/npm.cmd PATH wrappers.
$nodeDirectory = Split-Path -Parent $nodePath
$npmCandidates = @(
    (Join-Path $nodeDirectory 'node_modules/npm/bin/npm-cli.js'),
    (Join-Path $nodeDirectory '../lib/node_modules/npm/bin/npm-cli.js')
)
foreach ($command in @(Get-Command npm -All -ErrorAction SilentlyContinue)) {
    $npmCandidates += Join-Path (Split-Path -Parent $command.Source) 'npm-cli.js'
}
$npmCli = $npmCandidates | Where-Object { Test-Path -LiteralPath $_ -PathType Leaf } | Select-Object -First 1
if (-not $npmCli) {
    throw 'Cannot locate npm-cli.js. Install Node.js 24 with npm included.'
}

$tempRoot = [IO.Path]::GetFullPath([IO.Path]::GetTempPath())
$previewPath = Join-Path $tempRoot ('geryxyz-quartz-preview-' + [guid]::NewGuid().ToString('N'))
$quartzPath = Join-Path $previewPath 'quartz'
$previousLocation = Get-Location
$previousPath = $env:PATH
$previousNpmCache = $env:npm_config_cache
$previousSecurityProtocol = [Net.ServicePointManager]::SecurityProtocol

function Invoke-NodeChecked {
    param([string[]]$Arguments)
    & $nodePath @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "Node command failed with exit code $LASTEXITCODE."
    }
}

try {
    # Windows PowerShell 5.1 may otherwise use older TLS defaults.
    [Net.ServicePointManager]::SecurityProtocol = $previousSecurityProtocol -bor [Net.SecurityProtocolType]::Tls12
    New-Item -ItemType Directory -Path $quartzPath -Force | Out-Null
    # Quartz may invoke npm while resolving plugins; give its children the same setup.
    $env:PATH = $nodeDirectory + [IO.Path]::PathSeparator + $previousPath
    $env:npm_config_cache = Join-Path $previewPath 'npm-cache'
    Write-Host "Preparing Quartz in $previewPath"
    $archivePath = Join-Path $previewPath 'quartz.zip'
    Write-Host 'Downloading Quartz...'
    Invoke-WebRequest -UseBasicParsing -Uri "https://codeload.github.com/jackyzha0/quartz/zip/$($refMatch.Groups[1].Value)" -OutFile $archivePath
    Write-Host 'Extracting Quartz...'
    Expand-Archive -LiteralPath $archivePath -DestinationPath $quartzPath
    $quartzPath = Join-Path $quartzPath ('quartz-' + $refMatch.Groups[1].Value)
    Set-Location -LiteralPath $quartzPath

    # Initialize only the disposable installation for Quartz's Git tooling.
    & $gitPath init --quiet
    if ($LASTEXITCODE -ne 0) {
        throw "Could not initialize the temporary Quartz repository (exit $LASTEXITCODE)."
    }

    # Keep npm's download cache inside the disposable directory too.
    Write-Host 'Installing dependencies...'
    Invoke-NodeChecked -Arguments @($npmCli, 'ci', '--cache', (Join-Path $previewPath 'npm-cache'))
    Invoke-NodeChecked -Arguments @((Join-Path $repoRoot 'scripts/patch-quartz.mjs'), $quartzPath)
    $cli = Join-Path $quartzPath 'quartz/bootstrap-cli.mjs'
    Write-Host 'Configuring the preview...'
    Copy-Item -LiteralPath $configPath -Destination (Join-Path $quartzPath 'quartz.config.yaml')
    Copy-Item -LiteralPath (Join-Path $repoRoot 'site/quartz.ts') -Destination (Join-Path $quartzPath 'quartz.ts')
    Copy-Item -LiteralPath (Join-Path $repoRoot 'site/Profile.tsx') -Destination (Join-Path $quartzPath 'quartz/components/Profile.tsx')
    Invoke-NodeChecked -Arguments @($cli, 'plugin', 'install')

    if ($BuildOnly) {
        Invoke-NodeChecked -Arguments @($cli, 'build', '--directory', $contentPath)
        if (-not (Test-Path -LiteralPath (Join-Path $quartzPath 'public/index.html'))) {
            throw 'Build did not produce public/index.html.'
        }
        $homepage = Get-Content -LiteralPath (Join-Path $quartzPath 'public/index.html') -Raw
        if ($homepage -notmatch 'class="profile-photo internal"' -or
            $homepage -notmatch 'src="[^\"]*assets/images/bio-photo.jpg"' -or
            -not (Test-Path -LiteralPath (Join-Path $quartzPath 'public/assets/images/bio-photo.jpg'))) {
            throw 'Build is missing the site-wide profile component or its image asset.'
        }
        Invoke-NodeChecked -Arguments @((Join-Path $repoRoot 'scripts/verify-graph.mjs'), $quartzPath)
        Write-Host 'Build verified successfully.'
    } else {
        Write-Host "Preview: http://localhost:$Port - press Ctrl+C to stop and clean up."
        # Read/watch the original content directly: no symlinks or admin rights needed.
        Invoke-NodeChecked -Arguments @(
            $cli, 'build', '--directory', $contentPath, '--serve',
            '--port', "$Port", '--wsPort', "$WebSocketPort"
        )
    }
}
finally {
    [Net.ServicePointManager]::SecurityProtocol = $previousSecurityProtocol
    $env:PATH = $previousPath
    $env:npm_config_cache = $previousNpmCache
    Set-Location -LiteralPath $previousLocation.Path
    # Validate the exact temporary target before recursive removal.
    $resolvedPreview = [IO.Path]::GetFullPath($previewPath)
    $expectedParent = $tempRoot.TrimEnd([IO.Path]::DirectorySeparatorChar, [IO.Path]::AltDirectorySeparatorChar)
    if ((Split-Path -Parent $resolvedPreview) -ne $expectedParent -or
        (Split-Path -Leaf $resolvedPreview) -notmatch '^geryxyz-quartz-preview-[a-f0-9]{32}$') {
        throw "Refusing cleanup outside the preview temporary directory: $resolvedPreview"
    }
    if (Test-Path -LiteralPath $resolvedPreview) {
        Remove-Item -LiteralPath $resolvedPreview -Recurse -Force
        Write-Host 'Removed temporary Quartz preview files.'
    }
}
