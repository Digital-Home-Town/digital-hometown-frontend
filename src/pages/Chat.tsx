import React from "react"
import { Grid } from "@mui/material"
import { Navigate, useParams } from "react-router-dom"

import { AuthContextI } from "../auth/AuthContext"
import withAuth from "../auth/withAuth"
import { ChatProvider } from "../components/chat/ChatContext"
import ChatRoom from "../components/chat/ChatRoom"
import RoomsSideBar from "../components/chat/RoomsSideBar"
import ChatService from "src/services/ChatService"

function Chat({ currentUser }: AuthContextI) {
  const { id } = useParams()

  ChatService.getRooms()

  return currentUser != null ? (
    <ChatProvider currentUser={currentUser} defaultChatId={id}>
      <Grid container style={{ flexWrap: "nowrap" }}>
        <Grid item style={{ flexGrow: 1, minWidth: "300px" }}>
          <RoomsSideBar />
        </Grid>
        <Grid item style={{ flexGrow: 10 }}>
          <ChatRoom />
        </Grid>
      </Grid>
    </ChatProvider>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(Chat)
