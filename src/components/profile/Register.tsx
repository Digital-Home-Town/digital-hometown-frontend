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
import { IconButton, Input, InputAdornment } from "@mui/material"
import { Visibility, VisibilityOff } from "@mui/icons-material"

function Register({ loggedInUser, setLoggedInUser }: AuthContextProps) {
  const navigate = useNavigate()

  if (loggedInUser !== undefined) {
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
  const checkPasswordMatch = () => userInput.password === userInput.passwordConfirm && userInput.password !== ""
  const checkPassword = () => userInput.password !== ""
  const checkUserName = () => {
    return userInput.username.length >= 4
  }

  const checkEmail = () => userInput.email !== ""

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    // eslint-disable-next-line no-console
    console.log({
      email: data.get("email"),
      password: data.get("password"),
    })
    console.log(userInput)
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
                  <IconButton aria-label="toggle password visibility" onClick={showPassword}>
                    {userInput.hidePassword ? <VisibilityOff /> : <Visibility />}
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
                  <IconButton aria-label="toggle password visibility" onClick={showPasswordConfirm}>
                    {userInput.hidePasswordConfirm ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          {/* <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" /> */}
          <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            Registrieren
          </Button>
          <Grid container>
            <Grid item>
              <Link onClick={() => navigate("/sign-in")} variant="body2">
                Schon einen Account? Melde dich hier an!
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  )
}

export default withAuth(Register)
