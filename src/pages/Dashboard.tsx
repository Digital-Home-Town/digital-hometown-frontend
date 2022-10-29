import { List } from "@mui/icons-material"
import { Button, Grid, SvgIconTypeMap, Typography } from "@mui/material"
import { OverridableComponent } from "@mui/material/OverridableComponent"
import React from "react"
import { useNavigate } from "react-router-dom"

import CreatePostDialog from "../components/posts/CreatePostDialog"
import ClubTable from "../components/table/ClubTable"
import UserTable from "../components/table/UserTable"

interface StartElementInterface {
  onClick: () => void
  text: string
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

function StartElement({ onClick, text, icon }: StartElementInterface) {
  const Icon = icon

  return (
    <Grid item m={1}>
      <Button variant="contained" sx={{ flexDirection: "column" }} onClick={onClick}>
        <Icon sx={{ fontSize: "100px" }} />
        <Typography>{text}</Typography>
      </Button>
    </Grid>
  )
}

function Dashboard() {
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)
  const navigate = useNavigate()

  return (
    <div>
      <Grid container direction="row" alignItems="center" justifyContent="center">
        <StartElement onClick={() => navigate("/posts")} text="Beiträge" icon={List} />
        <StartElement onClick={() => navigate("/merkzettel")} text="Merkzettel" icon={List} />
      </Grid>
      <h1>Alle Benutzer</h1>
      <UserTable></UserTable>
      <h1>Alle Vereine</h1>
      <ClubTable></ClubTable>
      <CreatePostDialog open={postDialogOpen} setOpen={setPostDialogOpen} />
    </div>
  )
}

export default Dashboard
