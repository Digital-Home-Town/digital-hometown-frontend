import { Visibility, VisibilityOff } from "@mui/icons-material"
import LockOutlinedIcon from "@mui/icons-material/LockOutlined"
import { IconButton, InputAdornment } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import CssBaseline from "@mui/material/CssBaseline"
import Grid from "@mui/material/Grid"
import Link from "@mui/material/Link"
import TextField from "@mui/material/TextField"
import Typography from "@mui/material/Typography"
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth"
import * as React from "react"
import { useNavigate } from "react-router"
import { toast } from "react-toastify"

import { app } from "../../firebase-config"

function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return re.test(email)
}

export function Register() {
  const navigate = useNavigate()
  const auth = getAuth(app)

  if (auth.currentUser) {
    navigate("/")
  }

  const [userInput, setUserInput_] = React.useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
    hidePassword: true,
    hidePasswordConfirm: true,
  })

  const showPassword = () => {
    setUserInput_({ ...userInput, hidePassword: !userInput.hidePassword })
  }

  const showPasswordConfirm = () => {
    setUserInput_({ ...userInput, hidePasswordConfirm: !userInput.hidePasswordConfirm })
  }

  const setUserInput = (name: string, value: string) => {
    setUserInput_({
      ...userInput,
      [name]: value,
    })
  }
  const checkPasswordMatch = () => userInput.password === userInput.passwordConfirm || userInput.passwordConfirm === ""
  const checkPassword = () => userInput.password.length > 5 || userInput.password === ""
  const checkUserName = () => {
    return userInput.username.length >= 4 || userInput.username === ""
  }

  const checkEmail = () => validateEmail(userInput.email) || userInput.email === ""

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const email = (data.get("email") as string) || ""
    const password = (data.get("password") as string) || ""

    createUserWithEmailAndPassword(auth, email, password).then(() => {
      toast.success("Du bist nun registriert.")
      navigate("/")
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
          Registrieren
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            required
            fullWidth
            id="username"
            label="Benutzername"
            type="text"
            name="username"
            onChange={(e) => {
              setUserInput("username", e.target.value)
            }}
            error={!checkUserName()}
            autoComplete="username"
            autoFocus
          />
          <TextField
            required
            fullWidth
            id="email"
            label="Email"
            type="email"
            name="email"
            onChange={(e) => setUserInput("email", e.target.value)}
            error={!checkEmail()}
          />
          <TextField
            required
            fullWidth
            name="password"
            label="Password"
            type={userInput.hidePassword ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            onChange={(e) => setUserInput("password", e.target.value)}
            error={!checkPassword()}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={showPassword} tabIndex={-1}>
                    {userInput.hidePassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            required
            fullWidth
            name="passwordConfirm"
            label="Password (Wiederholung)"
            type={userInput.hidePasswordConfirm ? "password" : "text"}
            id="password"
            autoComplete="current-password"
            error={!checkPasswordMatch()}
            onChange={(e) => setUserInput("passwordConfirm", e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton aria-label="toggle password visibility" onClick={showPasswordConfirm} tabIndex={-1}>
                    {userInput.hidePasswordConfirm ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Registrieren
          </Button>
          <Grid container>
            <Grid item>
              <Link variant="body2" onClick={() => navigate("/reset-password")}>
                Password vergessen?
              </Link>
              <Link variant="body2" onClick={() => navigate("/sign-in")}>
                Schon einen Account? Melde dich hier an!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}
