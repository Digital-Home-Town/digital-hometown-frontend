import * as React from "react"
import Chip from "@mui/material/Chip"
import Autocomplete from "@mui/material/Autocomplete"
import TextField from "@mui/material/TextField"

interface TagSelectI {
  label: string
  placeholder: string
  onChange: (tagList: string[]) => void
}

function TagSelect({ label, placeholder, onChange }: TagSelectI) {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tags.map((option) => option.name)}
      defaultValue={[]}
      onChange={(e, value) => {
        onChange(value)
      }}
      freeSolo
      renderTags={(value: readonly string[], getTagProps) =>
        value.map((option: string, index: number) => (
          <Chip variant="outlined" label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => <TextField {...params} label={label} placeholder={placeholder} />}
    />
  )
}

export default TagSelect

const tags = [
  { id: 1, name: "Kultur" },
  { id: 2, name: "Sport" },
  { id: 3, name: "Werkzeug" },
  { id: 4, name: "Gesellschaft" },
  { id: 5, name: "Technik" },
  { id: 6, name: "Sonstiges" },
]
