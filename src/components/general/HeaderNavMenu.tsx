import * as React from "react"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import MenuIcon from "@mui/icons-material/Menu"
import Menu from "@mui/material/Menu"
import { Biotech, HealthAndSafety, Home } from "@mui/icons-material"
import { CustomMenuItem, CustomNavItem } from "./HeaderMenuItems"

const MENU_ITEMS = [
  { name: "Home", url: "/", icon: <Home /> },
  { name: "Backend Health", url: "/health", icon: <HealthAndSafety /> },
  { name: "Mui", url: "/mui", icon: <Biotech /> },
]

export function LeftMenuBig() {
  return (
    <Box sx={{ flexGrow: 2, display: { xs: "none", md: "flex" } }}>
      {MENU_ITEMS.map((page) => (
        <CustomNavItem key={page.name} name={page.name} url={page.url} icon={page.icon} />
      ))}
    </Box>
  )
}

export function LeftMenuSmall() {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null)

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }

  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  return (
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
        {MENU_ITEMS.map((page) => (
          <CustomMenuItem key={page.name} name={page.name} url={page.url} onClick={handleCloseNavMenu} />
        ))}
      </Menu>
    </Box>
  )
}
