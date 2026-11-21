# Personal website

The previous Jekyll website is archived in `legacy/`. The new website uses Quartz 5 and GitHub Pages, with Quartz installed temporarily for CI and local previews.

## Content

Place publishable Markdown and assets in `content/`, starting with `content/index.md`. Only this directory is imported into the generated site; `legacy/` is not published.

There is no Quartz source, npm dependency tree, or generated website committed to this repository.

## Build and deployment

`.github/workflows/deploy.yml` builds pull requests targeting `master`. Pushes to `master` build and deploy to GitHub Pages. Manual runs are also available; only runs on `master` deploy.

Each build:

1. Downloads Quartz v5.1.0 at the exact commit specified by `QUARTZ_REF` into the runner's temporary directory.
2. Sets up Node.js 24 and installs Quartz's dependencies using its upstream `package-lock.json` and `npm ci`.
3. Copies the repository's `quartz.config.yaml` into the temporary installation and runs `quartz plugin install`.
4. Builds the site, verifies its homepage, and uploads the generated `public/` directory for deployment on `master`.
5. Publishes that artifact with GitHub's official Pages action. The temporary Quartz installation disappears when the hosted runner is discarded.

No dependency cache is retained by this workflow. The generated Pages artifact is uploaded for deployment, subject to GitHub's artifact retention policy. The configured plugins are standard npm plugins covered by Quartz's upstream dependency lockfile. No additional Git plugins or Obsidian community plugins are needed.

To update Quartz, change `QUARTZ_REF` to a reviewed release commit and validate the build in a pull request.

## Site settings

Edit `quartz.config.yaml` at the repository root for the site title, base URL, language, theme, link resolution, and enabled Quartz plugins. Both CI and local preview copy this same file into their temporary installation. The required theme settings are explicitly included from Quartz's standard theme; do not remove the theme block. Analytics are disabled.

Restart the local preview after changing this configuration; only content edits are watched in place. Add extra plugins only when a concrete feature needs them. Git-sourced plugins would also need a persistent `quartz.lock.json` and corresponding build support to keep their versions reproducible.

## First deployment

1. Add `content/index.md` and any initial pages/assets.
2. In **Settings → Pages → Build and deployment**, select **GitHub Actions** as the source. If the `github-pages` environment restricts deployment branches, allow `master`.
3. Merge the content and workflow into `master`.

Pull requests have read-only repository permissions and cannot deploy. No personal access token is required.

See the [Quartz setup command](https://quartz.jzhao.xyz/cli/create) and [hosting documentation](https://quartz.jzhao.xyz/hosting).

## Local preview

Use the built-in Windows PowerShell 5.1 with Git and Node.js 24 (including npm) installed, then add `content/index.md` and run from the repository root:

```powershell
powershell.exe -NoProfile -File .\scripts\preview.ps1
```

Open http://localhost:8080. Edits in `content/` are watched directly without symlinks or administrator rights. Use `-Port 8081 -WebSocketPort 3002` if the default ports are occupied.

For a build check without starting a server, run `powershell.exe -NoProfile -File .\scripts\preview.ps1 -BuildOnly`. It verifies that a homepage was generated, then cleans up the temporary installation and output.

The script reads the Quartz version from the CI workflow, downloads Quartz into a unique OS temporary directory, installs it there, and copies the persistent site settings from `quartz.config.yaml`. Its `finally` block removes that directory on normal exit, build failure, or Ctrl+C and restores your original working directory. Forcibly killing PowerShell, closing its host, or shutting down the computer can prevent cleanup; any leftover directory is named `geryxyz-quartz-preview-*` in your OS temporary folder.

## Commits

Use Conventional Commits, for example `feat: add research page` or `ci: configure Quartz Pages deployment`.
