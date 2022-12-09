import { ChatBubble, DeleteForever, Info, MoreVert, Person, Star, StarBorder } from "@mui/icons-material"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import ChatService from "src/services/ChatService"
import userService from "src/services/UserService"

import ShowDialog from "./ShowDialog"

function BobbelMenu({ post, details, currentUser, deletePost }: { post: Post; details?: boolean } & AuthContextI) {
  const navigate = useNavigate()
  const anchorRef = React.useRef<HTMLButtonElement>(null)
  const [openMenu, setOpenMenu] = React.useState(false)
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)

  if (currentUser == null) {
    return <Loader />
  }

  const togglePostFavorites = async () => {
    await userService.togglePostFavorites(currentUser, post.id || "")
  }

  const messageToAuthor = async () => {
    const key = await ChatService.createChat(currentUser, post.author)
    navigate(`/chat/${key}`)
  }

  return (
    <div>
      <IconButton aria-label="settings" onClick={() => setOpenMenu(!openMenu)} ref={anchorRef}>
        <MoreVert />
      </IconButton>
      <Menu anchorEl={anchorRef.current} open={openMenu} onClick={() => setOpenMenu(false)}>
        <MenuItem
          onClick={() => {
            togglePostFavorites()
          }}
        >
          {currentUser?.favoritePosts?.includes(post.id || "") ? (
            <>
              <ListItemIcon>
                <StarBorder />
              </ListItemIcon>
              <ListItemText> Aus Merkzettel entfernen</ListItemText>
            </>
          ) : (
            <>
              <ListItemIcon>
                <Star />
              </ListItemIcon>
              <ListItemText> Beitrag in Merkzettel</ListItemText>
            </>
          )}
        </MenuItem>
        {currentUser?.id !== post.author.id ? (
          <div>
            {details && (
              <MenuItem onClick={() => setPostDialogOpen(true)}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText>Details</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={() => navigate(`/profile/${post.author.id}`)}>
              <ListItemIcon>
                <Person />
              </ListItemIcon>
              <ListItemText>Zum Autor</ListItemText>
            </MenuItem>
            <MenuItem
              onClick={() => {
                messageToAuthor()
              }}
            >
              <ListItemIcon>
                <ChatBubble />
              </ListItemIcon>
              <ListItemText> Nachricht an Autor</ListItemText>
            </MenuItem>
          </div>
        ) : (
          <div>
            {details && (
              <MenuItem onClick={() => setPostDialogOpen(true)}>
                <ListItemIcon>
                  <Info />
                </ListItemIcon>
                <ListItemText>Details</ListItemText>
              </MenuItem>
            )}
            <MenuItem onClick={() => deletePost(post)}>
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText> Beitrag löschen</ListItemText>
            </MenuItem>
          </div>
        )}
      </Menu>
      <ShowDialog open={postDialogOpen} setOpen={setPostDialogOpen} post={post} />
    </div>
  )
}

BobbelMenu.defaultProps = {
  details: true,
}

export default withAuth(BobbelMenu)
