import * as React from "react"

import { NavLink } from "react-router-dom"

import { Biotech, DarkMode, HealthAndSafety, Home, LightMode } from "@mui/icons-material"
import MenuIcon from "@mui/icons-material/Menu"
import AppBar from "@mui/material/AppBar"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import Button from "@mui/material/Button"
import Container from "@mui/material/Container"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Toolbar from "@mui/material/Toolbar"
import Tooltip from "@mui/material/Tooltip"
import Typography from "@mui/material/Typography"

import dummyAvatar from "../img/dummy-avatar.jpg"
import logo from "../img/logo.png"
import { useThemeContext } from "../contexts/ThemeContext"
import withAuth from "../auth/withAuth"
import { AuthContextProps } from "../auth/AuthContext"
import { useNavigate } from "react-router-dom"

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

const menuItems = [
  { name: "Home", url: "/", icon: <Home /> },
  { name: "Backend Health", url: "/health", icon: <HealthAndSafety /> },
  { name: "Mui", url: "/mui", icon: <Biotech /> },
]

const profileItems = [
  { name: "Profile", event: () => {} },
  { name: "Account", event: () => {} },
  { name: "Dashboard", event: () => {} },
]

function CustomMenuItem({ name, url, onClick }: { name: string; url?: string; onClick: () => void }) {
  return (
    <MenuItem onClick={onClick}>
      {url !== undefined ? (
        <NavLink to={url} style={{ textDecoration: "none" }}>
          <Typography textAlign="center" color="textPrimary">
            {name}
          </Typography>
        </NavLink>
      ) : (
        <Typography textAlign="center" color="textPrimary">
          {name}
        </Typography>
      )}
    </MenuItem>
  )
}

function CustomNavItem({
  url,
  name,
  icon,
  onClick,
}: {
  url: string
  name: string
  icon: React.ReactElement
  onClick: () => void
}) {
  return (
    <NavLink to={url} style={{ textDecoration: "none" }}>
      <Button onClick={onClick} sx={{ my: 2, color: "white" }} startIcon={icon} variant="text">
        {name}
      </Button>
    </NavLink>
  )
}

function Header({ userLoggedIn, setLoggedInUser, setLoggedOut }: AuthContextProps) {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { colorMode, toggleColorMode } = useThemeContext()
  const navigate = useNavigate()

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Logo bigScreen={true} />
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: "block", md: "none" },
              }}
            >
              {menuItems.map((page) => (
                <CustomMenuItem key={page.name} name={page.name} url={page.url} onClick={handleCloseNavMenu} />
              ))}
            </Menu>
          </Box>

          <Logo bigScreen={false} />

          <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
            {menuItems.map((page) => (
              <CustomNavItem
                key={page.name}
                name={page.name}
                url={page.url}
                icon={page.icon}
                onClick={handleCloseNavMenu}
              />
            ))}
          </Box>

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar alt="Remy Sharp" src={dummyAvatar} />
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem onClick={toggleColorMode}>
                {/* <IconButton sx={{ ml: 1 }}  color="inherit"> */}
                {colorMode === "light" ? <DarkMode /> : <LightMode />}
                {/* </IconButton> */}
              </MenuItem>
              {profileItems.map((item) => (
                <CustomMenuItem
                  key={item.name}
                  name={item.name}
                  onClick={() => {
                    handleCloseUserMenu()
                    item.event()
                  }}
                />
              ))}
              <CustomMenuItem
                name={userLoggedIn ? "Logout" : "Login"}
                url={userLoggedIn ? "sign-out" : "sign-out"}
                onClick={() => {
                  if (userLoggedIn) {
                    navigate("/sign-out")
                  } else {
                    navigate("/sign-in")
                  }
                }}
              />
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default withAuth(Header)
