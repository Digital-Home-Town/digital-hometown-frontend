import {
  Button,
  Divider,
  Grid,
  Card,
  TextField,
  Typography,
  IconButton,
  CardHeader,
  CardMedia,
  CardContent,
} from "@mui/material"
import { Check } from "@mui/icons-material"
import { useNavigate } from "react-router"
import brushesImg from "../img/brushes.jpg"
import oldPeopleImg from "../img/old-people.jpg"
import cafeImg from "../img/cafe-bremen.jpg"
import { Box } from "@mui/system"

function WhyDht() {
  const CARD_WIDTH = 250
  return (
    <div>
      <Card sx={{ padding: 1, margin: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <h3>Warum Digital Hometown nutzen?</h3>
        </Box>
        <Grid container spacing={2} style={{ marginTop: 1 }}>
          <Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Interessen teilen" subheader="Untertitel" />
              <CardMedia component="img" image={brushesImg} alt="Brushes" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Vernetzen" subheader="Untertitel" />
              <CardMedia component="img" image={oldPeopleImg} alt="Old People" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Entdecken" subheader="Untertitel" />
              <CardMedia component="img" image={cafeImg} alt="Cafe in Bremen" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                  labore et dolore magna aliquyam erat, sed diam voluptua.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

function LogInAsUser() {
  const navigate = useNavigate()
  return (
    <div>
      <Typography>Du willst alles nutzen?</Typography>
      <br />
      <Button onClick={() => navigate("/sign-in")} sx={{ marginRight: 0.5 }}>
        Anmelden
      </Button>

      <Button onClick={() => navigate("/register")}>Registrieren</Button>
    </div>
  )
}

function LogInAsOrganization() {
  const navigate = useNavigate()
  return (
    <div>
      <Typography>Du bist Vertreter einer Organisation?</Typography>
      <br />
      <Button onClick={() => navigate("/organization/sign-in")} sx={{ marginRight: 0.5 }}>
        Anmelden
      </Button>
      <Button onClick={() => navigate("/organization/register")}>Registrieren</Button>
    </div>
  )
}

function SelectRegion() {
  return (
    <div>
      <Typography>Du willst anonym bleiben?</Typography>
      <br />
      <TextField
        name="plz"
        label="Postleitzahl"
        sx={{ marginRight: 0.5 }}
        InputProps={{
          endAdornment: (
            <IconButton>
              <Check />
            </IconButton>
          ),
        }}
      />
    </div>
  )
}

function ControlElements() {
  const GRID_SIZE = 110

  return (
    <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 1 }}>
      <Grid item textAlign={"center"}>
        <Card sx={{ height: GRID_SIZE, padding: 1 }}>
          <LogInAsUser />
        </Card>
      </Grid>
      <Grid item textAlign={"center"}>
        <Card sx={{ height: GRID_SIZE, padding: 1 }}>
          <SelectRegion />
        </Card>
      </Grid>
      <Grid item textAlign={"center"}>
        <Card sx={{ height: GRID_SIZE, padding: 1 }}>
          <LogInAsOrganization />
        </Card>
      </Grid>
    </Grid>
  )
}

function LandingPage() {
  return (
    <div>
      <h1>Öffentliche Landing-Page</h1>
      <ControlElements />
      <Divider />
      <WhyDht />
    </div>
  )
}

export default LandingPage
