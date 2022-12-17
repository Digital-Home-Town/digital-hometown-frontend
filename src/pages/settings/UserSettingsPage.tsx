import { Stack, Typography } from "@mui/material"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import parse from "date-fns/parse"
import React, { useEffect, useState, useReducer } from "react"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { AuthContextI } from "src/auth/AuthContext"
import Loader from "src/auth/Loader"
import withAuth from "src/auth/withAuth"
import userService from "src/services/UserService"

import DatePicker from "src/components/general/input/DatePicker"
import Input from "src/components/general/input/Input"
import DeleteDialog from "src/components/dialogs/DeleteDialog"

function UserSettingsPage({
  currentUser,
  setCurrentUser,
  deleteUser,
  setFirstLogin,
  firstLoginProp,
}: AuthContextI & { firstLoginProp: boolean }) {
  const [showDeleteDialog, toggleShowDeleteDialog] = useReducer((state: boolean) => !state, false)

  useEffect(() => {
    setFirstLogin(firstLoginProp)
  }, [])

  const navigate = useNavigate()

  // https://www.geeksforgeeks.org/react-mui-textfield-api/
  // https://dev.to/omardiaa48/how-to-make-a-robust-form-validation-in-react-with-material-ui-fields-1kb0

  const [formValues, setFormValues] = useState({
    fullName: {
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

  useEffect(() => {
    if (!currentUser) return
    setFormValues({
      fullName: {
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

    const fullName = (data.get("fullName") as string).trim() || ""

    const email = (data.get("email") as string).trim() || ""
    const dateOfBirth = parse(data.get("dateOfBirth") as string, "dd.MM.yyyy", new Date()).getTime()

    const postCode: number = Number(data.get("postCode")) || 0

    if (fullName.length > 0 && email.length > 0 && dateOfBirth) {
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
          setFirstLogin(false)
          toast.success("Dein Profil wurde aktualisiert.")
          if (firstLoginProp) {
            navigate("/profile/")
          }
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
            Vervollständige dein Profil
          </Typography>

          <DeleteDialog
            open={showDeleteDialog}
            text="Bist du dir sicher, dass du dein Profil löschen möchtest?"
            title="Profil löschen?"
            handleClose={() => toggleShowDeleteDialog()}
            onConfirm={() => {
              handleDelete()
            }}
          />

          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
            <Input
              name="fullName"
              placeholder="Anzeigename"
              initialValue={formValues.fullName.value}
              error={formValues.fullName.error}
              helperText={formValues.fullName.error ? formValues.fullName.errorMessage : ""}
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
              optional={true}
              initialValue={currentUser?.postCode || ""}
              error={formValues.postCode.error}
              helperText={formValues.postCode.error ? formValues.postCode.errorMessage : ""}
              settings={{ min: "1", max: "99999" }}
            />
            <Stack direction="row" spacing={2} marginY={2} alignItems={"center"} justifyContent={"center"}>
              <Button type="submit" variant="contained" color="success">
                Speichern
              </Button>
              <Button variant="contained" color="error" onClick={toggleShowDeleteDialog}>
                Benutzer löschen
              </Button>
              {!firstLoginProp && <Button onClick={() => navigate("/profile/")}>Zeige meine Profilseite</Button>}
            </Stack>
          </Box>
        </Stack>
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </>
  )
}

export default withAuth(UserSettingsPage)
