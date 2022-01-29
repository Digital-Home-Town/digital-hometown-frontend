import React from "react"

import { Link } from "react-router-dom"

import {
  CalendarToday,
  Chat,
  Group,
} from "@mui/icons-material"
import {
  Button,
  Grid,
  SvgIconTypeMap,
  Typography,
} from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"

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

function Start() {
  return (
    <Grid container direction="row" alignItems="center" justifyContent="center">
      <StartElement url="/health" text="Gruppen" icon={Group} />
      <StartElement url="/mui" text="Chat" icon={Chat} />
      <StartElement url="/sign-in" text="Termin" icon={CalendarToday} />
    </Grid>
  )
}

export default Start
