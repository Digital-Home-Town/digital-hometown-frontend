import { DataGrid } from "@mui/x-data-grid"
import * as React from "react"
import { useEffect } from "react"
import profileService from "src/services/ProfileService"

import withAuth from "../../auth/withAuth"

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "displayName", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "dateOfBirth", headerName: "Geburtstag", width: 200 },
  {
    field: "age",
    headerName: "Alter",
    type: "number",
    valueGetter: (params: { row: ProfileI }) => profileService.getAge(params.row.dateOfBirth),
  },
]

function UserTable() {
  const [profiles, setProfiles] = React.useState<ProfileI[]>([])

  useEffect(() => {
    const getProfiles = async () => {
      const profilesData = await profileService.getProfiles()
      console.log(profilesData)
      if (profilesData) {
        setProfiles(profilesData)
      }
    }
    if (!profiles.length) getProfiles()
  }, [profiles])

  return profiles ? (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid rows={profiles} columns={columns} pageSize={5} rowsPerPageOptions={[5]} />
    </div>
  ) : (
    <p>Lädt...</p>
  )
}

export default withAuth(UserTable)
