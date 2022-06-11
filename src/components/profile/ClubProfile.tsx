import { Avatar } from "@mui/material"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import * as React from "react"

function ClubProfile(props: ProfileProps<ClubI>) {
  const profile = props.profile
  const getPhoto = () => {
    if (profile?.photoURL) return profile.photoURL
    return ""
  }

  return (
    <Box sx={{ mt: 1 }}>
      <Avatar alt="Not logged in" src={getPhoto()} imgProps={{ referrerPolicy: "no-referrer" }} />
      <List>
        <ListItem disablePadding>
          <ListItemText primary={profile?.displayName} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={profile?.email} />
        </ListItem>
      </List>
    </Box>
  )
}

export default ClubProfile
