import * as React from "react"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import Toolbar from "@mui/material/Toolbar"
import { NavLink } from "react-router-dom"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"
import HeaderMenu from "./HeaderMenu"

import logo from "../../img/logo.png"
import { Typography } from "@mui/material"
import { ColorModeToggler } from "./HeaderMenuItems"

function Logo() {
  return (
    <Box>
      <NavLink to="/" style={{ textDecoration: "none" }}>
        <Button variant="text" color="inherit">
          <Avatar src={logo} style={{ margin: 10 }} />
          <Typography color="white">Digital Dahoam</Typography>
        </Button>
      </NavLink>
    </Box>
  )
}

function HeaderNotLoggedIn() {
  return (
    <Toolbar sx={{ alignItems: "center", paddingY: 3 }}>
      <Box sx={{ flexGrow: 1, textAlign: "right", display: { xs: "none", md: "block" } }}>
        <Typography variant="h4" color="inherit" component="div">
          Willkommen
        </Typography>
      </Box>
      <Box sx={{ flexGrow: null, paddingX: 2 }}>
        <NavLink to="/">
          <Avatar src={logo} />
        </NavLink>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "left", display: { xs: "block", md: "none" } }}>
        <Typography variant="h5" color="inherit" component="div">
          Willkommen Dahoam
        </Typography>
      </Box>
      <Box sx={{ flexGrow: 1, textAlign: "left", display: { xs: "none", md: "block" } }}>
        <Typography variant="h4" color="inherit" component="div">
          Dahoam
        </Typography>
      </Box>
      <ColorModeToggler />
    </Toolbar>
  )
}

function Header({ currentUser }: AuthContextI) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {currentUser ? (
          <Toolbar disableGutters>
            <div style={{ flexGrow: 1 }}>
              <Logo />
            </div>
            <HeaderMenu />
          </Toolbar>
        ) : (
          <HeaderNotLoggedIn />
        )}
      </Container>
    </AppBar>
  )
}

export default withAuth(Header)
