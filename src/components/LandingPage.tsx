import { Check } from "@mui/icons-material"
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material"
import { useNavigate } from "react-router"
import { AuthProps } from "src/auth/AuthContext"

import helfenImg from "../img/landing-page_helfen.png"
import kommunikationImg from "../img/landing-page_kommunikation.png"
import marketplaceImg from "../img/landing-page_marketplace.png"
import nachrichtenImg from "../img/landing-page_nachrichten.png"
import praesentationImg from "../img/landing-page_praesentation.png"
import veranstaltungenImg from "../img/landing-page_veranstaltungen.png"
import vereineImg from "../img/landing-page_vereine.png"
import vernetzenImg from "../img/landing-page_vernetzen.png"

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

const cardContentOrg = [
  {
    title: "Präsentation",
    text: "Was macht euren Verein wirklich aus?  Präsentiert euch in der Nachbarschaft und zeigt allen wofür Ihr steht!",
    img: praesentationImg,
  },
  {
    title: "Kommunikation",
    text: "Etwas Wichtiges muss mit den Mitgliedern des Vereins geklärt werden? Nutze hierfür die vereinsinternen Chats!",
    img: kommunikationImg,
  },
  {
    title: "Nachrichten",
    text: "Was gibt es für Neuigkeiten in eurem Verein? Teile es allen Mitgliedern und Interessierten mit!",
    img: nachrichtenImg,
  },
  {
    title: "Veranstaltungen",
    text: "Eine Veranstaltung steht in Kürze an? Informiere die Nachbarschaft darüber!",
    img: veranstaltungenImg,
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

function DhtLandingPageOrg() {
  return (
    <Grid container flexDirection="row" alignItems="stretch" justifyContent="center" spacing={2}>
      {cardContentOrg.map((card) => (
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

function SwitchLandingPageType(props: AuthProps) {
  const navigate = useNavigate()
  const { isOrg } = props
  return (
    <div>
      {isOrg ? (
        <Typography>Du bist kein Vereinsvorstand und möchtest zurück zu deiner Landing Page?</Typography>
      ) : (
        <Typography>Du bist Vorstand eines Vereins oder einer Organisation? Hier siehst du deine Vorteile.</Typography>
      )}
      <br />
      {isOrg ? (
        <Button onClick={() => navigate("/")} sx={{ marginRight: 0.5 }}>
          Für Privatpersonen
        </Button>
      ) : (
        <Button onClick={() => navigate("/organization/landingpage")} sx={{ marginRight: 0.5 }}>
          Für Vereine
        </Button>
      )}
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

function ControlElements(props: AuthProps) {
  const GRID_SIZE = 110
  const { isOrg } = props

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
          {isOrg ? <SwitchLandingPageType isOrg={true} /> : <SwitchLandingPageType isOrg={false} />}
        </Card>
      </Grid>
    </Grid>
  )
}

function LandingPage(props: AuthProps) {
  const { isOrg } = props
  return (
    <div>
      {isOrg ? <ControlElements isOrg={true} /> : <ControlElements isOrg={false} />}
      {isOrg ? <DhtLandingPageOrg /> : <DhtLandingPage />}
    </div>
  )
}

export default LandingPage
