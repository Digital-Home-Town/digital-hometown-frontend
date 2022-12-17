import { Stack, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import parse from "date-fns/parse"
import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import userService from "src/services/UserService"

import DatePicker from "../../components/general/input/DatePicker"
import Input from "../../components/general/input/Input"

function ClubSettingsPage({
  currentUser,
  setCurrentUser,
  deleteUser,
  setFirstLogin,
  firstLoginProp,
}: AuthContextI & { firstLoginProp: boolean }) {
  useEffect(() => {
    setFirstLogin(firstLoginProp)
  }, [])

  const navigate = useNavigate()

  // https://www.geeksforgeeks.org/react-mui-textfield-api/
  // https://dev.to/omardiaa48/how-to-make-a-robust-form-validation-in-react-with-material-ui-fields-1kb0

  let [formValues, setFormValues] = useState({
    givenName: {
      value: currentUser?.displayName || "",
      error: false,
      errorMessage: "Fehlerhafter Name",
    },
    email: {
      value: currentUser?.email || "",
      error: false,
      errorMessage: "Fehlerhafte Email",
    },
    dateOfBirth: {
      value: currentUser?.dateOfBirth || "",
      error: false,
      errorMessage: "Fehlerhaftes Gründungsdatum",
    },
    postCode: {
      value: currentUser?.postCode + "" || "",
      error: false,
      errorMessage: "Fehlerhafte PLZ",
    },
  })

  useEffect(() => {
    if (!currentUser) return
    setFormValues({
      givenName: {
        value: currentUser?.displayName || "",
        error: false,
        errorMessage: "Fehlerhafter Anzeigename",
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
        value: currentUser?.postCode + "" || "",
        error: false,
        errorMessage: "Fehlerhafte PLZ",
      },
    })
  }, [currentUser])

  if (currentUser == null) {
    return <Loader />
  }
  const handleDelete = async () => {
    await deleteUser()
    navigate("/")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)

    const givenName = (data.get("givenName") as string).trim() || ""

    const email = (data.get("email") as string).trim() || ""
    const dateOfBirth = parse(data.get("dateOfBirth") as string, "dd.MM.yyyy", new Date()).getTime()

    const postCode: number = Number(data.get("postCode")) || 0

    if (givenName.length > 0 && email.length > 0 && dateOfBirth && currentUser) {
      const profile: User = {
        ...currentUser,
        displayName: givenName,
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
    } else {
      toast.error("Fehler in deinen Daten")
    }
  }

  return (
    <>
      {currentUser ? (
        <Stack spacing={0.5}>
          <Typography variant="h6" gutterBottom>
            Vervollständige euer Vereinsprofil
          </Typography>

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Input
              name="givenName"
              placeholder="Vereinsname"
              initialValue={formValues.givenName.value}
              error={formValues.givenName.error}
              helperText={formValues.givenName.error ? formValues.givenName.errorMessage : ""}
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
              placeholder="Gründungsdatum"
              initialValue={currentUser?.dateOfBirth ? new Date(currentUser.dateOfBirth) : undefined}
            />
            <Input
              name="postCode"
              placeholder="Postleitzahl"
              initialValue={currentUser?.postCode || ""}
              optional={true}
              error={formValues.postCode.error}
              helperText={formValues.postCode.error ? formValues.postCode.errorMessage : ""}
              settings={{ min: "1", max: "99999" }}
            />
            <Stack direction="row" spacing={2} marginY={2} alignItems={"center"} justifyContent={"center"}>
              <Button type="submit" variant="contained" color="success">
                Speichern
              </Button>
              <Button variant="contained" color="error" onClick={handleDelete}>
                Verein löschen
              </Button>
              <Button onClick={() => navigate("/profile/")}>Zeige meine Profilseite</Button>
            </Stack>
          </Box>
        </Stack>
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </>
  )
}

export default withAuth(ClubSettingsPage)
