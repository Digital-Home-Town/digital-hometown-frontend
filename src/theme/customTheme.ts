import { createTheme } from "@mui/material/styles"

// A custom default for this app
const customTheme = createTheme({
  typography: {
    button: {
      textTransform: "none",
    },
  },
  spacing: 10,
  components: {
    MuiIconButton: {
      defaultProps: {
        color: "primary",
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "outlined",
      },
    },
  },
  palette: {
    //   mode: "light",
    //   background: {
    //     default: "#FFFFFF",
    //     paper: "#b9ddcc",
    //   },
    primary: {
      main: "#295568",
    },
    //   secondary: {
    //     main: "#FFFFFF",
    //   },
    //   error: {
    //     main: red.A400,
    //   },
    //   success: {
    //     main: "#7bb994",
    //   },
    //   text: {
    //     primary: "#22262d",
    //     secondary: "#295568",
    //     disabled: "#5d5d5d",
    //   },
  },
})

export default customTheme
