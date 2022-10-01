import React from "react"

import Button from "@mui/material/Button"
import Chip from "@mui/material/Chip"

import Accordion from "@mui/material/Accordion"
import AccordionDetails from "@mui/material/AccordionDetails"
import AccordionSummary from "@mui/material/AccordionSummary"

import Dialog from "@mui/material/Dialog"
import DialogTitle from "@mui/material/DialogTitle"
import DialogContentText from "@mui/material/DialogContentText"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import TextField from "@mui/material/TextField"

import { interestOptions } from "./interestOptions"

interface EditTextProps {
  open: boolean
  handleClose: () => void
  value: any
  handleSaveValue: (param: any) => void
}

export function DialogEditInterests({ open, handleClose, value, handleSaveValue }: EditTextProps) {
  // BUG: initial value isnt updated while list is updated through chip-closing :(
  const [tempValue, setTempValue] = React.useState<string[]>(value)

  const handleClick = (category: string, tag: string) => {
    let newList: string[] = [...tempValue]
    if (newList.includes(tag)) {
      newList = newList.filter((item) => item !== tag)
    } else {
      newList = [...newList, tag]
    }
    setTempValue(newList)
  }
  const handleSaveAndClose = (save: boolean) => {
    if (save) {
      handleSaveValue(tempValue)
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Interessen</DialogTitle>
      <DialogContent>
        <DialogContentText>Hier steht was zu tun ist!</DialogContentText>

        {interestOptions.map((data: any) => {
          return (
            <Accordion>
              <AccordionSummary>{data.category}</AccordionSummary>
              <AccordionDetails>
                {data.tags.map((tag: string, index: number) => {
                  return (
                    <>
                      <Chip
                        key={index}
                        label={tag}
                        color={tempValue.includes(tag) ? "primary" : "default"}
                        onClick={() => {
                          handleClick(data.category, tag)
                        }}
                      />
                    </>
                  )
                })}
              </AccordionDetails>
            </Accordion>
          )
        })}
      </DialogContent>

      <DialogActions>
        <Button onClick={(event) => handleSaveAndClose(false)}>Cancel</Button>
        <Button onClick={(event) => handleSaveAndClose(true)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}

export function DialogEditText({ open, handleClose, value, handleSaveValue }: EditTextProps) {
  let tempValue = ""

  const handleSaveAndClose = (save: boolean) => {
    if (save) {
      handleSaveValue(tempValue)
    }
    handleClose()
  }

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Beschreibung</DialogTitle>
      <DialogContent>
        <DialogContentText>Hier steht was zu tun ist!</DialogContentText>
        <TextField
          defaultValue={value}
          autoFocus
          margin="dense"
          type="text"
          fullWidth
          variant="standard"
          onChange={(e) => (tempValue = e.target.value)}
        />
      </DialogContent>

      <DialogActions>
        <Button onClick={(event) => handleSaveAndClose(false)}>Cancel</Button>
        <Button onClick={(event) => handleSaveAndClose(true)}>Save</Button>
      </DialogActions>
    </Dialog>
  )
}
