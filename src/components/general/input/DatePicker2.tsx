import React from "react"
import { DateTimePicker as DateTimePickerMui } from "@mui/x-date-pickers/DateTimePicker"
import { TextField } from "@mui/material"
import { CalendarPickerView, ClockPickerView } from "@mui/x-date-pickers"

type onChangeType = (name: string, newDate: Date | null) => void

interface DatePickerI {
  name: string
  placeholder: string
  initialValue: Date
  views?: (ClockPickerView | CalendarPickerView)[]
  format?: string
  mask?: string
  required?: boolean
  past?: boolean
  future?: boolean
  onChange: onChangeType
}

function DatePicker({
  name,
  placeholder,
  initialValue,
  views,
  format,
  mask,
  required,
  past,
  future,
  onChange,
}: DatePickerI) {
  return (
    <DateTimePickerMui
      disableFuture={!future}
      disablePast={!past}
      label={placeholder}
      openTo="day"
      views={views}
      inputFormat={format}
      mask={mask}
      value={initialValue}
      onChange={(newValue) => {
        onChange(name, newValue)
      }}
      renderInput={(params) => <TextField {...params} required={required} type="date" name={name} />}
    />
  )
}

DatePicker.defaultProps = {
  views: ["year", "day"] as CalendarPickerView[],
  format: "dd.MM.yyyy",
  mask: "__.__.____",
  required: false,
  onChange: undefined,
  past: true,
  future: true,
}

export default DatePicker
