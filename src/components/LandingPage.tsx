import { Button, Divider, Grid, Paper, TextField, Typography } from "@mui/material"
import { useNavigate } from "react-router"

function WhyDht() {
  return (
    <div>
      <h3>Warum Digital Hometown nutzen?</h3>
      <h5>Nachbarn und Umgebung kennenlernen</h5>
      <h5>Dich vernetzen</h5>
      <h5>Deine Interessen teilen</h5>
    </div>
  )
}

function LogIn() {
  const navigate = useNavigate()
  return (
    <div>
      <Typography>Alle Möglichkeiten nutzen</Typography>
      <div>
        <Button onClick={() => navigate("/sign-in")} sx={{ marginBottom: 0.5 }}>
          Anmelden
        </Button>
      </div>
      <div>
        <Button onClick={() => navigate("/register")}>Registrieren</Button>
      </div>
    </div>
  )
}

function SelectRegion() {
  return (
    <div>
      <Typography>Nur öffentliches Anzeigen</Typography>
      <div>
        <TextField name="plz" label="Postleitzahl" sx={{ marginBottom: 0.5 }} />
      </div>
      <div style={{ textAlign: "left" }}>
        <Button>Bestätigen</Button>
      </div>
    </div>
  )
}

function LandingPage() {
  const GRID_SIZE = 110

  return (
    <div>
      <WhyDht />
      <Divider />
      <Grid container spacing={2} style={{ marginTop: 1 }}>
        <Grid item textAlign={"center"}>
          <Paper sx={{ height: GRID_SIZE, padding: 1 }}>
            <LogIn />
          </Paper>
        </Grid>
        <Grid item textAlign={"center"}>
          <Paper sx={{ height: GRID_SIZE, padding: 1 }}>
            <SelectRegion />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

export default LandingPage
