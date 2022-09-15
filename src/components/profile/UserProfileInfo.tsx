import React, { useRef, useState } from "react"

import { Person } from "@mui/icons-material"
import ClearIcon from "@mui/icons-material/Clear"
import EditIcon from "@mui/icons-material/Edit"
import { Avatar, Button, Card, Chip, Grid, Stack, Typography } from "@mui/material"

import "firebase/compat/storage"
import { deleteObject, getDownloadURL, ref, uploadBytes } from "firebase/storage"

import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import { storage } from "src/firebase-config"
import userService from "src/services/UserService"
import { DialogEditText, DialogEditInterests } from "./DialogContext"

function UserProfileInfo({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  // Internal
  const updateProfileAttribute = (attr: string, value: any, setValue: (param: any) => void) => {
    // Update
    if (profile) {
      var list = { [attr]: value }
      const updatedUser: User = { ...profile, ...list }
      userService.update(updatedUser.id, updatedUser)
    }
    // Change State
    setValue(value)
  }

  // Interests
  const [openInterestsDialog, setOpenInterestsDialog] = React.useState(false)
  const toggleInterestsDialog = () => {
    setOpenInterestsDialog(!openInterestsDialog)
  }

  const [interests, setInterests] = useState<string[]>(profile?.interests || [])

  const saveInterests = (list: string[]) => {
    updateProfileAttribute("interests", list.sort(), setInterests)
  }
  const deleteInterest = (id: number) => {
    // Delete
    const newList = [...interests]
    newList.splice(id, 1)
    updateProfileAttribute("interests", newList, setInterests)
  }

  // Description
  const [openDescDialog, setOpenDescDialog] = React.useState(false)
  const toggleDescDialog = () => {
    setOpenDescDialog(!openDescDialog)
  }

  // TODO: Toast-Meldung
  const defaultDesc = "Bitte ausfüllen."
  const [desc, setDesc] = useState<string>(profile?.desc || defaultDesc)

  const saveDescription = (value: string) => {
    updateProfileAttribute("desc", value || defaultDesc, setDesc)
  }

  // PROFILE
  return (
    <Grid container>
      <Grid item xs={12}>
        {/*Interessen*/}
        <Typography variant="body1" gutterBottom>
          Interessen:{" "}
          <Typography variant="body2" gutterBottom>
            {interests.map((item, i) => (
              <Chip key={i} label={item} onDelete={() => deleteInterest(i)} />
            ))}

            <Chip label="Add" variant="outlined" onClick={toggleInterestsDialog} />
            <DialogEditInterests
              open={openInterestsDialog}
              handleClose={toggleInterestsDialog}
              value={interests}
              handleSaveValue={saveInterests}
            />
          </Typography>
        </Typography>
        <Grid item xs={12}>
          {/*Beschreibung*/}
          <Typography variant="body1" gutterBottom>
            Beschreibung: <br />
            {/*<Button onClick={handleEditDesc}>Add Desc</Button>*/}
            <Typography variant="body2" gutterBottom onClick={toggleDescDialog}>
              {desc}
            </Typography>
            <DialogEditText
              open={openDescDialog}
              handleClose={toggleDescDialog}
              value={desc}
              handleSaveValue={saveDescription}
            />
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withAuth(UserProfileInfo)
