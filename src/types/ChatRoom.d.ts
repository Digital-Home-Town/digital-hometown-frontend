interface RoomI {
  id: string
  members: { [userId: string]: { role: string; user: GenericProfile } }
  name: string
  isGroup: boolean
  lastMessageSendAt: number
}
