import List from "@mui/material/List"
import { Avatar, Divider, Icon, IconButton, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import { ChatContextI, withChat } from "./ChatContext"
import { Groups, Person } from "@mui/icons-material"
import { useEffect, useState } from "react"
import userService from "src/services/UserService"
import { useParams } from "react-router"
import { useNavigate } from "react-router"

function SelectUser({ setSelectedUser }: { setSelectedUser: (user: GenericProfile | null) => void }) {
  const [users, setUsers] = useState<GenericProfile[]>([])

  useEffect(() => {
    userService.getAll().then((users: GenericProfile[]) => {
      console.log(users)
      setUsers(users)
    })
  }, [])

  return (
    <div>
      <List component="nav">
        <ListItem disabled>
          <ListItemText primary="Chatpartner auswählen" />
        </ListItem>
        <Divider />
        {users.map((user) => (
          <div key={user.id}>
            <ListItem button onClick={() => setSelectedUser(user)}>
              <ListItemIcon>
                <Avatar src={user.photoURL} />
              </ListItemIcon>
              <ListItemText primary={user.displayName} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  )
}

function SelectChat_({ rooms, setCurrentRoom, currentRoom }: ChatContextI) {
  return (
    <div>
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

          <Icon>{room.group && <Groups />}</Icon>
        </ListItem>
      ))}
    </div>
  )
}

const SelectChat = withChat(SelectChat_)

function RoomsSideBar({ rooms, createGroup, createChat }: ChatContextI) {
  const [showUserSelect, setShowUserSelect] = useState<boolean>(false)
  const [selectedUser, setSelectedUser] = useState<GenericProfile | null>(null)

  useEffect(() => {
    if (selectedUser != null) {
      createChat(selectedUser)
      setShowUserSelect(false)
    }
  }, [selectedUser])

  return showUserSelect ? (
    <SelectUser setSelectedUser={setSelectedUser} />
  ) : (
    <div>
      {rooms !== null && (
        <List component="nav">
          <ListItem
            button
            onClick={() => {
              setShowUserSelect(true)
            }}
          >
            <ListItemIcon>
              <Person />
            </ListItemIcon>
            <ListItemText>Chat hinzufügen</ListItemText>
          </ListItem>

          <ListItem
            button
            onClick={() => {
              createGroup()
            }}
          >
            <ListItemIcon>
              <Groups />
            </ListItemIcon>
            <ListItemText>Gruppe erstellen</ListItemText>
          </ListItem>

          <Divider />
          <SelectChat />
        </List>
      )}
    </div>
  )
}

export default withChat(RoomsSideBar)
