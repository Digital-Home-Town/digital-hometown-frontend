import { AuthContextI } from "../../auth/AuthContext"
import React, { useEffect, useState } from "react"
import { onValue, ref, orderByChild, query, limitToLast } from "firebase/database"
import { db } from "../../firebase-config"
import { getUserData } from "../../hooks/useGetData"
import { List } from "@mui/material"
import withAuth from "../../auth/withAuth"
import ChatMessage, { ChatMessageI } from "./ChatMessage"

interface ChatRoomI {
  roomId: string
  name?: string
}

function ChatRoomNoAuth({ roomId, currentUser }: AuthContextI & ChatRoomI) {
  const [roomName, setRoomName] = useState<string | null | undefined>(undefined)
  const [messages, setMessages] = useState<ChatMessageI[]>([])
  const [messageItems, setMessageItems] = useState<React.ReactElement[]>([])

  useEffect(() => {
    const messageRef = ref(db, `messages/${roomId}`)
    const messageQuery = query(messageRef, orderByChild("sendAt"), limitToLast(20))
    const roomRef = ref(db, `rooms/${roomId}`)

    onValue(
      messageQuery,
      async (snapshot) => {
        const messages_ = snapshot.val()
        console.log("messages", messages_)
        setMessages(messages_)
      },
      (error) => {
        console.error(error)
      },
    )

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

  useEffect(() => {
    setMessageItems([])
    messages.forEach((msg, i) => {
      getUserData(msg.sendBy).then((user) => {
        setMessageItems((prev) => [...prev, <ChatMessage key={i} message={msg} user={user} />])
      })
    })
  }, [messages])

  return (
    <div>
      <h1>{roomName}</h1>
      <List>{messageItems.map((item) => item)}</List>
    </div>
  )
}

export default withAuth(ChatRoomNoAuth)
