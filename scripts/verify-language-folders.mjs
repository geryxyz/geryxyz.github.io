import { readFileSync, existsSync } from "node:fs"
import { join } from "node:path"
import assert from "node:assert/strict"
const root = process.argv[2]
for (const [folder, count, pages] of [
  ["primary", 1, ["cikk-cakk-katica"]],
  ["secondary", 2, ["cikk-cakk-katica", "python-graphs-programming"]],
]) {
  const dir = join(root, "teaching", folder)
  const html = readFileSync(join(dir, "index.html"), "utf8")
  const listing = html.split('class="page-listing"')[1]
  assert.ok(listing, "Missing folder listing: " + folder)
  assert.match(listing, new RegExp(count + " items? under this folder"))
  for (const page of pages) {
    assert.ok(existsSync(join(dir, page + ".hu.html")), "Missing Hungarian page: " + page)
    assert.ok(!listing.split("</main>")[0].includes(page + ".hu"), "Translation leaked into folder listing: " + page)
  }
}
console.log("Verified canonical teaching folder listings")
