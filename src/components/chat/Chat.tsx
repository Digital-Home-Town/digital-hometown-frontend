import { Grid } from "@mui/material"
import Loader from "src/auth/Loader"
import { ChatContextI, withChat } from "./ChatContext"
import ChatRoom from "./ChatRoom"
import RoomsSideBar from "./RoomsSideBar"

function Chat({ currentRoom }: ChatContextI) {
  return currentRoom == null ? (
    <Loader />
  ) : (
    <Grid container style={{ flexWrap: "nowrap" }}>
      <Grid item style={{ flexGrow: 1, minWidth: "300px" }}>
        <RoomsSideBar />
      </Grid>
      <Grid item style={{ flexGrow: 10 }}>
        <ChatRoom />
      </Grid>
    </Grid>
  )
}

export default withChat(Chat)
