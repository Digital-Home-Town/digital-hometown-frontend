import { Chat, Edit, List, Star } from "@mui/icons-material"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import * as React from "react"
import { useNavigate } from "react-router-dom"

import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import CreatePostDialog from "../posts/CreatePostDialog"

function HeaderButtonMenu({ currentUser }: AuthContextI) {
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)
  const navigate = useNavigate()

  return (
    <>
      <Tooltip title="Merkzettel">
        <IconButton onClick={() => navigate("/merkzettel")} color="inherit">
          <Star />
        </IconButton>
      </Tooltip>
      <Tooltip title="Beitr#ge">
        <IconButton onClick={() => navigate("/posts")} color="inherit">
          <List />
        </IconButton>
      </Tooltip>
      <Tooltip title="Beitrag erstellen">
        <IconButton onClick={() => setPostDialogOpen(true)} color="inherit">
          <Edit />
        </IconButton>
      </Tooltip>
      <Tooltip title="Chat">
        <IconButton onClick={() => navigate("/chat/first")} color="inherit">
          <Chat />
        </IconButton>
      </Tooltip>

      <CreatePostDialog open={postDialogOpen} setOpen={setPostDialogOpen} />
    </>
  )
}

export default withAuth(HeaderButtonMenu)
