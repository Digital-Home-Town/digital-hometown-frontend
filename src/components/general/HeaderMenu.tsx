import { Edit, Menu as MenuIcon } from "@mui/icons-material"
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
import CreatePostDialog from "../posts/CreatePostDialog"
import { ColorModeToggler, CustomMenuItem } from "./HeaderMenuItems"

function HeaderMenu({ currentUser }: AuthContextI) {
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)
  const navigate = useNavigate()

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

  const getPhoto = () => {
    if (currentUser?.photoURL) return currentUser.photoURL
    return ""
  }

  const PROFILE_ITEMS = [
    {
      name: "Profil",
      event: () => {
        navigate("/profile/")
      },
    },
    {
      name: "Account",
      event: () => {
        return currentUser?.isOrg ? navigate("/club-settings") : navigate("/user-settings")
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
    navigate("/profile/")
  }

  return (
    <Box sx={{ flexGrow: 0 }}>
      <IconButton onClick={() => setPostDialogOpen(true)} color="inherit">
        <Edit />
      </IconButton>
      <Button variant="text" color="inherit" onClick={handleClickName}>
        <Typography>{currentUser?.displayName}</Typography>
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
        <MenuItem disabled>{currentUser?.displayName}</MenuItem>
      </Menu>
      <CreatePostDialog open={postDialogOpen} setOpen={setPostDialogOpen} />
    </Box>
  )
}

export default withAuth(HeaderMenu)
