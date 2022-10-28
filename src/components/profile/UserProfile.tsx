import { Button, Card, Grid, Stack } from "@mui/material"
import React from "react"
import { useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import ChatService from "src/services/ChatService"

import { PostProvider } from "../posts/PostContext"
import GenericProfileInfo from "./GenericProfileInfo"
import GenericProfilePicture from "./GenericProfilePicture"
import GenericProfilePosts from "./GenericProfilePosts"

function UserProfile({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  const navigate = useNavigate()

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
          <Grid item xs={2}>
            <GenericProfilePicture profile={profile} />
          </Grid>

          <GenericProfileInfo profile={profile} />
        </Grid>
      </Card>
      <Grid item xs={12} margin={2}>
        <Stack direction="row" spacing={0.5} justifyContent="center">
          {currentUser.id !== profile.id && (
            <>
              {/* do not show buttons if it is the own profile */}
              <Button variant="contained" onClick={openChat} size={"large"}>
                Schreib mir!
              </Button>
            </>
          )}
        </Stack>
      </Grid>
      <PostProvider>
        <GenericProfilePosts profile={profile} />
      </PostProvider>
    </div>
  )
}

export default withAuth(UserProfile)
