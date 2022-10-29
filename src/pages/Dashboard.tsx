import React from "react"

import CreatePostDialog from "../components/posts/CreatePostDialog"
import ClubTable from "../components/table/ClubTable"
import UserTable from "../components/table/UserTable"

function Dashboard() {
  const [postDialogOpen, setPostDialogOpen] = React.useState(false)

  return (
    <div>
      <h1>Alle Benutzer</h1>
      <UserTable></UserTable>
      <h1>Alle Vereine</h1>
      <ClubTable></ClubTable>
      <CreatePostDialog open={postDialogOpen} setOpen={setPostDialogOpen} />
    </div>
  )
}

export default Dashboard
