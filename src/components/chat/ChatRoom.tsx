import { AuthContextI } from "../../auth/AuthContext"
import React, { useEffect, useState } from "react"
import { limitToLast, onChildAdded, onChildRemoved, onValue, orderByChild, query, ref } from "firebase/database"
import { db } from "../../firebase-config"
import { getUserData } from "../../hooks/useGetData"
import { Box, Grid, List, Paper } from "@mui/material"
import withAuth from "../../auth/withAuth"
import ChatMessage, { MessageI } from "./Message"
import SendMessage from "./SendMessage"

interface ChatRoomI {
  roomId: string
  name?: string
}

function ChatRoomNoAuth({ roomId, currentUser }: AuthContextI & ChatRoomI) {
  const [roomName, setRoomName] = useState<string | null | undefined>(undefined)
  const [messages, setMessages] = useState<MessageI[]>([])
  // const [messageItems, setMessageItems] = useState<React.ReactElement[]>([])

  console.log("messages", messages)

  useEffect(() => {
    const messageRef = ref(db, `messages/${roomId}`)
    const messageQuery = query(messageRef, orderByChild("sendAt"), limitToLast(20))
    const roomRef = ref(db, `rooms/${roomId}`)

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
            const user = await getUserData(member)
            setRoomName(user?.displayName)
          }
        }
      }
    })
  }, [])

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
        <SendMessage />
      </div>
      {/*</Paper>*/}
    </div>
  )
}

export default withAuth(ChatRoomNoAuth)
