import React from "react"

import ClubTable from "../components/table/ClubTable"
import UserTable from "../components/table/UserTable"

function Dashboard() {
  return (
    <div>
      <h1>Alle Benutzer</h1>
      <UserTable></UserTable>
      <h1>Alle Vereine</h1>
      <ClubTable></ClubTable>
    </div>
  )
}

export default Dashboard
