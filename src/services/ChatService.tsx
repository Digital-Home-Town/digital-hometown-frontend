import { realtimeDB } from "../firebase-config"
import { get, push, ref, set } from "firebase/database"

class ChatService {
  async getMessages(roomId: string) {
    const snapshot = await get(ref(realtimeDB, `messages/${roomId}/messages`))
    return snapshot.val()
  }

  async sendMessage(roomId: string, message: MessageI) {
    try {
      const resp = await push(ref(realtimeDB, `messages/${roomId}/messages`), message)
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
}

const chatService = new ChatService()
export default chatService
