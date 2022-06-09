import List from "@mui/material/List"
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { ChatContextI, withChat } from "./ChatContext"
import { PlusOne } from "@mui/icons-material"
import ChatService from "../../services/ChatService"
import chatService from "../../services/ChatService"

function RoomsSideBar({ currentRoomId, setCurrentRoom, rooms, createRoom }: ChatContextI) {
  return rooms == null ? (
    <div></div>
  ) : (
    <List component="nav">
      <ListItem
        button
        onClick={() => {
          createRoom()
        }}
      >
        <ListItemText primary="Chat hinzufügen" />
        <ListItemIcon>
          <PlusOne />
        </ListItemIcon>
      </ListItem>
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
