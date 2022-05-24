import List from "@mui/material/List"
import { ListItem, ListItemText } from "@mui/material"

interface RoomsSideBarI {
  rooms: string[]
  currentRoom: string
}

function RoomsSideBar({ rooms, currentRoom }: RoomsSideBarI) {
  return (
    <List>
      {rooms.map((room) => {
        return (
          <ListItem selected={room === currentRoom}>
            <ListItemText primary={room} />
          </ListItem>
        )
      })}
    </List>
  )
}

export default RoomsSideBar
