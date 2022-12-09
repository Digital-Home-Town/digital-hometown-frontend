import { Event, Info, Percent, QuestionMark, Store, Group } from "@mui/icons-material"

export const API_URL = process.env.REACT_APP_API_URL
export const POST_TYPES = ["Anfrage", "Angebot", "Information", "Veranstaltung"]
export const POST_TYPES_ICONS = [QuestionMark, Percent, Info, Event]

export const TYPE_ICON_MAP = {
    Anfrage: QuestionMark,
    Angebot: Percent,
    Information: Info,
    Veranstaltung: Event,
    Ersteller : Group,
    Markt: Store
  };

