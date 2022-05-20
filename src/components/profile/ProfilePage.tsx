import { Avatar } from "@mui/material"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import profileService from "src/services/ProfileService"

import withAuth from "../../auth/withAuth"
import ReactPlaceholder from "react-placeholder"

function ProfilePage({ currentUser }: AuthContextI) {
  const { id } = useParams()
  const [profile, setProfile] = React.useState<null | ProfileI>(null)
  const [exists, setExists] = React.useState<null | boolean>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

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
        setIsLoading(false)
      }
    }
    if (!exists) getExists()
  })

  const getPhoto = () => {
    if (profile?.photoURL) return profile.photoURL
    return ""
  }

  return (
    <ReactPlaceholder ready={!isLoading} type={"media"}>
      {exists ? (
        <Box sx={{ mt: 1 }}>
          <Avatar alt="Not logged in" src={getPhoto()} imgProps={{ referrerPolicy: "no-referrer" }} />
          <List>
            <ListItem disablePadding>
              <ListItemText primary={profile?.displayName + " (" + profile?.age + ")"} />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary={profile?.email} />
            </ListItem>
          </List>
        </Box>
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </ReactPlaceholder>
  )
}

export default withAuth(ProfilePage)
