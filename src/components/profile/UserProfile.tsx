import React from "react"
import { Button, Grid, Stack, Card, Typography } from "@mui/material"

import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import UserProfileInfo from "./UserProfileInfo"
import UserProfilePicture from "./UserProfilePicture"
import { useNavigate } from "react-router"
import ChatService from "src/services/ChatService"
import Loader from "src/auth/Loader"

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
    <Card>
      <Grid container>
        <Grid item xs={12}>
          <Stack direction="row" spacing={0.5} justifyContent="end">
            <Button variant="contained" onClick={() => setMsgView(!msgView)}>
              {msgView ? "Infos" : "Posts"}
            </Button>
            {currentUser.id !== profile.id && (
              <>
                <Button variant="contained">Folgen</Button>
                <Button variant="contained" onClick={openChat}>
                  Nachricht
                </Button>
                <Button variant="outlined">Blockieren</Button>
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
            {msgView ? "Some message!" : <UserProfileInfo profile={profile} />}
          </Grid>
        </Grid>
      </Grid>
    </Card>
  )
}

export default withAuth(UserProfile)
