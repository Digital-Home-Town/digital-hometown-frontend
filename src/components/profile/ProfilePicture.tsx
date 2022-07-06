import { Person } from "@mui/icons-material"
import { Avatar } from "@mui/material"

interface ProfilePictureI {
  profile?: User
  size?: number
}

function ProfilePicture({ profile, size }: ProfilePictureI) {
  return (
    <Avatar alt="Not logged in" src={profile?.photoURL || ""} sx={{ height: size, width: size }}>
      {!profile?.photoURL && <Person />}
    </Avatar>
  )
}

ProfilePicture.defaultProps = {
  size: 64,
}

export default ProfilePicture
