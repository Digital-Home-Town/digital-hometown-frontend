import MenuItem from "@mui/material/MenuItem"
import { NavLink } from "react-router-dom"
import Typography from "@mui/material/Typography"
import * as React from "react"
import Button from "@mui/material/Button"

export function CustomMenuItem({ name, url, onClick }: { name: string; url?: string; onClick: () => void }) {
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

export function CustomNavItem({ url, name, icon }: { url: string; name: string; icon: React.ReactElement }) {
  return (
    <NavLink to={url} style={{ textDecoration: "none" }}>
      <Button sx={{ my: 2, color: "white" }} startIcon={icon} variant="text">
        {name}
      </Button>
    </NavLink>
  )
}
