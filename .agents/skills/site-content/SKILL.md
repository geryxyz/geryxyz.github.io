---
name: site-content
description: Write or migrate Markdown content for this personal website and Obsidian vault, including gradual migration from the legacy Jekyll site.
---

# Site content

Work from the repository root and follow `AGENTS.md`.

## Write and migrate

1. Read the destination page and relevant legacy source before editing. For data-driven legacy pages, consult `_data/` and the Liquid includes as well as the page itself.
2. Migrate only the requested topic or pages. Move reused legacy files/assets to their new location so `legacy/` tracks remaining work. Preserve unmigrated portions of partially migrated documents and user edits already made in `content/`.
3. Write readable Markdown under `content/`. Use simple YAML frontmatter for titles and other needed metadata. Use `[[vault-root/path|label]]` for internal note links, always relative to the vault root (`content/`), with no leading slash or `.md` extension. Use `[[vault-root/path#heading|label]]` for sections and vault-root paths for internal embeds. Keep external URLs and email links in standard Markdown. Do not require community plugins for ordinary content.
4. Convert Jekyll/Liquid constructs into actual Markdown or a small, justified site feature. Do not copy unresolved Liquid tags into published pages. Bring over only assets used by the migrated content.
5. Preserve English/Hungarian language choices, accents, names, and factual meaning. Treat legacy affiliations, dates, course information, and contact details as historical source material, not proof they remain current. Flag material uncertainty rather than inventing updates.
6. Avoid links to not-yet-migrated local pages. When replacing a public page, inspect its former permalink and use Quartz aliases where appropriate to retain incoming links.

## Shape notes and connections

- Apply Zettelkasten principles flexibly: give each note one coherent idea and enough context to be understood on its own. Use descriptive titles; split a note when its ideas can usefully stand independently.
- Link related notes where the connection helps the reader, explaining the relationship in the surrounding prose. Build on existing ideas rather than duplicating their explanations.
- Use overview pages to connect notes into a broader argument or route through a topic. Let useful relationships emerge as the collection grows, without imposing fixed note lengths, IDs, templates, or plugins.

## Organize teaching content

- Structure `content/teaching/` primarily by the intended student's academic level: `bsc/`, `msc/`, `phd/`, and `postdoc/`. Choose the audience for whom a page is primarily written, rather than duplicating it at every level where it might also be useful.
- Add a level directory **only when it has real publishable content**. Git does not track empty directories; do not create `.gitkeep` files, placeholder notes, empty level indexes, or public "coming soon" sections merely to represent the planned structure.
- Place practical mentorship material in the appropriate level. For example, migrate the legacy *How I Write Reviews* essay to `content/teaching/phd/how-i-write-reviews.md`, retaining its substance and voice while converting Jekyll markup to Quartz-compatible Markdown; link to it from other levels (such as postdoc) when useful instead of copying it.
- Keep cross-cutting teaching philosophy (such as *Ars Paedagogiae* and *Mentor Metta*) distinct from level-specific guidance. Link related ideas from `artes-meae/` or their eventual dedicated home rather than folding these texts into BSc/MSc/PhD/postdoc folders by default.
- Introduce a `shared/` directory or a teaching landing page only when actual content or navigation needs justify it. Prefer Quartz's natural folder discovery over manually duplicated lists of every file.

## Verify

- Check local links, asset paths, frontmatter, and that the resulting Markdown is understandable without Quartz.
- Keep private/editor state out of published content; existing exclusions are defined in `quartz.config.yaml` and `.gitignore`.
- For structural changes, new embeds, or renderer-specific features, run the existing `-BuildOnly` workflow and inspect rendering when useful. For small prose corrections, review the diff and links without adding tests that mirror the text.
- Describe what migrated and any unresolved references. Commit only within the current authorization, using Conventional Commits.
