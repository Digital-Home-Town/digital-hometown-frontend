import withAuth, { UserType } from "../../auth/withAuth"
import { AuthContextProps } from "../../auth/AuthContext"
import { FormEvent, useEffect, useRef, useState } from "react"
import { ref, set, onValue, getDatabase, query, orderByKey, limitToFirst } from "firebase/database"
import { Navigate } from "react-router-dom"
import { db, auth } from "../../firebase-config"

const USER_UID_1: string = "WfN1PaeWVwULcD5RYM7pfVQXLsM2"

function Chat({ currentUser }: AuthContextProps) {
  return currentUser != null ? <ChatRoom /> : <Navigate to="/sign-in" />
}

export default withAuth(Chat)

function ChatRoomNoAuth({ currentUser }: AuthContextProps) {
  const messageRef = ref(db, "messages")
  onValue(
    messageRef,
    (snapshot) => {
      console.log(snapshot.val())
    },
    (error) => {
      console.log(error)
    },
  )
  return <>Chat</>
}

const ChatRoom = withAuth(ChatRoomNoAuth)

interface ChatMessageI {
  text: string
  uid: string
  photoURL: string
}

function ChatMessageNoAuth({ message, auth }: { message: ChatMessageI; auth: AuthContextProps }) {
  const { text, uid, photoURL } = message

  const messageClass = uid === auth.currentUser?.uid ? "sent" : "received"

  return (
    <>
      <div className={`message ${messageClass}`}>
        <img src={photoURL || "https://api.adorable.io/avatars/23/abott@adorable.png"} />
        <p>{text}</p>
      </div>
    </>
  )
}

const ChatMessage = withAuth(ChatMessageNoAuth)
