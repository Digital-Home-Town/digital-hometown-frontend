import MenuItem from "@mui/material/MenuItem"
import { NavLink } from "react-router-dom"
import Typography from "@mui/material/Typography"
import * as React from "react"
import Button from "@mui/material/Button"
import { useThemeContext } from "../../contexts/ThemeContext"
import { DarkMode, LightMode } from "@mui/icons-material"

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
