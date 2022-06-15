import { limitToLast, onValue, orderByChild, query, ref } from "firebase/database"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import ReactPlaceholder from "react-placeholder"

import Loader from "../../auth/Loader"
import { realtimeDB } from "../../firebase-config"
import chatService from "../../services/ChatService"
import { toast } from "react-toastify"
import profileService from "../../services/ProfileService"

export interface ChatContextI {
  currentRoomId: string | undefined
  rooms: { [roomId: string]: RoomI } | undefined
  currentRoomName: string | undefined
  messages: { [msgId: string]: MessageI }
  setCurrentRoom: (room: string) => void
  createRoom: () => void
  loading: boolean
}

const ChatContext = createContext<undefined | ChatContextI>(undefined)

export function ChatProvider({ children, currentUser }: { children: ReactNode; currentUser: User }) {
  const [rooms, setRooms] = useState<{ [roomId: string]: RoomI } | undefined>(undefined)
  const [currentRoomName, setCurrentRoomName] = useState<string | undefined>(undefined)
  const [messages, setMessages] = useState<{ [msgId: string]: MessageI }>({})
  const [currentRoomId, setCurrentRoomId] = useState<string | undefined>(undefined)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    onValue(ref(realtimeDB, `rooms`), (snapshot) => {
      const rooms_ = snapshot.val()
      console.log("rooms_", rooms_)
      setRooms(rooms_)
    })
  }, [])

  useEffect(() => {
    // set current room with the first room in the list
    if (rooms != null && Object.keys(rooms).length > 0) {
      setCurrentRoomId(Object.keys(rooms)[0])
      setLoading(false)
    }
  }, [rooms])

  useEffect(() => {
    const func = async () => {
      setMessages({})
      if (currentRoomId == null || rooms == null) {
        return
      }
      const room = rooms[currentRoomId]

      const members = room.members
      delete members[currentUser.id]
      if (Object.keys(members).length === 1) {
        profileService.getProfile(Object.keys(members)[0]).then((profile) => {
          setCurrentRoomName(profile?.displayName)
        })
      } else {
        setCurrentRoomName(room.name)
      }

      const messagesRef = query(
        ref(realtimeDB, `messages/${currentRoomId}/messages`),
        orderByChild("sendAt"),
        limitToLast(20),
      )
      onValue(messagesRef, (snapshot) => {
        const messages_ = snapshot.val()
        console.log("messages_", messages_)
        setMessages(messages_ || {})
      })
    }

    func().then()
  }, [currentRoomId, rooms])

  const handleCurrentRoom = (roomId: string) => {
    setCurrentRoomId(roomId)
  }

  const createRoom = () => {
    chatService.createRoom(currentUser, "Neuer Chat von " + currentUser.displayName).catch(() => {
      toast.error("Es konnte kein neuer Chat-Raum erstellt werden.")
    })
  }

  return (
    <ReactPlaceholder ready={!loading} customPlaceholder={<Loader />}>
      <ChatContext.Provider
        value={{
          rooms: rooms,
          currentRoomId: currentRoomId,
          currentRoomName: currentRoomName,
          setCurrentRoom: handleCurrentRoom,
          createRoom: createRoom,
          messages: messages,
          loading: loading,
        }}
      >
        {children}
      </ChatContext.Provider>
    </ReactPlaceholder>
  )
}

export function useChatContext() {
  const context = React.useContext(ChatContext)

  if (context === undefined) {
    throw new Error("useAuthContext should be used within an AuthProvider.")
  }

  return context
}

export function withChat<Props>(Component: React.ComponentType<Props & ChatContextI>) {
  return function WithAuth(props: Props) {
    const chatContext = useChatContext()

    return <Component {...props} {...chatContext} />
  }
}
