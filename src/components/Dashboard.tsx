import { CalendarToday, Chat, Group } from "@mui/icons-material"
import { Button, Grid, SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import { getAuth } from "firebase/auth"
import React from "react"
import { Link } from "react-router-dom"

import { app } from "../firebase-config"

interface StartElementInterface {
  url: string
  text: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

function StartElement({ url, text, icon }: StartElementInterface) {
  const Icon = icon

  return (
    <Grid item m={1}>
      <Link to={url} style={{ textDecoration: "none" }}>
        <Button variant="contained" sx={{ flexDirection: "column" }}>
          <Icon sx={{ fontSize: "150px" }} />
          <Typography>{text}</Typography>
        </Button>
      </Link>
    </Grid>
  )
}

function Dashboard() {
  const auth = getAuth(app)
  return (
    <div>
      Logged in as {auth.currentUser?.email}
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <StartElement url="/" text="Gruppen" icon={Group} />
        <StartElement url="/" text="Chat" icon={Chat} />
        <StartElement url="/" text="Termin" icon={CalendarToday} />
      </Grid>
    </div>
  )
}

export default Dashboard
