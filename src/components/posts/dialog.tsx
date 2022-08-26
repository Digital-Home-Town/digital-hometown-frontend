import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { FormControl, FormHelperText, Stack, TextField } from "@mui/material"
import { POST_TYPES } from "src/global"
import BasicSelect from "../general/input/BasicSelect"
import { toast } from "react-toastify"
import withAuth from "src/auth/withAuth"
import PostService from "src/services/PostService"
import { AuthContextI } from "src/auth/AuthContext"

interface CreatePostDialogI {
  open: boolean
  setOpen: (open: boolean) => void
}

function CreatePostDialog({ open, setOpen, currentUser }: CreatePostDialogI & AuthContextI) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const [postTitle, setPostTitle] = React.useState<string>("")
  const [postText, setPostText] = React.useState<string>("")
  const [postType, setPostType] = React.useState<string | undefined>(undefined)

  const handleSubmit = () => {
    if (postType && postText && currentUser && postTitle) {
      setOpen(false)
      toast.success("Dein Beitrag geht hinaus in deine Nachbarschaft!")
      PostService.create({ type: postType, text: postText, author: currentUser.id, title: postTitle })
    } else {
      toast.warn("Ein Beitrag muss aus einem Title, einer Nachricht und einem Typ bestehen!")
    }
  }

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
      <FormControl fullWidth required>
        <DialogTitle id="responsive-dialog-title">Erstelle einen Beitrag</DialogTitle>
        <DialogContent>
          <Stack spacing={2} style={{ width: 500 }}>
            <TextField
              required
              fullWidth
              type="text"
              autoFocus
              label="Gib deinem Beitrag einen Titel"
              value={postTitle}
              onChange={(e) => setPostTitle(e.target.value)}
            />
            <TextField
              required
              fullWidth
              value={postText}
              name="postText"
              label="Schreibe deinen Beitrag"
              variant="outlined"
              multiline
              size="small"
              minRows={8}
              maxRows={400}
              placeholder="Dein Beitrag"
              onChange={(e) => setPostText(e.target.value as string)}
            />
            <BasicSelect
              required
              name="postType"
              label="Beitragstyp auswählen"
              items={POST_TYPES.map((val) => {
                return { value: val, label: val }
              })}
              initialValue={postType}
              onChange={setPostType}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Abbruch</Button>
          <Button onClick={handleSubmit}>Absenden</Button>
        </DialogActions>
        <FormHelperText id="my-helper-text">* Pflichtfelder</FormHelperText>
      </FormControl>
    </Dialog>
  )
}

export default withAuth(CreatePostDialog)
