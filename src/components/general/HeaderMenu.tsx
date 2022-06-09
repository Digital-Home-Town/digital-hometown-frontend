import { Menu as MenuIcon } from "@mui/icons-material"
import { Button, Divider, Menu, MenuItem, Typography } from "@mui/material"
import Avatar from "@mui/material/Avatar"
import Box from "@mui/material/Box"
import IconButton from "@mui/material/IconButton"
import Tooltip from "@mui/material/Tooltip"
import * as React from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

import { AuthContextI } from "../../auth/AuthContext"
import withAuth from "../../auth/withAuth"
import profileService from "../../services/ProfileService"
import { ColorModeToggler, CustomMenuItem } from "./HeaderMenuItems"

function HeaderMenu({ currentUser }: AuthContextI) {
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const [profile, setProfile] = useState<null | ProfileI>(null)
  const [exists, setExists] = useState<null | Boolean>(null)

  React.useEffect(() => {
    const getProfile = async () => {
      const profileData = await profileService.getProfile(currentUser?.id || "")
      if (profileData) {
        setProfile(profileData)
      }
    }
    if (!profile) getProfile()
  }, [])

  React.useEffect(() => {
    const getExists = async () => {
      const exists = await profileService.existsProfile(currentUser?.id || "")
      if (exists) {
        setExists(exists)
      }
    }
    if (!exists) getExists()
  }, [])

  const getPhoto = () => {
    if (profile?.photoURL) return profile.photoURL
    if (currentUser?.photoURL) return currentUser.photoURL
    return ""
  }

  const PROFILE_ITEMS = [
    {
      name: "Profil",
      event: () => {
        navigate("/profile/" + currentUser?.id || "")
      },
    },
    {
      name: "Profil bearbeiten",
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
    navigate("/profile/" + currentUser?.id || "")
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Button variant="text" color="inherit" onClick={handleClickName}>
        <Typography>{exists ? profile?.displayName : currentUser?.displayName}</Typography>
        <Avatar alt="Profilfoto" src={getPhoto()} imgProps={{ referrerPolicy: "no-referrer" }} style={{ margin: 10 }} />
      </Button>
      <Tooltip title="Open Menu">
        <IconButton onClick={handleOpenUserMenu} color="inherit">
          <MenuIcon />
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
        <ColorModeToggler />
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
          name={"Logout"}
          url={"sign-out"}
          onClick={() => {
            navigate("/sign-out")
          }}
        />
        <Divider />
        <MenuItem disabled>{exists ? profile?.displayName : currentUser?.displayName}</MenuItem>
      </Menu>
    </Box>
  )
}

export default withAuth(HeaderMenu)
