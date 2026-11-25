import { QuartzComponent, QuartzComponentProps } from "./types"
import { resolveRelative, FullSlug } from "../util/path"

const LanguageSwitch: QuartzComponent = ({ fileData, allFiles }: QuartzComponentProps) => {
  const slug = fileData.slug
  if (!slug) return null
  const hungarian = slug.endsWith(".hu")
  const english = (hungarian ? slug.slice(0, -3) : slug) as FullSlug
  const alternate = (hungarian ? english : english + ".hu") as FullSlug
  if (!allFiles.some(file => file.slug === alternate)) return null
  return (
    <nav class="language-switch" aria-label="Page language">
      <span aria-current="page" lang={hungarian ? "hu" : "en"}>{hungarian ? "Magyar" : "English"}</span>
      <span aria-hidden="true"> | </span>
      <a class="internal" href={resolveRelative(slug, alternate)} lang={hungarian ? "en" : "hu"} hreflang={hungarian ? "en" : "hu"}>{hungarian ? "English" : "Magyar"}</a>
    </nav>
  )
}
LanguageSwitch.css = `
.language-switch { font-size: .9rem; margin: .5rem 0; }
.language-switch [aria-current="page"] { font-weight: 600; }
.explorer a[data-for$=".hu"], .explorer a[href$=".hu"], .explorer a[href$=".hu.html"] { display: none; }
`
LanguageSwitch.afterDOMLoaded = `
document.addEventListener("nav", () => {
  document.documentElement.lang = document.body.dataset.slug?.endsWith(".hu") ? "hu" : "en";
  document.querySelectorAll('.explorer a[data-for$=".hu"], .explorer a[href$=".hu"], .explorer a[href$=".hu.html"]').forEach(a => {
    const item = a.closest("li");
    if (item) item.hidden = true;
  });
});
`
export default LanguageSwitch
