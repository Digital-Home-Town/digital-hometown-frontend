interface RoomI {
  members: { [userId: string]: { role: string } }
  name: string
}
