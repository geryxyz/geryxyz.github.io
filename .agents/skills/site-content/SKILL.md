---
name: site-content
description: Write or migrate Markdown content for this personal website and Obsidian vault, including gradual migration from the legacy Jekyll site.
---

# Site content

Work from the repository root and follow `AGENTS.md`.

## Write and migrate

1. Read the destination page and relevant legacy source before editing. For data-driven legacy pages, consult `_data/` and the Liquid includes as well as the page itself.
2. Migrate only the requested topic or pages. Move reused legacy files/assets to their new location so `legacy/` tracks remaining work. Preserve unmigrated portions of partially migrated documents and user edits already made in `content/`.
3. Write readable Markdown under `content/`. Use simple YAML frontmatter for titles and other needed metadata. Prefer standard Markdown links and embeds; Obsidian wikilinks are appropriate when they help vault use. Do not require community plugins for ordinary content.
4. Convert Jekyll/Liquid constructs into actual Markdown or a small, justified site feature. Do not copy unresolved Liquid tags into published pages. Bring over only assets used by the migrated content.
5. Preserve English/Hungarian language choices, accents, names, and factual meaning. Treat legacy affiliations, dates, course information, and contact details as historical source material, not proof they remain current. Flag material uncertainty rather than inventing updates.
6. Avoid links to not-yet-migrated local pages. When replacing a public page, inspect its former permalink and use Quartz aliases where appropriate to retain incoming links.

## Shape notes and connections

- Apply Zettelkasten principles flexibly: give each note one coherent idea and enough context to be understood on its own. Use descriptive titles; split a note when its ideas can usefully stand independently.
- Link related notes where the connection helps the reader, explaining the relationship in the surrounding prose. Build on existing ideas rather than duplicating their explanations.
- Use overview pages to connect notes into a broader argument or route through a topic. Let useful relationships emerge as the collection grows, without imposing fixed note lengths, IDs, templates, or plugins.

## Verify

- Check local links, asset paths, frontmatter, and that the resulting Markdown is understandable without Quartz.
- Keep private/editor state out of published content; existing exclusions are defined in `quartz.config.yaml` and `.gitignore`.
- For structural changes, new embeds, or renderer-specific features, run the existing `-BuildOnly` workflow and inspect rendering when useful. For small prose corrections, review the diff and links without adding tests that mirror the text.
- Describe what migrated and any unresolved references. Commit only within the current authorization, using Conventional Commits.
