import List from "@mui/material/List"
import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ChatContextI, withChat } from "./ChatContext"
import { Add } from "@mui/icons-material"

function RoomsSideBar({ currentRoomId, setCurrentRoom, rooms, createRoom }: ChatContextI) {
  return rooms == null ? (
    <div></div>
  ) : (
    <div>
      <List component="nav">
        <ListItem
          button
          onClick={() => {
            createRoom()
          }}
        >
          <ListItemText primary="Chat hinzufügen" />
          <ListItemIcon>
            <Add />
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
    </div>
  )
}

export default withChat(RoomsSideBar)
