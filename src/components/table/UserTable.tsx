import { DataGrid } from "@mui/x-data-grid"
import moment from "moment"
import * as React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import profileService from "src/services/ProfileService"

import withAuth from "../../auth/withAuth"

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "displayName", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
  {
    field: "dateOfBirth",
    headerName: "Geburtstag",
    width: 200,
    valueGetter: (params: { row: ProfileI }) => moment(params.row.dateOfBirth).format("DD.MM.YYYY"),
  },
  {
    field: "age",
    headerName: "Alter",
    type: "number",
    valueGetter: (params: { row: ProfileI }) => profileService.getAge(params.row.dateOfBirth),
  },
]

function UserTable() {
  const navigate = useNavigate()
  const [profiles, setProfiles] = React.useState<ProfileI[]>([])

  useEffect(() => {
    const getProfiles = async () => {
      const profilesData = await profileService.getProfiles()
      if (profilesData) {
        setProfiles(profilesData)
      }
    }
    if (!profiles.length) getProfiles()
  }, [profiles])

  return profiles ? (
    <div style={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={profiles}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        onCellClick={(params) => {
          navigate(`/profile/${params.id}`)
        }}
      />
    </div>
  ) : (
    <p>Lädt...</p>
  )
}

export default withAuth(UserTable)
