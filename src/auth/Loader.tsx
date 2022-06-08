import { Grid, useTheme } from "@mui/material"
import { RiseLoader } from "react-spinners"
import React from "react"

function Loader() {
  const theme = useTheme()

  return (
    <Grid container justifyContent="center" alignItems="center" minHeight="100vh">
      <Grid item>
        <RiseLoader size={40} margin={2} color={theme.palette.primary.main} />
      </Grid>
    </Grid>
  )
}

export default Loader
