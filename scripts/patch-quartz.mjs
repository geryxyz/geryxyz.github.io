import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

// Compatibility fix for the graph bundled with our pinned Quartz revision.
// Its pathname reader removes trailing slashes, but its slug normalizer keeps
// them for folder indexes, leaving the current folder note disconnected.
// Normalize both forms consistently. Fail on upstream changes for review.
const file = join(process.argv[2], "node_modules/@quartz-community/graph/dist/index.js")
const source = readFileSync(file, "utf8")
const before = 'let e=_t(ft(u,"index"),!0)'
const after = 'let e=_t(ft(u,"index"),!1)'
if (source.split(before).length !== 2) {
  throw new Error("Quartz graph slug normalization changed; review or remove the compatibility patch.")
}
writeFileSync(file, source.replace(before, after))
console.log("Patched Quartz graph folder-note slug normalization.")

// Temporary diagnosis of the pinned compiled bundle; remove before merging.
for (const name of ["graph-visited", "contentIndex.json", "Stale render", "let e=_t(ft(u,\"index\"),!0)"]) {
  const index = source.indexOf(name)
  console.log("[GRAPH DEBUG]", name, index, index < 0 ? "" : source.slice(Math.max(0, index - 600), index + 600))
}
console.log("[GRAPH DEBUG] cu =", source.match(/function cu\\([^)]*\\)\\{[^{}]*\\}/)?.[0])

console.log("[GRAPH DEBUG] URL functions", source.slice(16800, 18500))
