import withAuth from "../../auth/withAuth"
import { AuthContextI } from "../../auth/AuthContext"
import React from "react"
import { Navigate } from "react-router-dom"
import ChatRoom from "./ChatRoom"
import { Grid } from "@mui/material"
import RoomsSideBar from "./RoomsSideBar"
import { ChatProvider } from "./ChatContext"

function Chat({ currentUser }: AuthContextI) {
  return currentUser != null ? (
    <ChatProvider currentUser={currentUser}>
      <Grid container style={{ height: "100%", display: "flex", alignItems: "stretch" }}>
        <Grid item>
          <RoomsSideBar />
        </Grid>
        <Grid item style={{ flexGrow: 4 }}>
          <ChatRoom />
        </Grid>
      </Grid>
    </ChatProvider>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(Chat)
