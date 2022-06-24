import { onValue, ref } from "firebase/database"
import React, { createContext, ReactNode, useEffect, useState } from "react"
import ReactPlaceholder from "react-placeholder"

import Loader from "../../auth/Loader"
import { realtimeDB } from "../../firebase-config"
import chatService from "../../services/ChatService"
import { toast } from "react-toastify"
import UserService from "../../services/UserService"

export interface ChatContextI {
  rooms: RoomI[]
  currentRoom: RoomI | undefined
  setCurrentRoom: (roomId: string) => void
  createRoom: () => void
  messages: { [msgId: string]: MessageI }
  loading: boolean
}

const ChatContext = createContext<undefined | ChatContextI>(undefined)

export function ChatProvider({ children, currentUser }: { children: ReactNode; currentUser: GenericProfile }) {
  const [rooms, setRooms] = useState<RoomI[]>([])

  const [currentRoom, setCurrentRoom] = useState<RoomI | undefined>(undefined)
  const [messages, setMessages] = useState<{ [msgId: string]: MessageI }>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    console.log("register get rooms from realtime db")

    onValue(ref(realtimeDB, `rooms`), (snpsht) => {
      const rooms_ = snpsht.val()
      console.log("get rooms from realtime db", rooms_)

      async function f(rooms_: { [roomId: string]: RoomI }) {
        const newRooms = []
        for (const roomId in rooms_) {
          const room = rooms_[roomId]
          let name
          const members = room.members

          // do not show rooms where current user is not a member
          if (!Object.keys(members).includes(currentUser.id)) {
            continue
          }

          if (Object.keys(members).length - 1 === 1) {
            try {
              // only two users => get the name of the other user as room name
              const profile = await UserService.get(Object.keys(members).filter((item) => item !== currentUser.id)[0])
              console.log("Chat name", profile?.displayName)
              name = profile?.displayName || room.name
            } catch (e) {
              toast.error("Die Daten deines Chatpartners konnten nicht geladen werden.")
              throw e
            }
          } else {
            name = room.name
          }
          newRooms.push({ ...room, name: name, id: roomId })
        }
        setRooms(newRooms)
      }

      f(rooms_).then()
    })
  }, [])

  useEffect(() => {
    if (currentRoom == null) {
      setCurrentRoom(rooms[0])
    }
    setLoading(false)
  }, [rooms])

  useEffect(() => {
    const func = async () => {
      setMessages({})
      if (currentRoom?.id == null || rooms == null) {
        return
      }

      onValue(ref(realtimeDB, `messages/${currentRoom.id}/messages`), (snpsht) => {
        const msgs = snpsht.val()
        setMessages(msgs)
      })
    }

    func().then()
  }, [currentRoom])

  const handleCurrentRoom = (roomId: string) => {
    if (rooms != null) setCurrentRoom(rooms.filter((room) => room.id === roomId)[0])
    console.log("set current room", roomId)
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
          currentRoom: currentRoom,
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
