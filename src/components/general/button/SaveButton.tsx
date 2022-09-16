import { Save } from "@mui/icons-material"
import { Button } from "@mui/material"

interface SaveButtonI {
  onClick: () => void
}

function SaveButton({ onClick }: SaveButtonI) {
  return (
    <Button type="submit" onClick={() => onClick()} endIcon={<Save />}>
      Speichern
    </Button>
  )
}

export default SaveButton
