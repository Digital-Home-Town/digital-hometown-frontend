import { DarkMode, LightMode } from "@mui/icons-material"
import MenuItem from "@mui/material/MenuItem"
import Typography from "@mui/material/Typography"
import * as React from "react"
import { NavLink } from "react-router-dom"

import { useThemeContext } from "../../contexts/ThemeContext"

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

export function ColorModeToggler() {
  const { colorMode, toggleColorMode } = useThemeContext()
  return <MenuItem onClick={toggleColorMode}>{colorMode === "light" ? <LightMode /> : <DarkMode />}</MenuItem>
}
