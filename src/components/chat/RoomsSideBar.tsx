import List from "@mui/material/List"
import { ListItem, ListItemText } from "@mui/material"
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
