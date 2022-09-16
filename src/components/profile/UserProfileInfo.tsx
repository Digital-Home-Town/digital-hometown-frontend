import React, { useState } from "react"

import { Chip, Grid, Typography } from "@mui/material"

import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import { DialogEditText, DialogEditInterests } from "./DialogContext"
import { updateProfileAttribute } from "./updateProfileAttribute"

function UserProfileInfo({ profile, currentUser }: ProfileProps<User> & AuthContextI) {
  // Internal
  const readOnly: boolean = currentUser == null || currentUser.id !== profile?.id

  // Interests
  const [openInterestsDialog, setOpenInterestsDialog] = React.useState(false)
  const toggleInterestsDialog = () => {
    setOpenInterestsDialog(!openInterestsDialog)
  }

  const [interests, setInterests] = useState<string[]>(profile?.interests || [])

  const saveInterests = (list: string[]) => {
    updateProfileAttribute(profile, "interests", list.sort(), setInterests)
  }
  const deleteInterest = (id: number) => {
    // Delete
    const newList = [...interests]
    newList.splice(id, 1)
    updateProfileAttribute(profile, "interests", newList, setInterests)
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
    updateProfileAttribute(profile, "desc", value || defaultDesc, setDesc)
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
              <Chip
                key={i}
                label={item}
                onDelete={
                  !readOnly
                    ? (i) => {
                        deleteInterest(i)
                      }
                    : undefined
                }
              />
            ))}

            {!readOnly ? (
              <>
                <Chip label="Add" variant="outlined" onClick={toggleInterestsDialog} />
                <DialogEditInterests
                  open={openInterestsDialog}
                  handleClose={toggleInterestsDialog}
                  value={interests}
                  handleSaveValue={saveInterests}
                />
              </>
            ) : (
              ""
            )}
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
            {!readOnly ? (
              <DialogEditText
                open={openDescDialog}
                handleClose={toggleDescDialog}
                value={desc}
                handleSaveValue={saveDescription}
              />
            ) : (
              ""
            )}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default withAuth(UserProfileInfo)
