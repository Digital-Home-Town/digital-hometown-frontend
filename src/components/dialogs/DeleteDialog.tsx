import React from "react"
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from "@mui/material"

interface DeleteDialogProps {
  open: boolean
  title: string
  text: string
  handleClose: () => void
  onConfirm: () => void
}

function DeleteDialog({ open, handleClose, onConfirm, title, text }: DeleteDialogProps) {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">{text}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} autoFocus>
          Abbruch
        </Button>
        <Button
          onClick={() => {
            handleClose()
            onConfirm()
          }}
          color="error"
        >
          Endgültig löschen
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default DeleteDialog
