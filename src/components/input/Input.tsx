import { TextField } from "@mui/material"
import React from "react"

export interface InputProps {
  name: string
  placeholder: string
  initialValue: string
}
function Input(props: InputProps) {
  const [value, setValue] = React.useState(props.initialValue)

  function handleChange(event: any) {
    event.preventDefault()
    setValue(event.target.value)
  }
  return (
    <TextField
      required
      fullWidth
      id={props.name}
      label={props.placeholder}
      name={props.name}
      autoFocus
      onChange={handleChange}
      value={value}
      sx={{ mt: 2, mb: 2 }}
    />
  )
}

export default Input
