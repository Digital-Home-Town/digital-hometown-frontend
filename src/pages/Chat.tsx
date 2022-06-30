import { Grid } from "@mui/material"
import React from "react"
import { Navigate } from "react-router-dom"
import ChatDrawer from "src/components/chat/ChatDrawer"

import { AuthContextI } from "../auth/AuthContext"
import withAuth from "../auth/withAuth"
import { ChatProvider } from "../components/chat/ChatContext"
import ChatRoom from "../components/chat/ChatRoom"
import RoomsSideBar from "../components/chat/RoomsSideBar"
import SendMessage from "../components/chat/SendMessage"

function Chat({ currentUser }: AuthContextI) {
  return currentUser != null ? (
    <ChatProvider currentUser={currentUser}>
      <Grid container style={{ height: "100%", display: "flex", alignItems: "stretch" }}>
        <Grid item>
          <RoomsSideBar />
        </Grid>
        <Grid item style={{ flexGrow: 4 }}>
          <ChatRoom />
          <div style={{ flexGrow: 6 }}>
            <SendMessage />
          </div>
        </Grid>
      </Grid>
    </ChatProvider>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(Chat)
