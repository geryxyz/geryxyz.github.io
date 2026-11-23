import { readFileSync, writeFileSync } from "node:fs"
import { join } from "node:path"

// Quartz 5.1's pinned Graph plugin has two separately bundled entry points.
// Patch both: Quartz loads the component entry in the generated website, while
// the root entry is also used by plugin registration.
const root = process.argv[2]
const before = 'let e=_t(ft(u,"index"),!0)'
const after = 'let e=_t(ft(u,"index"),!1)'
const urlResolverBefore = 'function u(){var o=we(),i=Nu();'
const urlResolverAfter = 'function u(){var a=document.body?.dataset?.slug;if(a)return a;var o=we(),i=Nu();'

function exactlyOnce(source, needle, path) {
  if (source.split(needle).length !== 2) {
    throw new Error(`Quartz graph bundle changed (${path}): expected exactly one ${JSON.stringify(needle)}`)
  }
}
const paths = ["dist/index.js", "dist/components/index.js"]
const patches = paths.map((path) => {
  const file = join(root, "node_modules/@quartz-community/graph", path)
  const source = readFileSync(file, "utf8")
  exactlyOnce(source, before, path)
  exactlyOnce(source, urlResolverBefore, path)
  let result = source.replace(before, after).replace(urlResolverBefore, urlResolverAfter)
  return { file, result, path }
})
// Validate both entries before writing either one.
for (const { file, result, path } of patches) {
  writeFileSync(file, result)
  console.log(`Patched Quartz Graph's canonical slug resolver: ${path}`)
}
