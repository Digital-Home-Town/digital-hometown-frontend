import { Person } from "@mui/icons-material"
import { Avatar } from "@mui/material"

interface ProfilePictureI {
  profile?: User
  size?: number
}

export function ProfilePicture({ profile, size }: ProfilePictureI) {
  return (
    <Avatar alt="profile-picture" src={profile?.photoURL || ""} sx={{ height: size, width: size }} variant="rounded">
      {!profile?.photoURL && <Person />}
    </Avatar>
  )
}

ProfilePicture.defaultProps = {
  size: 64,
}

export default ProfilePicture
