import * as React from "react"
import Button from "@mui/material/Button"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import useMediaQuery from "@mui/material/useMediaQuery"
import { useTheme } from "@mui/material/styles"
import { MenuItem, Select, TextField } from "@mui/material"
import { POST_TYPES } from "src/global"

function CreatePostDialog({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"))

  const handleClose = () => {
    setOpen(false)
  }

  return (
    <div>
      <Dialog fullScreen={fullScreen} open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogTitle id="responsive-dialog-title">Erstelle einen Beitrag</DialogTitle>
        <DialogContent>
          <DialogContentText>
            <Select title="Welche Art">
              {POST_TYPES.map((type) => (
                <MenuItem value={type}>{type}</MenuItem>
              ))}
            </Select>
          </DialogContentText>

          <TextField
            multiline
            minRows={3}
            maxRows={400}
            placeholder="Schreibe deine Botschaft"
            style={{ width: 200 }}
          />
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Abbruch
          </Button>
          <Button onClick={handleClose} autoFocus>
            Absenden
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default CreatePostDialog
