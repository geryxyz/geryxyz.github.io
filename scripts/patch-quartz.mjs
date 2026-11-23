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
const normalized = source.replace(before, after)
console.log("Patched Quartz graph folder-note slug normalization.")


// The local graph's root must use the page's canonical Quartz slug, not the
// browser URL: folder pages expose e.g. artes-meae/index at /artes-meae/.
// Keep the original URL/base-path resolver as fallback (including SPA use).
const urlResolverBefore = 'function u(){var o=we(),i=Nu();'
const urlResolverAfter = 'function u(){var a=document.body?.dataset?.slug;if(a)return a;var o=we(),i=Nu();'
if (normalized.split(urlResolverBefore).length !== 2) {
  throw new Error("Quartz graph URL resolver changed; review the canonical-slug compatibility patch.")
}
const patched = normalized.replace(urlResolverBefore, urlResolverAfter)
writeFileSync(file, patched)
console.log("Patched Quartz graph canonical page slug resolution.")
