import withAuth from "../../auth/withAuth"
import { AuthContextI } from "../../auth/AuthContext"
import React from "react"
import { Navigate } from "react-router-dom"
import ChatRoom from "./ChatRoom"
import { Grid } from "@mui/material"
import RoomSideBar from "./RoomsSideBar"

const rooms = ["Room 1", "Room 2", "Room 3"]
const currentRoom = "Room 1"

function Chat({ currentUser }: AuthContextI) {
  return currentUser != null ? (
    <Grid container style={{ height: "100%", display: "flex", alignItems: "stretch" }}>
      <Grid item>
        <RoomSideBar rooms={rooms} currentRoom={currentRoom} />
      </Grid>
      <Grid item style={{ flexGrow: 4 }}>
        <ChatRoom currentRoom={currentRoom} />
      </Grid>
    </Grid>
  ) : (
    <Navigate to="/sign-in" />
  )
}

export default withAuth(Chat)
