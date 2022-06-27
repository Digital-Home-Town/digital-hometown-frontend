import { realtimeDB } from "../firebase-config"
import { get, push, ref, set, remove } from "firebase/database"

class ChatService {
  async sendMessage(roomId: string, text: string, currentUser: GenericProfile) {
    try {
      const sendAt = Date.now()
      await set(ref(realtimeDB, `rooms/${roomId}/lastMessageSendAt`), sendAt)
      const resp = await push(ref(realtimeDB, `messages/${roomId}/messages`), {
        text: text,
        sendAt: sendAt,
        sendBy: currentUser.id,
      })
      console.log("added message", resp.key)
    } catch (error) {
      throw error
    }
  }

  async createRoom(currentUser: GenericProfile, name: string) {
    try {
      const resp = await push(ref(realtimeDB, `rooms`), {
        name: name,
        members: { [currentUser.id]: { role: "admin" } },
      })
      console.log("added new room", resp.key)
      return resp.key
    } catch (error) {
      throw error
    }
  }

  async editRoom(roomId: string, name: string) {
    await set(ref(realtimeDB, `rooms/${roomId}/name`), name)
  }

  async addMember(roomId: string, userId: string, role: string = "admin") {
    await set(ref(realtimeDB, `rooms/${roomId}/members/${userId}`), { role: "admin" })
  }

  async removeMember(roomId: string, userId: string) {
    await remove(ref(realtimeDB, `rooms/${roomId}/members/${userId}`))
  }
}

const chatService = new ChatService()
export default chatService
