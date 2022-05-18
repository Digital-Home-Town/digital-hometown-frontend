import withAuth from "../../auth/withAuth"
import { AuthContextI, UserI } from "../../auth/AuthContext"
import React, { useEffect, useState } from "react"
import { onValue, ref } from "firebase/database"
import { Navigate } from "react-router-dom"
import { db } from "../../firebase-config"
import { Avatar } from "@mui/material"
import { getUserData } from "../../hooks/useGetData"

function Chat({ currentUser }: AuthContextI) {
  return currentUser != null ? <ChatRoom /> : <Navigate to="/sign-in" />
}

export default withAuth(Chat)

function ChatRoomNoAuth({ currentUser }: AuthContextI) {
  const [messages, setMessages] = useState<ChatMessageI[]>([
    // { sendAt: new Date().getTime(), sendBy: "WfN1PaeWVwULcD5RYM7pfVQXLsM2", text: "Hello" },
    // { sendAt: new Date().getTime(), sendBy: "ZbpTP7X6QDfZ2xAqaNmCtlfZW1t2", text: "Hi" },
  ])
  const [messageItems, setMessageItems] = useState<React.ReactElement[]>([])
  const messageRef = ref(db, "messages/12341234/messages")

  useEffect(() => {
    onValue(messageRef, async (snapshot) => {
      const messages_ = snapshot.val()
      setMessages(messages_)
    })
  }, [])

  // useEffect(() => {
  //   async function f() {
  //     const messages_ = await getMessages("12341234")
  //     setMessages(messages_)
  //   }
  //   f().then()
  // }, [])

  useEffect(() => {
    messages.forEach((msg, i) => {
      getUserData(msg.sendBy).then((user) => {
        setMessageItems((prev) => [...prev, <ChatMessage key={i} message={msg} user={user} />])
      })
    })
  }, [messages])

  // onValue(
  //   messageRef,
  //   (snapshot) => {
  //     const messages = snapshot.val()
  //     setMessages(messages)
  //   },
  //   (error) => {
  //     console.log(error)
  //   },
  // )
  //
  // useEffect(() => {
  //   messages.forEach((msg: ChatMessageI, i: number) => {
  //     const userRef = ref(db, `users/${msg.sendBy}`)
  //     onValue(userRef, (snapshot) => {
  //       const user = snapshot.val()
  //       console.log("user", user)
  //     })
  //     //   const newMessage = <ChatMessage key={i} user={user} message={msg} />
  //     //   setMessageItems((prevItems) => [...prevItems, newMessage])
  //     // })
  //   })
  // }, [messages])

  return <>{messageItems.map((item) => item)}</>
}

const ChatRoom = withAuth(ChatRoomNoAuth)

interface ChatMessageI {
  messageText: string
  sendAt: number
  sendBy: string
}

function ChatMessageNoAuth({ message, user, currentUser }: { message: ChatMessageI; user: UserI } & AuthContextI) {
  const isMyMsg = message.sendBy === currentUser?.uid
  const messageClass = isMyMsg ? "send" : "received"

  return (
    <>
      <div className={`message ${messageClass}`}>
        <Avatar src={user.photoURL || ""} />
        <p>{message.messageText}</p>
        <small>{new Date(message.sendAt).toDateString()}</small>
      </div>
    </>
  )
}

const ChatMessage = withAuth(ChatMessageNoAuth)
