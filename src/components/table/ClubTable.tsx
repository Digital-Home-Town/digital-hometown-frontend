import { DataGrid } from "@mui/x-data-grid"
import * as React from "react"
import { useEffect } from "react"
import { useNavigate } from "react-router"
import clubService from "src/services/ClubService"

import withAuth from "../../auth/withAuth"

const columns = [
  { field: "id", headerName: "ID", width: 200 },
  { field: "displayName", headerName: "Name", width: 200 },
  { field: "email", headerName: "Email", width: 200 },
]

function UserTable() {
  const navigate = useNavigate()
  const [profiles, setProfiles] = React.useState<ClubI[]>([])

  useEffect(() => {
    const getProfiles = async () => {
      const profilesData = await clubService.getAll()
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
