import * as React from "react"
import Avatar from "@mui/material/Avatar"
import Button from "@mui/material/Button"
import CssBaseline from "@mui/material/CssBaseline"
import TextField from "@mui/material/TextField"
import Link from "@mui/material/Link"
import Grid from "@mui/material/Grid"
import Box from "@mui/material/Box"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import withAuth from "../../auth/withAuth"
import { AuthContextProps } from "../../auth/AuthContext"
import { useNavigate } from "react-router"
import { INITIAL_LOGGED_IN_USER } from "../../auth/Auth"

function SignIn({ loggedInUser, setLoggedInUser }: AuthContextProps) {
  const navigate = useNavigate()

  if (loggedInUser !== undefined) {
    navigate("/")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })

    setLoggedInUser(INITIAL_LOGGED_IN_USER)
    navigate("/")
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
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField required fullWidth id="email" label="Email Address" name="email" autoComplete="email" autoFocus />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Anmelden
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Password vergessen?
              </Link>
            </Grid>
            <Grid item>
              <Link onClick={() => navigate("/register")} variant="body2">
                {"Noch keinen Account? Registriere dich hier!"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(SignIn)
