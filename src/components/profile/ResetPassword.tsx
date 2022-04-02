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
import React from "react"
import { Navigate, useNavigate } from "react-router"
import withAuth from "../../auth/withAuth"
import { AuthContextProps } from "../../auth/AuthContext"

function ResetPassword({ currentUser, resetPassword }: AuthContextProps) {
  const navigate = useNavigate()

  const handlePasswordReset = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = (data.get("email") as string) || ""
    resetPassword(email)
    navigate("/sign-in")
  }

  return currentUser ? (
    <Navigate to="/" />
  ) : (
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

export default withAuth(ResetPassword)
