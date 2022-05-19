import { Avatar } from "@mui/material"
import Box from "@mui/material/Box"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import { AuthContextProps } from "src/auth/AuthContext"

import withAuth from "../../auth/withAuth"
import dummyAvatar from "../../img/dummy-avatar.jpg"

function ProfilePage({ currentUser }: AuthContextProps) {
  return currentUser ? (
    <Box sx={{ mt: 1 }}>
      <Avatar
        alt="Not logged in"
        src={currentUser?.photoURL ? currentUser.photoURL : dummyAvatar}
        imgProps={{ referrerPolicy: "no-referrer" }}
      />
      <List>
        <ListItem disablePadding>
          <ListItemText primary={currentUser.displayName} />
        </ListItem>
        <ListItem disablePadding>
          <ListItemText primary={currentUser.email} />
        </ListItem>
      </List>
    </Box>
  ) : (
    <div>Not authenticated</div>
  )
}

export default withAuth(ProfilePage)
