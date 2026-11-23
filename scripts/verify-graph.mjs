import { readFileSync } from "node:fs"
import { join } from "node:path"
import { runInNewContext } from "node:vm"
import assert from "node:assert/strict"

const quartz = process.argv[2]
const plugin = readFileSync(join(quartz, "node_modules/@quartz-community/graph/dist/index.js"), "utf8")
// Exercise the actual bundled normalizer, including its two helpers.
const functions = ["cu", "Ft", "ft", "_t"].map((name) => {
  const match = plugin.match(new RegExp(`function ${name}\\([^)]*\\)\\{[^{}]*\\}`))
  assert.ok(match, `Missing graph helper ${name}; review verification after upgrading Quartz`)
  return match[0]
}).join("\n")
const normalize = runInNewContext(functions + "\ncu")
assert.equal(normalize("artes-meae/index"), normalize("artes-meae/"))
assert.equal(normalize("artes-meae/index"), normalize("artes-meae"))
assert.equal(normalize("index"), normalize("/"))

const index = JSON.parse(readFileSync(join(quartz, "public/static/contentIndex.json"), "utf8"))
// Quartz publishes both folder/index.md and folder/folder.md as folder indexes.
const overview = Object.keys(index).find((slug) => index[slug].filePath === "artes-meae/artes-meae.md")
assert.ok(overview, "The Artes Meae source note must appear in the content index")
const notes = ["ars-paedagogiae", "ars-technica", "ars-scientiae"].map((name) => `artes-meae/${name}`)
const links = (slug) => (index[slug]?.links ?? []).map(normalize)
assert.ok(links("index").includes(normalize(overview)), `Homepage must link to Artes Meae; found ${JSON.stringify(links("index"))}`)
for (const note of notes) {
  assert.ok(links(overview).includes(normalize(note)), `Overview must link to ${note}`)
  assert.ok(links(note).includes(normalize(overview)), `${note} must link back to the overview`)
}
console.log("Verified graph folder URLs and all homepage/Artes Meae overview connections.")
