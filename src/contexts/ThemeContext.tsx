import React, { createContext, ReactNode, useContext, useMemo, useState } from "react"

import { PaletteMode } from "@mui/material"
import { deDE as coreDeDE } from "@mui/material/locale"
import { createTheme, ThemeProvider } from "@mui/material/styles"
import { deDE } from "@mui/x-data-grid"
import { deDE as pickersDeDE } from "@mui/x-date-pickers"

interface ThemeContextType {
  colorMode: PaletteMode
  toggleColorMode: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

interface ThemeContextProviderType {
  children: ReactNode
  defaultColor: PaletteMode
}

export function ThemeContextProvider({ children, defaultColor }: ThemeContextProviderType) {
  const [paletteMode, setPaletteMode] = useState<PaletteMode>(defaultColor)

  const handleToggleColorMode = useMemo(
    () => () => {
      // The dark mode switch would invoke this method
      setPaletteMode((prevMode) => (prevMode === "light" ? ("dark" as const) : ("light" as const)))
    },
    [],
  )

  const theme = useMemo(
    () =>
      createTheme(
        {
          ...customThemeOptions,
          palette: {
            mode: paletteMode,
            ...customThemeOptions.palette,
          },
        },
        deDE,
        pickersDeDE,
        coreDeDE,
      ),
    [paletteMode],
  )

  return (
    <ThemeContext.Provider value={{ colorMode: paletteMode, toggleColorMode: handleToggleColorMode }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  )
}

export function useThemeContext() {
  const context = useContext(ThemeContext)

  if (context === undefined) {
    throw new Error("useThemeContext should be used within an ThemeProvider.")
  }

  return context
}

// A custom default for this app
export const customThemeOptions = {
  typography: {
    button: {
      textTransform: "none" as const,
    },
  },
  spacing: 10,
  components: {
    MuiIconButton: {
      defaultProps: {
        color: "primary" as const,
      },
    },
    MuiButton: {
      defaultProps: {
        variant: "contained" as const,
      },
    },
    MuiTextField: {
      defaultProps: {
        variant: "standard" as const,
      },
    },
    MuiSelect: {
      defaultProps: {
        variant: "standard" as const,
      },
    },
    MuiPaper: {
      defaultProps: {},
    },
    MuiMenuItem: {
      defaultProps: {
        dense: true,
      },
    },
    MuiFormControl: {
      defaultProps: {
        variant: "standard" as const,
      },
    },
    // MuiCardMedia: {
    //   defaultProps: {
    //     sx: { display: "flex", alignItems: "center", justifyContent: "center" },
    //   },
    // },
    // MuiCardContent: {
    //   defaultProps: {
    //     sx: { display: "flex", alignItems: "center", justifyContent: "center" },
    //   },
    // },
  },
  palette: {
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
}
