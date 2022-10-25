import React, { useState } from "react"
import { toast } from "react-toastify"

import { Stack, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"

import parse from "date-fns/parse"

import withAuth from "src/auth/withAuth"
import userService from "src/services/UserService"
import { AuthContextI } from "src/auth/AuthContext"
import DatePicker from "../../components/general/input/DatePicker"
import Input from "../../components/general/input/Input"

function UserSettingsPage({ currentUser, setCurrentUser }: AuthContextI) {
  const delimiter: string = " "
  const fullName: string[] = (currentUser?.displayName || "").split(delimiter)

  const givenName: string = fullName[0]
  const surName: string = fullName[1] || ""

  // https://www.geeksforgeeks.org/react-mui-textfield-api/
  // https://dev.to/omardiaa48/how-to-make-a-robust-form-validation-in-react-with-material-ui-fields-1kb0

  const [formValues, setFormValues] = useState({
    givenName: {
      value: givenName,
      error: false,
      errorMessage: "Fehlerhafter Vorname",
    },
    surName: {
      value: surName,
      error: false,
      errorMessage: "Fehlerhafter Familienname",
    },
    email: {
      value: currentUser?.email || "",
      error: false,
      errorMessage: "Fehlerhafte Email",
    },
    dateOfBirth: {
      value: currentUser?.dateOfBirth || "",
      error: false,
      errorMessage: "Fehlerhaftes Geburtsdatum",
    },
    postCode: {
      value: "postCode",
      error: false,
      errorMessage: "Fehlerhafte PLZ",
    },
  })

  const handleChange = (evt: any) => {
    //const { name, value }: { string, string | number } = evt.target //vs evt.currentTarget.value ?
    const name: string = evt.target.name
    const value: any = evt.target.value
    console.log(name)

    // TODO:
    //  * Validation
    //  * Disable submit button
    //  * Implement formValues into handleSubmit

    // setFormValues({
    //   ...formValues,
    //   [name]: {
    //     ...formValues[name as keyof ObjectType],
    //     value,
    //   },
    // })
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const givenName = (data.get("givenName") as string).trim() || ""
    const surName = (data.get("surName") as string).trim() || ""
    const fullName = givenName + delimiter + surName

    const email = (data.get("email") as string).trim() || ""
    const dateOfBirth = parse(data.get("dateOfBirth") as string, "dd.MM.yyyy", new Date()).getTime()

    const postCode: number = Number(data.get("postCode")) || 0

    if (fullName.length > 0 && email.length > 0 && dateOfBirth && currentUser) {
      const profile: User = {
        ...currentUser,
        displayName: fullName,
        email: email,
        dateOfBirth: dateOfBirth,
        postCode: postCode,
      }
      userService
        .update(currentUser.id, profile)
        .then(() => {
          setCurrentUser(profile)
          toast.success("Dein Profil wurde aktualisiert.")
        })
        .catch((e) => {
          toast.error("Dein Profil konnte nicht aktualisiert werden.")
          throw e
        })
    }
  }

  return (
    <>
      {currentUser ? (
        <Stack spacing={0.5}>
          <Typography variant="h6" gutterBottom>
            Account-Einstellungen
          </Typography>

          <Box component="form" onSubmit={handleSubmit} onChange={handleChange} noValidate sx={{ mt: 1 }}>
            <Input
              name="givenName"
              placeholder="Vorname"
              initialValue={formValues.givenName.value}
              error={formValues.givenName.error}
              helperText={formValues.givenName.error ? formValues.givenName.errorMessage : ""}
            />
            <Input
              name="surName"
              placeholder="Nachname"
              initialValue={surName}
              error={formValues.surName.error}
              helperText={formValues.surName.error ? formValues.surName.errorMessage : ""}
            />
            <Input
              name="email"
              placeholder="Email"
              initialValue={currentUser?.email || ""}
              error={formValues.email.error}
              helperText={formValues.email.error ? formValues.email.errorMessage : ""}
            />
            <DatePicker
              name="dateOfBirth"
              placeholder="Geburtstag"
              initialValue={currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth) : undefined}
            />
            <Input
              name="postCode"
              placeholder="Postleitzahl"
              initialValue={currentUser?.postCode || ""}
              error={formValues.postCode.error}
              helperText={formValues.postCode.error ? formValues.postCode.errorMessage : ""}
              settings={{ min: "1", max: "5" }}
            />
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
              Speichern
            </Button>
          </Box>
          {/* TODO */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Account löschen
          </Button>
        </Stack>
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </>
  )
}

export default withAuth(UserSettingsPage)
