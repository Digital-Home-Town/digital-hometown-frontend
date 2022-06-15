interface RoomI {
  id: string
  members: { [userId: string]: { role: string } }
  name: string
}
