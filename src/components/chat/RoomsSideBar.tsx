import List from "@mui/material/List"
import { Divider, Icon, IconButton, ListItem, ListItemText } from "@mui/material"
import { ChatContextI, withChat } from "./ChatContext"
import { Add, Groups, Person } from "@mui/icons-material"

function RoomsSideBar({ currentRoom, setCurrentRoom, rooms, createRoom }: ChatContextI) {
  return (
    <div>
      {rooms !== null && (
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              createRoom()
            }}
          >
            {/* <ListItemText primary="Chat hinzufügen" /> */}
            Chat hinzufügen
            <IconButton>
              <Add />
            </IconButton>
          </ListItem>

          <Divider />

          {rooms.map((room, index) => (
            <ListItem
              key={index}
              button
              selected={room.id === currentRoom?.id}
              onClick={() => {
                setCurrentRoom(room.id)
              }}
            >
              <ListItemText primary={room.name} secondary={new Date(room.lastMessageSendAt || 0).toLocaleString()} />

              <Icon>{room.isGroup && <Groups />}</Icon>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

export default withChat(RoomsSideBar)
