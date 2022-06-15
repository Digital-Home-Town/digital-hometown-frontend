import List from "@mui/material/List"
import { ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ChatContextI, withChat } from "./ChatContext"
import { Add } from "@mui/icons-material"

function RoomsSideBar({ currentRoom, setCurrentRoom, rooms, createRoom }: ChatContextI) {
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
        {rooms.map((room, index) => (
          <ListItem
            key={index}
            button
            selected={room.id === currentRoom?.id}
            onClick={() => {
              setCurrentRoom(room.id)
            }}
          >
            <ListItemText primary={room.name} />
          </ListItem>
        ))}
      </List>
    </div>
  )
}

export default withChat(RoomsSideBar)
