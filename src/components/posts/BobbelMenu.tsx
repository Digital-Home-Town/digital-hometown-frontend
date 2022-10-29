import { ChatBubble, DeleteForever, Info, MoreVert, Person, Star, StarBorder } from "@mui/icons-material"
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material"
import * as React from "react"
import { useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import ChatService from "src/services/ChatService"
import userService from "src/services/UserService"

import usePostContext from "./PostContext"
import ShowDialog from "./ShowDialog"

function BobbelMenu({ post, currentUser }: { post: Post } & AuthContextI) {
  const navigate = useNavigate()
  const { deletePost } = usePostContext()
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
        {currentUser?.id !== post.author.id ? (
          <div>
            <MenuItem onClick={() => setPostDialogOpen(true)}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText>Details</ListItemText>
            </MenuItem>
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
            <MenuItem onClick={() => setPostDialogOpen(true)}>
              <ListItemIcon>
                <Info />
              </ListItemIcon>
              <ListItemText>Details</ListItemText>
            </MenuItem>
            <MenuItem onClick={() => deletePost(post)}>
              <ListItemIcon>
                <DeleteForever />
              </ListItemIcon>
              <ListItemText> Beitrag löschen</ListItemText>
            </MenuItem>
          </div>
        )}
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
      </Menu>
      <ShowDialog open={postDialogOpen} setOpen={setPostDialogOpen} post={post} />
    </div>
  )
}

export default withAuth(BobbelMenu)
