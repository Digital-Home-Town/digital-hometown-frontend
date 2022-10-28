import { Button, Card, Grid, Stack, Typography } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import ChatService from "src/services/ChatService"

import { PostProvider } from "../posts/PostContext"
import UserProfileInfo from "./UserProfileInfo"
import UserProfilePicture from "./UserProfilePicture"
import UserProfilePosts from "./UserProfilePosts"

function UserProfile({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  const navigate = useNavigate()
  const [msgView, setMsgView] = React.useState(false)

  if (currentUser == null || profile == null) {
    return <Loader />
  }

  const openChat = async () => {
    const key = await ChatService.createChat(currentUser, profile)
    navigate(`/chat/${key}`)
  }

  return (
    <div>
      <Card>
        <Grid container>
          <Grid item xs={12}>
            <Stack direction="row" spacing={0.5} justifyContent="end">
              {currentUser.id !== profile.id && (
                <>
                  {/* do not show buttons if it is the own profile */}
                  <Button variant="contained" onClick={openChat}>
                    Nachricht
                  </Button>
                </>
              )}
            </Stack>
          </Grid>
          <Grid item xs={2}>
            <UserProfilePicture profile={profile} />
          </Grid>

          <Grid container item xs={10}>
            <Grid item lg={12} xs={12}>
              {/*Name*/}
              <Typography variant="h6" gutterBottom>
                {profile?.displayName || "Kein Name"}
              </Typography>
            </Grid>
            <Grid item lg={12} xs={12}>
              <UserProfileInfo profile={profile} />
            </Grid>
          </Grid>
        </Grid>
      </Card>

      <PostProvider>
        <UserProfilePosts profile={profile} />
      </PostProvider>
    </div>
  )
}

export default withAuth(UserProfile)
