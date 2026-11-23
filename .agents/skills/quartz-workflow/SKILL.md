---
name: quartz-workflow
description: Maintain or troubleshoot this repository's temporary Quartz installation, persistent configuration, Windows PowerShell preview, and GitHub Pages CI workflow.
---

# Quartz workflow

Read `AGENTS.md`, `README.md`, `quartz.config.yaml`, `scripts/preview.ps1`, and `.github/workflows/deploy.yml` as needed. These files are the implementation and configuration sources of truth.

## Maintain the architecture

- Install Quartz only in unique temporary directories for preview and CI. Do not vendor it, add it as a submodule, or introduce root npm dependencies without an explicit architecture change.
- Keep the exact Quartz commit in the workflow's `QUARTZ_REF`; preview reads that pin. Consult source at that revision for version-specific behavior.
- Copy the repository-owned `quartz.config.yaml` before plugin installation and building. Do not run `quartz create` afterward: it can overwrite the intended configuration.
- Keep the complete theme explicit. The emitter reads `configuration.theme.fontOrigin`; missing theme settings are not automatically supplied.
- Preserve standard graph view. A single homepage produces one graph node; connections grow as pages link together.
- Prefer plugins already covered by the pinned upstream npm lockfile. Git plugins need persistent version locking and support for copying that lockfile into both builds.
- Build only `content/`, never the repository root or `legacy/`.
- Keep PR builds read-only. Deployment belongs to the separate job after a successful build on `master`, with Pages permissions scoped to that job.

## Windows compatibility and cleanup

- Support built-in Windows PowerShell 5.1 and its .NET Framework APIs. Do not use PowerShell 7-only APIs such as `Path.TrimEndingDirectorySeparator`.
- Preserve direct npm CLI invocation and selection of a single Node/Git executable when PATH contains multiple installations.
- Use plain status output, `UseBasicParsing`, TLS 1.2 support, and suppressed progress overlays for downloads.
- Keep installation, cache, and generated output temporary. Read/watch original content without symlinks or administrator privileges.
- Preserve `finally` cleanup on normal exit, failure, and Ctrl+C, plus restoration of working directory and modified environment settings. Before recursive deletion, verify the resolved target is inside the expected temporary parent and matches the generated preview-directory name.
- Do not promise cleanup after a forced process kill or shutdown. Do not delete unrelated temporary folders or terminate unrelated Node processes.

## Verification

Run from the repository root:

```powershell
powershell.exe -NoProfile -File .\scripts\preview.ps1 -BuildOnly
```

This downloads the pinned engine, installs dependencies, builds the actual content, checks the homepage, and cleans up. For interactive rendering, omit `-BuildOnly`; stop with Ctrl+C. Restart preview after persistent settings change because configuration is copied at startup.

After script edits, check parsing in Windows PowerShell 5.1 itself. After build/configuration changes, run a full build when possible; syntax-only checks are insufficient. Inspect browser rendering when the changed behavior requires it. Local success does not prove GitHub deployment permissions.

For failures, distinguish the first causal error from subsequent npm cleanup messages. Inspect the failing pinned source before changing dependencies or disabling core emitters. Keep CI and preview fixes aligned. Report actual verification, cleanup results, and any remaining blockers.
