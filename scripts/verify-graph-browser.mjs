import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { join, resolve } from "node:path"
import { get } from "node:http"
import { readFileSync, writeFileSync, readdirSync } from "node:fs"
import { pathToFileURL } from "node:url"

const [publicArg, playwrightArg] = process.argv.slice(2)
assert.ok(publicArg && playwrightArg, "Usage: verify-graph-browser.mjs PUBLIC_DIR PLAYWRIGHT_DIR")
const publicDir = resolve(publicArg)
const playwright = await import(pathToFileURL(join(resolve(playwrightArg), "index.mjs")).href)
// Instrument only the temporary generated output used by this browser test,
// not the installed Quartz package or any production artifact.
const jsDir = join(publicDir, "static/scripts")
let instrumented = 0
for (const name of readdirSync(jsDir).filter((name) => name.endsWith(".js"))) {
  const path = join(jsDir, name)
  const content = readFileSync(path, "utf8")
  if (!content.includes("forceSimulation(") || !content.includes("graph-container")) continue
  const matcher = /\.forceSimulation\(([A-Za-z_$][\w$]*)\)/
  const found = matcher.exec(content)
  if (!found) {
    const offset = content.indexOf("forceSimulation(")
    throw new Error("Cannot instrument Graph simulation in " + name + ": " + content.slice(offset - 130, offset + 160))
  }
  const changed = content.replace(matcher, (_, id) =>
    ".forceSimulation((window.__graphSimulationNodes.push(" + id + ".map(n=>n.id))," + id + "))")
  writeFileSync(path, changed)
  instrumented++
}
assert.ok(instrumented > 0, "No graph simulation was found in emitted browser scripts")
console.log("Instrumented generated graph scripts:", instrumented)

const port = 18765
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", publicDir], { stdio: "pipe" })
let browser
try {
  const base = "http://127.0.0.1:" + port
  let ready = false
  for (let i = 0; i < 50; i++) {
    try {
      const status = await new Promise((done, reject) => {
        const req = get(base + "/static/contentIndex.json", (res) => {
          res.resume()
          res.on("end", () => done(res.statusCode))
        })
        req.on("error", reject)
      })
      if (status === 200) { ready = true; break }
    } catch {}
    await new Promise((done) => setTimeout(done, 200))
  }
  assert.ok(ready, "Local static preview server did not start")
  browser = await playwright.chromium.launch({
    channel: "chrome",
    headless: true,
    args: ["--no-sandbox", "--enable-webgl", "--use-gl=angle", "--use-angle=swiftshader", "--enable-unsafe-swiftshader"],
  })
  const cases = [
    { path: "/artes-meae/", expected: ["artes-meae/ars-paedagogiae", "artes-meae/ars-technica", "artes-meae/ars-scientiae"] },
    { path: "/research/", expected: ["research/human_centered_software_engineering", "research/software_analysis_and_quality_assurance", "research/software_visualization_and_comprehension", "research/software_security_and_ai_assisted_engineering", "research/data_driven_software_engineering"] },
  ]
  for (const testCase of cases) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => {
      if (message.type() === "error") errors.push(message.text())
    })
    await page.addInitScript(() => { window.__graphSimulationNodes = [] })
    await page.goto(base + testCase.path, { waitUntil: "domcontentloaded" })
    try {
      await page.waitForFunction(() => window.__graphSimulationNodes.length > 0, null, { timeout: 35000 })
    } catch {
      const diagnostic = await page.evaluate(() => ({
        pageSlug: document.body.dataset.slug,
        localGraphConfig: document.querySelector(".graph-container")?.dataset.cfg,
        canvasCount: document.querySelectorAll(".graph-container canvas").length,
        simulationNodes: window.__graphSimulationNodes,
      }))
      throw new Error("Graph did not initialize for " + testCase.path + ": " + JSON.stringify({ diagnostic, errors }))
    }
    const result = await page.evaluate(() => ({
      pageSlug: document.body.dataset.slug,
      snapshots: window.__graphSimulationNodes,
      localGraphConfig: document.querySelector(".graph-container")?.dataset.cfg,
      canvasCount: document.querySelectorAll(".graph-container canvas").length,
    }))
    const nodes = result.snapshots[0]
    console.log("GRAPH BROWSER", testCase.path, JSON.stringify({ ...result, errors }))
    for (const expected of testCase.expected) {
      assert.ok(nodes.includes(expected), testCase.path + " is missing connected node " + expected + ": " + JSON.stringify(nodes))
    }
    assert.ok(result.canvasCount > 0, "Local graph canvas missing for " + testCase.path)
    await page.close()
  }
  console.log("Browser-level local Graph View tests passed.")
} finally {
  if (browser) await browser.close()
  server.kill()
}
