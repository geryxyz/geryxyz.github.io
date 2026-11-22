# Repository guidance

## Purpose and approach

This is Gergő Balogh's public personal and professional website and a Markdown collection usable as an Obsidian vault. Rebuild and migrate gradually from the previous Jekyll site in `legacy/`.

- Prefer plain Markdown, vanilla Obsidian, and standard Quartz behavior. Keep content usable with a text editor and independent of the publishing engine.
- Favor small, understandable custom helpers over additional frameworks. Add plugins only for a concrete need; prefer established, widely used plugins. Do not introduce dependencies merely to anticipate future features.
- Keep public copy concise and personal. Preserve the author's language, names, accents, and meaning. Do not invent current biographical facts from old material.
- Treat `legacy/` as the remaining migration backlog. Move reused files/assets into their new location rather than leaving copies behind, so the directory shrinks as migration progresses. For partially migrated documents, retain the unmigrated material until it is handled. Do not publish `legacy/` or remove unrelated material.

## Repository boundaries

- `content/`: published Markdown and assets; open this directory as an Obsidian vault. `content/index.md` is the homepage.
- `quartz.config.yaml`: persistent site settings shared by local preview and CI. Preserve the explicit theme block and enabled standard graph view unless a requested change requires otherwise. Analytics are currently disabled.
- `.github/workflows/deploy.yml`: pinned Quartz revision and GitHub Pages workflow. PRs targeting `master` build only; pushes to `master` build and deploy. Manual runs deploy only on `master`.
- `scripts/preview.ps1`: Windows PowerShell 5.1 preview/build helper. Keep compatibility with the built-in shell; do not require PowerShell 7.
- `site/`: small site-owned Quartz customizations copied into the temporary engine by CI and preview; not vendored engine source.
- Keep Quartz source, dependencies, caches, and generated output outside this repository, in disposable temporary installations. Retain site-owned configuration here. Preserve Git ignores for local output and editor/session state.

## Working conventions

- Use Conventional Commits, e.g. `feat: add research page`, `fix: restore preview cleanup`, or `docs: document migration`.
- A request to edit files does not itself request a commit or push. Honor explicit authorization already given for the current task; do not repeatedly ask for it. Report commit and push status accurately.
- Reuse the preview script rather than inventing a second local installation process. Validate build/configuration changes with `powershell.exe -NoProfile -File .\scripts\preview.ps1 -BuildOnly` when execution is available.
- Syntax/YAML checks alone do not establish that Quartz builds. Report exactly what was tested and any execution limits. Ordinary prose-only edits need proportionate review rather than a dependency installation every time.
- Do not change GitHub Pages settings, merge, or publish merely to validate a local edit. Follow the user's authorized scope.

## Task-specific skills

Read the relevant repository skill when performing its workflow:

- [Edit or migrate site content](.agents/skills/site-content/SKILL.md)
- [Maintain Quartz builds and previews](.agents/skills/quartz-workflow/SKILL.md)

See `README.md` for user-facing setup instructions. Keep these instructions aligned with the actual configuration and scripts rather than duplicating version numbers here.
