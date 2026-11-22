import { QuartzComponent, QuartzComponentProps } from "./types"
import { pathToRoot } from "../util/path"

// This file is copied into Quartz's components directory during each build.
const Profile: QuartzComponent = ({ fileData }: QuartzComponentProps) => {
  const root = pathToRoot(fileData.slug!)
  return (
    <a class="profile-photo internal" href={root} aria-label="Home">
      <img src={`${root}/assets/images/bio-photo.jpg`} alt="Gergő Balogh's profile photo" width="1184" height="844" />
    </a>
  )
}

Profile.css = `
.profile-photo { display: block; width: fit-content; flex-shrink: 0; }
.profile-photo img { display: block; width: 10rem; max-width: 100%; height: auto; margin: 0;
  border-radius: 0.5rem; }
@media (max-width: 800px) {
  .profile-photo img { width: 4rem; }
}
`

export default Profile
