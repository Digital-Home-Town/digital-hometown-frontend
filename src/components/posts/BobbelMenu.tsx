import * as React from "react"
import { MoreVert, ChatBubble, Person } from "@mui/icons-material"
import { IconButton, Menu, MenuItem, ListItemIcon, ListItemText } from "@mui/material"
import { useNavigate } from "react-router"

function BobbelMenu({ post }: { post: Post }) {
  const navigate = useNavigate()
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
      </Menu>
    </div>
  )
}

export default BobbelMenu
