import * as React from "react"
import Box from "@mui/material/Box"
import InputLabel from "@mui/material/InputLabel"
import MenuItem from "@mui/material/MenuItem"
import Select, { SelectChangeEvent } from "@mui/material/Select"
import { FormControl } from "@mui/material"

interface BasicSelectI {
  label: string
  items: { value: string; label: string }[]
  name?: string
  required?: boolean
  initialValue: string | undefined
  onChange: (value: string) => void
}

function BasicSelect({ label, items, name, required, initialValue, onChange }: BasicSelectI) {
  const handleChange = (event: SelectChangeEvent) => {
    onChange(event.target.value as string)
  }

  return (
    <Box sx={{ minWidth: 120, margin: "5pt" }}>
      <FormControl fullWidth required={required}>
        <InputLabel id="simple-select-label">{label}</InputLabel>
        <Select
          name={name}
          required={required}
          labelId="simple-select-label"
          id="simple-select"
          value={initialValue}
          label={label}
          onChange={handleChange}
        >
          {items.map((item) => (
            <MenuItem key={item.value} value={item.value}>
              {item.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  )
}

BasicSelect.defaultProps = {
  required: false,
}

export default BasicSelect
