interface RoomI {
  id: string
  members: { [userId: string]: { role: string; user: GenericProfile } }
  name: string
  group: boolean
  lastMessageSendAt: number
}
