import { Dialog, DialogTitle } from "@mui/material"
import UserTable from "../table/UserTable"

interface SimpleDialogI {
  open: boolean
  onRowClick: (profile: ProfileI) => void
  onClose: () => void
}

export function AddMemberDialog({ open, onRowClick, onClose }: SimpleDialogI) {
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle>Wähle einen Benutzer</DialogTitle>
      <UserTable onRowClick={onRowClick} />
    </Dialog>
  )
}
