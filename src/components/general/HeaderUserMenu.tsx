import { DarkMode, LightMode } from "@mui/icons-material"
import { Button } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Menu from "@mui/material/Menu"
import MenuItem from "@mui/material/MenuItem"
import Tooltip from "@mui/material/Tooltip"
import * as React from "react"
import { useNavigate } from "react-router-dom"

import { AuthContextProps } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import { useThemeContext } from "../../contexts/ThemeContext"
import dummyAvatar from "../../img/dummy-avatar.jpg"
import { CustomMenuItem } from "./HeaderMenuItems"

function UserMenu({ currentUser }: AuthContextProps) {
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { colorMode, toggleColorMode } = useThemeContext()

  const PROFILE_ITEMS = [
    {
      name: "Profile",
      event: () => {
        navigate("/profile")
      },
    },
    {
      name: "Account",
      event: () => {
        navigate("/account")
      },
    },
    {
      name: "Dashboard",
      event: () => {
        navigate("/")
      },
    },
  ]

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }

  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleClickName = () => {
    navigate("/account")
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button variant="text" color="inherit" onClick={handleClickName}>
        {currentUser?.displayName}
      </Button>
      <Tooltip title="Open Menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar
            alt="Not logged in"
            src={currentUser?.photoURL ? currentUser.photoURL : dummyAvatar}
            imgProps={{ referrerPolicy: "no-referrer" }}
          />
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
        {PROFILE_ITEMS.map((item) => (
          <CustomMenuItem
            key={item.name}
            name={item.name}
            onClick={() => {
              handleCloseUserMenu()
              item.event()
            }}
          />
        ))}
        {/* TODO can be simplified if header only visible for logged in users */}
        <CustomMenuItem
          name={currentUser ? "Logout" : "Login"}
          url={currentUser ? "sign-out" : "sign-out"}
          onClick={() => {
            if (currentUser) {
              navigate("/sign-out")
            } else {
              navigate("/sign-in")
            }
          }}
        />
      </Menu>
    </Box>
  )
}

export default withAuth(UserMenu)
