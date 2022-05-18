import React from "react"
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
import { Navigate, useNavigate } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

function SignIn({ currentUser, logIn }: AuthContextI) {
  const navigate = useNavigate()

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = (data.get("email") as string) || ""
    const password = (data.get("password") as string) || ""

    logIn(email, password)
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField required fullWidth id="email" label="Email" name="email" autoComplete="email" autoFocus />
          <TextField
            required
            fullWidth
            name="password"
            label="Passwort"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 1 }}>
            Anmelden
          </Button>
          <Grid container>
            <Grid item xs>
              <Link variant="body2" onClick={() => navigate("/reset-password")}>
                Passwort vergessen?
              </Link>
            </Grid>
            <Grid item>
              <Link variant="body2" onClick={() => navigate("/register")}>
                Noch keinen Account? Registriere dich hier!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(SignIn)
