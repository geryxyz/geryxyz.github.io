import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import Profile from "./quartz/components/Profile"
import LanguageSwitch from "./quartz/components/LanguageSwitch"

const config = await loadQuartzConfig()
// Filter only the folder renderer's view of the content, not the site index.
const folder = config.plugins.pageTypes.find(plugin => plugin.name === "FolderPage")
if (!folder) throw new Error("Expected the configured FolderPage plugin")
const originalBody = folder.body
folder.body = (options) => {
  const Body = originalBody(options)
  const Filtered: typeof Body = (props) => {
    const canonical = new Set(props.allFiles.map(file => file.slug))
    const visible = (slug?: string) =>
      !slug?.endsWith(".hu") || !canonical.has(slug.slice(0, -3) as NonNullable<typeof props.fileData.slug>)
    // Preserve trie-based folder navigation and only filter its returned children.
    const trie = props.ctx.trie
    const filteredTrie = trie && new Proxy(trie, {
      get(target, key, receiver) {
        if (key !== "findNode") return Reflect.get(target, key, receiver)
        return (...args: Parameters<typeof target.findNode>) => {
          const node = target.findNode(...args)
          return node && new Proxy(node, {
            get(target, key, receiver) {
              if (key === "children") return target.children.filter(child => visible(child.slug))
              return Reflect.get(target, key, receiver)
            },
          })
        }
      },
    })
    return Body({ ...props, allFiles: props.allFiles.filter(file => visible(file.slug)),
      ctx: { ...props.ctx, trie: filteredTrie } })
  }
  return Object.assign(Filtered, Body)
}
export default config
const baseLayout = await loadQuartzLayout()
// Passing overrides updates the active layout used by Quartz's page emitters.
export const layout = await loadQuartzLayout({
  defaults: {
    left: [Profile, ...(baseLayout.defaults.left ?? [])],
    beforeBody: [LanguageSwitch, ...(baseLayout.defaults.beforeBody ?? [])],
  },
})
