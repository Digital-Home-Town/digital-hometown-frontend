import * as React from "react"
import Box from "@mui/material/Box"
import Typography from "@mui/material/Typography"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import customTheme from "../theme/customTheme"

function Copyright() {
  return (
    <Typography variant="body2" color="text.secondary">
      {"Copyright © "}
      <Link target="_blank" color="inherit" href="https://github.com/Digital-Home-Town">
        Digital Home
      </Link>{" "}
      {new Date().getFullYear()}
    </Typography>
  )
}

export default function Footer() {
  return (
    <Box
      sx={{
        py: 2,
        mt: "auto",
        width: "100%",
        backgroundColor: customTheme.palette.grey[200],
      }}
    >
      <Container maxWidth="md">
        <Copyright />
      </Container>
    </Box>
  )
}
