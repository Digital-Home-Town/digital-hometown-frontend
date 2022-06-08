import React, { useEffect } from "react"
import { DatePicker as DatePickerMui } from "@mui/x-date-pickers/DatePicker"
import { TextField } from "@mui/material"

interface DatePickerI {
  name: string
  placeholder: string
  initialValue: Date | undefined
}

function DatePicker({ name, placeholder, initialValue }: DatePickerI) {
  const [value, setValue] = React.useState<Date | undefined>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <DatePickerMui
      disableFuture
      label={placeholder}
      openTo="year"
      views={["year", "month", "day"]}
      inputFormat="dd.MM.yyyy"
      mask="__.__.____"
      value={value}
      onChange={(newValue) => {
        setValue(newValue || undefined)
      }}
      renderInput={(params) => <TextField {...params} type="date" name={name} />}
    />
  )
}

export default DatePicker
