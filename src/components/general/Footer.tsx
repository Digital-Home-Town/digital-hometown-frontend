import * as React from "react"

import Box from "@mui/material/Box"
import Container from "@mui/material/Container"
import Link from "@mui/material/Link"
import Typography from "@mui/material/Typography"
import { Divider } from "@mui/material"

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
    <Box style={{ marginTop: "auto", width: "100%" }}>
      <Divider />
      <Container maxWidth="lg" sx={{ py: 2 }}>
        <Copyright />
      </Container>
    </Box>
  )
}
