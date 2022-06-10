import { CalendarToday, Chat, Group } from "@mui/icons-material"
import { Button, Grid, SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import React from "react"
import { Link } from "react-router-dom"
import { AuthContextI } from "src/auth/AuthContext"
import withAuth from "src/auth/withAuth"

import ClubTable from "./table/ClubTable"
import UserTable from "./table/UserTable"

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

function Dashboard({ currentUser }: AuthContextI) {
  return (
    <div>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <StartElement url="/" text="Gruppen" icon={Group} />
        <StartElement url="/dashboard/chat" text="Chat" icon={Chat} />
        <StartElement url="/" text="Termin" icon={CalendarToday} />
      </Grid>
      <h1>Alle Benutzer</h1>
      <UserTable></UserTable>
      <h1>Alle Vereine</h1>
      <ClubTable></ClubTable>
    </div>
  )
}

export default withAuth(Dashboard)
