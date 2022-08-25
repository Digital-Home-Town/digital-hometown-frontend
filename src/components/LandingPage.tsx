import { Check } from "@mui/icons-material"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { Box } from "@mui/system"
import { useNavigate } from "react-router"
import { AuthContextI, AuthProps } from "src/auth/AuthContext"

import vernetzenImg from "../img/landing-page_vernetzen.png"
import helfenImg from "../img/landing-page_helfen.png"
import marketplaceImg from "../img/landing-page_marketplace.png"
import vereineImg from "../img/landing-page_vereine.png"


function DhtLandingPage() {
  const CARD_WIDTH = 240
  return (
    <div>
      <Card sx={{ padding: 1, margin: 1 }}>
        <Box sx={{ textAlign: "center" }}>
          <h3>Warum Digital Dahoam nutzen?</h3>
        </Box>
        <Grid container spacing={2} style={{ marginTop: 1 }}>
          <Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Vernetzen"/>
              <CardMedia component="img" image={vernetzenImg} alt="Vernetzen" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Du bist auf der Suche nach Menschen mit ähnlichen Hobbys und Interessen? 
                  Lerne deine Nachbarschaft kennen und finde heraus, was euch verbindet!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Helfen"/>
              <CardMedia component="img" image={helfenImg} alt="Helfen" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Du benötigst Unterstützung beim Bewältigen einer Aufgabe oder möchtest dein Wissen und Fähigkeiten teilen? 
                  Lass es deine Nachbarschaft wissen!
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Entdecken"/>
              <CardMedia component="img" image={marketplaceImg} alt="Marketplace" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Du bist auf der Suche nach etwas neuem oder möchtest deiner Nachbarschaft etwas anbieten?    
                  Im Marktplatz findest du alles, was zurzeit in deiner Nachbarschaft gesucht oder angeboten wird. 
                </Typography>
              </CardContent>
            </Card>
          </Grid><Grid item>
            <Card sx={{ padding: 1, maxWidth: CARD_WIDTH }}>
              <CardHeader title="Vereine"/>
              <CardMedia component="img" image={vereineImg} alt="Vereine" />
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  Du willst informiert bleiben, was gerade in deinem lokalen Verein ansteht oder möchtest aktiv am Vereinsleben teilnehmen? 
                  Hier bist du genau richtig!  
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Card>
    </div>
  )
}

function SwitchLandingPageType() {
  const navigate = useNavigate()
  return (
    <div>
      <Typography>Du bist Vorstand eines Vereins oder einer Organisation? Hier siehst du deine Vorteile.</Typography>
      <br />
      <Button onClick={() => navigate("/")} sx={{ marginRight: 0.5 }}>
        Für Vereine
      </Button>
    </div>
  )
}

function SelectRegion() {
  return (
    <div>
      <Typography>Du willst unsere Plattform erkunden? Finde dein Dahoam!</Typography>
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
    <Grid container spacing={2} sx={{ marginTop: 1, marginBottom: 1 }} style={{display: 'flex',  justifyContent:'center', alignItems:'center'}}>
      <Grid item textAlign={"center"}>
        <Card sx={{ height: GRID_SIZE, padding: 1 }}>
          <SelectRegion />
        </Card>
      </Grid>
      <Grid item textAlign={"center"}>
        <Card sx={{ height: GRID_SIZE, padding: 1 }}>
          <SwitchLandingPageType />
        </Card>
      </Grid>
    </Grid>
  )
}

function LandingPage(props: AuthProps) {
  const { isOrg } = props
  return (
    <div>      
      <h1>Öffentliche Landing-Page</h1>
      <ControlElements />
      <Divider />
      <DhtLandingPage />
    </div>
  )
}

export default LandingPage
