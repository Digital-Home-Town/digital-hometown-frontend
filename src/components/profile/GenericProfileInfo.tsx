import SaveIcon from "@mui/icons-material/Save"
import {
  Box,
  CardContent,
  Chip,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import React, { useState } from "react"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import userService from "src/services/UserService"

import TagSelect from "../general/input/TagSelect"

function GenericProfileInfo({ profile, currentUser, editMode }: ProfileProps<User | Club> & AuthContextI) {
  // Internal
  const readOnly: boolean = currentUser == null || currentUser.id !== profile?.id

  const [interests, setInterests] = useState<string[]>(profile?.interests || [])

  if (profile?.interests && (interests !== profile?.interests || interests.length !== 0)) {
    setInterests(profile.interests || [])
  }
  const saveInterests = (list: string[]) => {
    const interests = list.sort()
    userService.updateAttribute(profile, { interests: interests })
    setInterests(interests)
  }

  const [desc, setDesc] = useState<string>(profile?.desc || "")
  if (profile?.desc && desc !== profile?.desc) {
    setDesc(profile.desc || "")
  }
  const handleDescChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const desc = event.target.value
    setDesc(desc)
  }
  const save = () => {
    userService.updateAttribute(profile, { desc: desc })
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "65%" }}>
      <CardContent sx={{ width: "100%" }}>
        <Typography variant="h6" gutterBottom>
          {profile?.displayName || "Kein Name"}
        </Typography>
        <Stack>
          Interessen:
          <br></br>
          {!readOnly && editMode ? (
            <>
              <TagSelect
                label={"Interessen auswählen"}
                placeholder={"Sport / Werkzeug / ..."}
                onChange={saveInterests}
                onlyTags={true}
                values={interests}
              />
            </>
          ) : (
            <>
              <Stack direction="row">
                {interests.length
                  ? interests.map((item, i) => <Chip key={i} label={item} />)
                  : "Keine Interessen ausgewählt..."}
              </Stack>
            </>
          )}
        </Stack>
        <Stack marginTop={2}>
          Beschreibung:
          {!readOnly && editMode ? (
            <Stack direction="row">
              <TextField
                disabled={readOnly || !editMode}
                placeholder="Hier kannst du eine kurze Beschreibung über dich eingeben."
                multiline
                fullWidth
                minRows={3}
                maxRows={10}
                value={desc}
                onChange={handleDescChange}
              />
              <IconButton color="success" onClick={save}>
                <SaveIcon />
              </IconButton>
            </Stack>
          ) : (
            <Stack direction="row">{desc || "Keine Beschreibung verfügbar..."}</Stack>
          )}
        </Stack>
      </CardContent>
    </Box>
  )
}

export default withAuth(GenericProfileInfo)
