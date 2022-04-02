import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { getAuth, sendPasswordResetEmail } from "firebase/auth"
import React from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

import { app } from "../../firebase-config"

export function ResetPassword() {
  const navigate = useNavigate()
  const auth = getAuth(app)
  if (auth.currentUser) {
    navigate("/")
  }

  const handlePasswordReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = (data.get("email") as string) || ""
    sendPasswordResetEmail(auth, email)
      .then(() => {
        toast.success("Passwort zurückgesetzt. Bitte überprüfe deine Mails und folge den Anweisungen in der Mail.")
        navigate("/sign-in")
      })
      .catch(() => {
        toast.error("Fehler beim Passwort zurücksetzen. Ist deine Mail richtig geschrieben?")
      })
  }

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Anmelden
        </Typography>
        <Box component="form" onSubmit={handlePasswordReset} noValidate sx={{ mt: 1 }}>
          <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
            Passwort zurücksetzen
          </Button>
          <Grid container>
            <Grid item xs>
              <Link onClick={() => navigate("/sign-in")} variant="body2">
                Zur Anmeldung
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => navigate("/register")} variant="body2">
                Noch keinen Account? Registriere dich hier!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
