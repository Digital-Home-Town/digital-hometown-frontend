import * as React from "react"
import { MoreVert, ChatBubble, Person, DeleteForever } from "@mui/icons-material"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import usePostContext from "./PostContext"

function BobbelMenu({ post, currentUser }: { post: Post } & AuthContextI) {
  const navigate = useNavigate()
  const { deletePost } = usePostContext()
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [openMenu, setOpenMenu] = React.useState(false)

  return (
    <div>
      <IconButton aria-label="settings" onClick={() => setOpenMenu(!openMenu)} ref={anchorRef}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorRef.current} open={openMenu} onClick={() => setOpenMenu(false)}>
        <MenuItem onClick={() => navigate(`/profile/${post.author.id}`)}>
          <ListItemIcon>
            <Person />
          </ListItemIcon>
          <ListItemText>Zum Autor</ListItemText>
        </MenuItem>
        <MenuItem>
          <ListItemIcon>
            <ChatBubble />
          </ListItemIcon>
          <ListItemText> Nachricht an Autor</ListItemText>
        </MenuItem>
        {currentUser?.id === post.author.id && (
          <MenuItem onClick={() => deletePost(post)}>
            <ListItemIcon>
              <DeleteForever />
            </ListItemIcon>
            <ListItemText> Beitrag löschen</ListItemText>
          </MenuItem>
        )}
      </Menu>
    </div>
  )
}

export default withAuth(BobbelMenu)
