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
import profileService from "src/services/ProfileService"

import { AuthContextProps } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import { useThemeContext } from "../../contexts/ThemeContext"
import dummyAvatar from "../../img/dummy-avatar.jpg"
import { CustomMenuItem } from "./HeaderMenuItems"

function UserMenu({ currentUser }: AuthContextProps) {
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null)
  const { colorMode, toggleColorMode } = useThemeContext()

  const [profile, setProfile] = React.useState<null | Profile>(null)
  const [exists, setExists] = React.useState<null | Boolean>(null)

  React.useEffect(() => {
    const getProfile = async () => {
      const profileData = await profileService.getProfile(currentUser?.uid || "")
      if (profileData) {
        setProfile(profileData)
      }
    }
    if (!profile) getProfile()
  })

  React.useEffect(() => {
    const getExists = async () => {
      const exists = await profileService.existsProfile(currentUser?.uid || "")
      if (exists) {
        setExists(exists)
      }
    }
    if (!exists) getExists()
  })

  const getPhoto = () => {
    if (profile?.photoUrl) return profile.photoUrl
    if (currentUser?.photoURL) return currentUser.photoURL
    return dummyAvatar
  }

  const PROFILE_ITEMS = [
    {
      name: "Profile",
      event: () => {
        navigate("/profile/" + currentUser?.uid || "")
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
    navigate("/profile/" + currentUser?.uid || "")
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button variant="text" color="inherit" onClick={handleClickName}>
        {exists ? profile?.name : currentUser?.displayName}
      </Button>
      <Tooltip title="Open Menu">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar alt="Not logged in" src={getPhoto()} imgProps={{ referrerPolicy: "no-referrer" }} />
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
        <MenuItem onClick={toggleColorMode}>{exists ? profile?.name : currentUser?.displayName}</MenuItem>
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
