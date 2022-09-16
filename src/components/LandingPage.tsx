import { Check, Image } from "@mui/icons-material"
import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router"
import { AuthProps } from "src/auth/AuthContext"

import vernetzenImg from "../img/landing-page_vernetzen.png"
import helfenImg from "../img/landing-page_helfen.png"
import marketplaceImg from "../img/landing-page_marketplace.png"
import vereineImg from "../img/landing-page_vereine.png"

const cardContent = [
  {
    title: "Vernetzen",
    text: "Du bist auf der Suche nach Menschen mit ähnlichen Hobbys und Interessen? Lerne deine Nachbarschaft kennen und finde heraus, was euch verbindet!",
    img: vernetzenImg,
  },
  {
    title: "Helfen",
    text: "Du benötigst Unterstützung beim Bewältigen einer Aufgabe oder möchtest dein Wissen und Fähigkeiten teilen? Lass es deine Nachbarschaft wissen!",
    img: helfenImg,
  },
  {
    title: "Entdecken",
    text: "Du bist auf der Suche nach etwas neuem oder möchtest deiner Nachbarschaft etwas anbieten? Im Marktplatz findest du alles, was zurzeit in deiner Nachbarschaft gesucht oder angeboten wird.",
    img: marketplaceImg,
  },
  {
    title: "Vereine",
    text: "Du willst informiert bleiben, was gerade in deinem lokalen Verein ansteht oder möchtest aktiv am Vereinsleben teilnehmen? Hier bist du genau richtig!",
    img: vereineImg,
  },
]

function DhtLandingPage() {
  return (
    <Grid container flexDirection="row" alignItems="stretch" justifyContent="center" spacing={2}>
      {cardContent.map((card) => (
        <Grid item xs={8} sm={4} md={3} key={card.title}>
          <Card style={{ height: "100%" }}>
            <CardHeader title={card.title} sx={{ textAlign: "center" }} />
            <CardMedia component="img" image={card.img} alt={card.title} height="200px" />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {card.text}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
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
    <Grid
      container
      spacing={2}
      sx={{ marginTop: 1, marginBottom: 1 }}
      style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
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
      <ControlElements />
      <DhtLandingPage />
    </div>
  )
}

export default LandingPage
