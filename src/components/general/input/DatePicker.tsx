import React, { useEffect } from "react"
import { DateTimePicker as DateTimePickerMui } from "@mui/x-date-pickers/DateTimePicker"
import { TextField } from "@mui/material"
import { CalendarPickerView, ClockPickerView } from "@mui/x-date-pickers"

interface DatePickerI {
  name: string
  placeholder: string
  initialValue: Date | undefined
  views?: (ClockPickerView | CalendarPickerView)[]
  format?: string
  mask?: string
  required?: boolean
}

function DatePicker({ name, placeholder, initialValue, views, format, mask, required }: DatePickerI) {
  const [value, setValue] = React.useState<Date | undefined>(initialValue)

  useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  return (
    <DateTimePickerMui
      disableFuture
      label={placeholder}
      openTo="year"
      views={views}
      inputFormat={format}
      mask={mask}
      value={value}
      onChange={(newValue) => {
        setValue(newValue || undefined)
      }}
      renderInput={(params) => <TextField {...params} required={required} type="date" name={name} />}
    />
  )
}

DatePicker.defaultProps = {
  views: ["year", "month", "day"] as CalendarPickerView[],
  format: "dd.MM.yyyy",
  mask: "__.__.____",
  required: false,
}

export default DatePicker
