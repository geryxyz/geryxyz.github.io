import assert from "node:assert/strict"
import { spawn } from "node:child_process"
import { join, resolve } from "node:path"
import { pathToFileURL } from "node:url"

const [publicArg, playwrightArg] = process.argv.slice(2)
assert.ok(publicArg && playwrightArg, "Usage: verify-graph-browser.mjs PUBLIC_DIR PLAYWRIGHT_DIR")
const publicDir = resolve(publicArg)
const playwright = await import(pathToFileURL(join(resolve(playwrightArg), "index.mjs")).href)
const port = 18765
const server = spawn("python3", ["-m", "http.server", String(port), "--bind", "127.0.0.1", "--directory", publicDir], { stdio: "pipe" })
let browser
try {
  const base = "http://127.0.0.1:" + port
  let ready = false
  for (let i = 0; i < 50; i++) {
    try {
      const res = await fetch(base + "/static/contentIndex.json")
      if (res.ok) { ready = true; break }
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
    { path: "/research/", expected: ["research/human_centered_software_engineering", "research/software_analysis_and_quality_assurance", "research/software_visualization_and_comprehension"] },
  ]
  for (const testCase of cases) {
    const page = await browser.newPage({ viewport: { width: 1600, height: 1000 } })
    const errors = []
    page.on("pageerror", (error) => errors.push(error.message))
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()) })
    await page.addInitScript(() => {
      window.__graphSimulationNodes = []
      let d3Value
      Object.defineProperty(window, "d3", {
        configurable: true,
        get() { return d3Value },
        set(lib) {
          if (lib && typeof lib.forceSimulation === "function") {
            const actualForceSimulation = lib.forceSimulation
            lib.forceSimulation = function (nodes, ...args) {
              window.__graphSimulationNodes.push(nodes.map((node) => node.id))
              return actualForceSimulation.call(this, nodes, ...args)
            }
          }
          d3Value = lib
        },
      })
    })
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
