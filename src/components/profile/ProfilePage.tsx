import { Avatar } from "@mui/material"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { differenceInYears } from "date-fns"
import * as React from "react"
import { useEffect } from "react"
import ReactPlaceholder from "react-placeholder"
import { useParams } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import clubService from "src/services/ClubService"
import profileService from "src/services/ProfileService"

import withAuth from "../../auth/withAuth"

function ProfilePage({ currentUser }: AuthContextI) {
  const { id } = useParams()
  const [profile, setProfile] = React.useState<null | ProfileI>(null)
  const [isOrg, setIsOrg] = React.useState<null | boolean>(null)
  const [exists, setExists] = React.useState<null | boolean>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const getProfile = async () => {
      const service = isOrg ? clubService : profileService
      const profileData = await service.get(id || "")
      if (profileData) {
        setProfile(profileData)
      }
    }
    if (!profile) getProfile()
  }, [id, isOrg, profile])

  useEffect(() => {
    const getExists = async () => {
      let exists = await profileService.exists(id || "")
      if (exists) {
        setIsOrg(false)
        setExists(exists)
        setIsLoading(false)
        return
      }
      exists = await clubService.exists(id || "")
      setIsOrg(true)
      setExists(exists)
      setIsLoading(false)
      return
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
            {profile?.dateOfBirth == null || (
              <ListItem disablePadding>
                <ListItemText
                  primary={
                    profile?.displayName + " (" + differenceInYears(new Date(), new Date(profile?.dateOfBirth)) + ")"
                  }
                />
              </ListItem>
            )}
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
