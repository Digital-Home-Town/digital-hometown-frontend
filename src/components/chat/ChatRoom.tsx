import { AuthContextI } from "../../auth/AuthContext"
import React, { useEffect, useState } from "react"
import { limitToLast, onChildAdded, onChildRemoved, onValue, orderByChild, query, ref } from "firebase/database"
import { realtimeDB } from "../../firebase-config"
import { List } from "@mui/material"
import withAuth from "../../auth/withAuth"
import ChatMessage from "./Message"
import SendMessage from "./SendMessage"
import profileService from "../../services/ProfileService"

interface ChatRoomI {
  currentRoom: string
  name?: string
}

function ChatRoomNoAuth({ currentRoom, currentUser }: AuthContextI & ChatRoomI) {
  const [roomName, setRoomName] = useState<string | null | undefined>(undefined)
  const [messages, setMessages] = useState<MessageI[]>([])
  // const [messageItems, setMessageItems] = useState<React.ReactElement[]>([])

  console.log("messages", messages)

  useEffect(() => {
    const messageRef = ref(realtimeDB, `messages/${currentRoom}`)
    const messageQuery = query(messageRef, orderByChild("sendAt"), limitToLast(20))
    const roomRef = ref(realtimeDB, `rooms/${currentRoom}`)

    onChildAdded(messageQuery, async (snapshot) => {
      const message = snapshot.val()
      console.log("message added", message)
      setMessages((messages) => [...messages, message])
    })

    onChildRemoved(messageQuery, (snapshot) => {
      const message = snapshot.val()
      console.log("message removed", message)
      setMessages((messages) => messages.filter((m) => m.messageId !== message.messageId))
    })

    onValue(roomRef, async (snapshot) => {
      const room_ = snapshot.val()
      if (room_.members.length > 2) {
        setRoomName(room_.name)
      } else {
        for (const member of room_.members) {
          if (member !== currentUser?.uid) {
            const user = await profileService.getProfile(member.uid)
            setRoomName(user?.displayName)
          }
        }
      }
    })
  }, [currentRoom])

  return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ flex: "1 0 auto", verticalAlign: "end" }}>
        <h1>{roomName}</h1>
        <List style={{ overflowY: "auto", minHeight: "60vh", maxHeight: "60vh" }}>
          {messages.map((item, i) => (
            <ChatMessage key={i} message={item} />
          ))}
        </List>
      </div>
      <div style={{ flexShrink: "0" }}>
        <SendMessage roomId={currentRoom} />
      </div>
      {/*</Paper>*/}
    </div>
  )
}

export default withAuth(ChatRoomNoAuth)
