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
import { LeftMenuSmall, LeftMenuBig } from "./HeaderNavMenu"
import HeaderUserMenu from "./HeaderUserMenu"

import logo from "../../img/logo.png"
import { Typography } from "@mui/material"

function Logo({ bigScreen }: { bigScreen: boolean }) {
  let display = { xs: "flex", md: "none" }
  let flexGrow: number | null = 1
  if (bigScreen) {
    display = { xs: "none", md: "flex" }
    flexGrow = null
  }
  return (
    <Box sx={{ flexGrow: flexGrow, display: display }}>
      <NavLink to="/">
        <Button variant="text">
          <Avatar src={logo} />
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
    </Toolbar>
  )
}

function Header({ currentUser }: AuthContextI) {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        {currentUser ? (
          <Toolbar disableGutters>
            <Logo bigScreen={true} />
            <LeftMenuSmall />
            <Logo bigScreen={false} />
            <LeftMenuBig />
            <HeaderUserMenu />
          </Toolbar>
        ) : (
          <HeaderNotLoggedIn />
        )}
      </Container>
    </AppBar>
  )
}

export default withAuth(Header)
