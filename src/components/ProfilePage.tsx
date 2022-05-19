import { Avatar } from "@mui/material"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { AuthContextProps } from "src/auth/AuthContext"
import profileService from "src/services/ProfileService"

import withAuth from "../auth/withAuth"
import dummyAvatar from "../img/dummy-avatar.jpg"

function ProfilePage({ currentUser }: AuthContextProps) {
  const { id } = useParams()
  const [profile, setProfile] = React.useState<null | Profile>(null)
  const [exists, setExists] = React.useState<null | Boolean>(null)

  useEffect(() => {
    const getProfile = async () => {
      const profileData = await profileService.getProfile(id || "")
      if (profileData) {
        setProfile(profileData)
      }
    }
    if (!profile) getProfile()
  })

  useEffect(() => {
    const getExists = async () => {
      const exists = await profileService.existsProfile(id || "")
      if (exists) {
        setExists(exists)
      }
    }
    if (!exists) getExists()
  })

  const getPhoto = () => {
    if (profile?.photoUrl) return profile.photoUrl
    if (currentUser?.photoURL) return currentUser.photoURL
    return dummyAvatar
  }

  return exists ? (
    <Box sx={{ mt: 1 }}>
      <Avatar alt="Not logged in" src={getPhoto()} imgProps={{ referrerPolicy: "no-referrer" }} />
      <List>
        <ListItem disablePadding>
          <ListItemText primary={profile?.name + " (" + profile?.age + ")"} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={profile?.email} />
        </ListItem>
      </List>
    </Box>
  ) : (
    <div>Du hast keinen Zugriff auf diese Seite</div>
  )
}

export default withAuth(ProfilePage)
