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

  const [postType, setPostType] = React.useState<string | undefined>(undefined)
  const [postText, setPostText] = React.useState<string>("")

  const handleSubmit = () => {
    if (postType && postText && currentUser) {
      setOpen(false)
      toast.success("Dein Beitrag geht hinaus in deine Nachbarschaft!")
      PostService.create({ type: postType, text: postText, author: currentUser.id })
    } else {
      toast.warn("Ein Beitrag muss einen Text enthalten und einem Beitragstyp zugewiesen sein!")
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
              value={postText}
              name="postText"
              label="Schreibe deine Botschaft"
              autoFocus
              variant="outlined"
              multiline
              size="small"
              minRows={6}
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
