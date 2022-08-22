import { Cancel, Edit, Save } from "@mui/icons-material"
import { Button, IconButton } from "@mui/material"

interface EditButtonI {
  onClick: () => void
  small?: boolean
}

function EditButton({ onClick, small }: EditButtonI) {
  return (
    <Button type="button" onClick={() => onClick()} endIcon={<Edit />} size={small ? "small" : "medium"}>
      Bearbeiten
    </Button>
  )
}

EditButton.defaultProps = {
  small: false,
}

export default EditButton
