import List from "@mui/material/List"
import { ListItem, ListItemText } from "@mui/material"
import { DatabaseReference, onValue, ref } from "firebase/database"
import { realtimeDB } from "../../firebase-config"
import { useEffect, useState } from "react"
import { ChatContextI, withChat } from "./ChatContext"

function RoomsSideBar({ currentRoomId, setCurrentRoom, rooms }: ChatContextI) {
  return rooms == null ? (
    <div></div>
  ) : (
    <List component="nav">
      {Object.keys(rooms).map((roomId) => {
        return (
          <ListItem
            key={roomId}
            button
            selected={roomId === currentRoomId}
            onClick={() => {
              setCurrentRoom(roomId)
            }}
          >
            <ListItemText primary={rooms[roomId].name} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default withChat(RoomsSideBar)
