import { loadQuartzConfig, loadQuartzLayout } from "./quartz/plugins/loader/config-loader"
import Profile from "./quartz/components/Profile"

const config = await loadQuartzConfig()
export default config
const baseLayout = await loadQuartzLayout()
// Passing overrides updates the active layout used by Quartz's page emitters.
export const layout = await loadQuartzLayout({
  defaults: {
    left: [Profile, ...(baseLayout.defaults.left ?? [])],
  },
})
