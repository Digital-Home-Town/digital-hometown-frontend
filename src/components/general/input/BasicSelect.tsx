import * as React from "react"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { FormControl } from "@mui/material"

interface BasicSelectI {
  label: string
  items: { value: string; label: string }[]
  name?: string
  required?: boolean
  disabled?: boolean
  initialValue: string | undefined
  onChange: (value: string) => void
}

function BasicSelect({ label, items, name, required, disabled, initialValue, onChange }: BasicSelectI) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string)
  }

  return (
    <FormControl fullWidth required={required}>
      <InputLabel id="simple-select-label">{label}</InputLabel>
      <Select
        name={name}
        disabled={disabled}
        required={required}
        value={initialValue}
        label={label}
        variant="standard"
        onChange={handleChange}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}

BasicSelect.defaultProps = {
  required: false,
  disabled: false,
}

export default BasicSelect
