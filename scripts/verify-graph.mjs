import { readFileSync } from "node:fs"
import { join } from "node:path"
import { runInNewContext } from "node:vm"
import assert from "node:assert/strict"

const quartz = process.argv[2]
const graphRoot = join(quartz, "node_modules/@quartz-community/graph")
const plugin = readFileSync(join(graphRoot, "dist/index.js"), "utf8")
const componentPlugin = readFileSync(join(graphRoot, "dist/components/index.js"), "utf8")
for (const [name, source] of [["root", plugin], ["component", componentPlugin]]) {
  assert.ok(source.includes('function u(){var a=document.body?.dataset?.slug;if(a)return a;var o=we(),i=Nu();'),
    `Graph ${name} bundle must prefer Quartz canonical slugs`)
  assert.ok(source.includes('let e=_t(ft(u,"index"),!1)'),
    `Graph ${name} bundle must normalize folder indexes consistently`)
}

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
const overviewPaths = new Set(["artes-meae/index.md", "artes-meae/artes-meae.md"])
const overview = Object.keys(index).find((slug) => overviewPaths.has(index[slug].filePath))
assert.ok(overview, "The Artes Meae source note must appear in the content index")
const notes = ["ars-paedagogiae", "ars-technica", "ars-scientiae"].map((name) => `artes-meae/${name}`)
const links = (slug) => (index[slug]?.links ?? []).map(normalize)
assert.ok(links("index").includes(normalize(overview)), `Homepage must link to Artes Meae; found ${JSON.stringify(links("index"))}`)
for (const note of notes) {
  assert.ok(links(overview).includes(normalize(note)), `Overview must link to ${note}`)
  assert.ok(links(note).includes(normalize(overview)), `${note} must link back to the overview`)
}
console.log("Verified graph folder URLs and all homepage/Artes Meae overview connections.")


// Ensure the actual graph's URL resolver uses Quartz's canonical page identity.
assert.ok(plugin.includes('function u(){var a=document.body?.dataset?.slug;if(a)return a;var o=we(),i=Nu();'),
  "Graph runtime must prefer body[data-slug] before using its browser-URL fallback")

// Reproduce the local graph's node/edge selection from the published index.
const normalizedLinks = new Map(Object.entries(index).map(([slug, details]) =>
  [normalize(slug), (details.links ?? []).map(normalize).filter((dest) =>
    Object.keys(index).some((key) => normalize(key) === dest))]))
function assertNeighbours(folder, expected) {
  const root = normalize(folder + "/index")
  const neighbours = new Set()
  for (const [source, destinations] of normalizedLinks) {
    for (const target of destinations) {
      if (source === root) neighbours.add(target)
      if (target === root) neighbours.add(source)
    }
  }
  for (const slug of expected) {
    assert.ok(neighbours.has(normalize(slug)),
      `Local graph for ${folder} missing ${slug}; found ${JSON.stringify([...neighbours])}`)
  }
}
assertNeighbours("artes-meae", notes)
assertNeighbours("research", [
  "research/human_centered_software_engineering",
  "research/software_analysis_and_quality_assurance",
  "research/software_visualization_and_comprehension",
  "research/software_security_and_ai_assisted_engineering",
  "research/data_driven_software_engineering",
])
console.log("Verified local-graph runtime and Artes Meae/Research neighbourhoods.")
