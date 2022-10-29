import Autocomplete from "@mui/material/Autocomplete"
import Chip from "@mui/material/Chip"
import TextField from "@mui/material/TextField"
import * as React from "react"
import tags from "src/data/tags"

interface TagSelectI {
  label: string
  placeholder: string
  onChange: (tagList: string[]) => void
  onlyTags?: boolean
  values?: string[]
}

function TagSelect({ label, placeholder, onlyTags, onChange, values }: TagSelectI) {
  return (
    <Autocomplete
      multiple
      id="tags-filled"
      options={tags.map((option) => option.name)}
      defaultValue={[]}
      value={values}
      onChange={(e, value) => {
        onChange(value)
      }}
      freeSolo={!onlyTags}
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
