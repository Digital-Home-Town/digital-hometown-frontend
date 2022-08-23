import { Cancel } from "@mui/icons-material"
import { Button } from "@mui/material"

interface CancelButtonI {
  onClick: () => void
}

function CancelButton({ onClick }: CancelButtonI) {
  return (
    <Button type="reset" onClick={() => onClick()} endIcon={<Cancel />}>
      Abbrechen
    </Button>
  )
}

export default CancelButton
