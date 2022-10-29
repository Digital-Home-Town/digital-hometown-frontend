import { Groups, Person } from "@mui/icons-material"
import { Avatar, Divider, Icon, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import List from "@mui/material/List"
import { useEffect, useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import userService from "src/services/UserService"

import { ChatContextI, withChat } from "./ChatContext"

function SelectUser_({
  setSelectedUser,
  currentUser,
}: { setSelectedUser: (user: GenericProfile | null) => void } & AuthContextI) {
  const [users, setUsers] = useState<GenericProfile[]>([])

  useEffect(() => {
    userService.getAll().then((users: GenericProfile[]) => {
      setUsers(users.filter((user) => user.id !== currentUser?.id))
    })
  }, [currentUser])

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
              <ListItemText primary={user.displayName || user.email} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  )
}

const SelectUser = withAuth(SelectUser_)

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
