import "./App.css"

import React from "react"

import {
  HashRouter,
  Route,
  Routes,
} from "react-router-dom"

import {
  Box,
  ThemeProvider,
  Typography,
} from "@mui/material"
import Container from "@mui/material/Container"

import { useBackendHealth } from "../hooks/useBackendHealth"
import customTheme from "../theme/customTheme"
import Footer from "./Footer"
import Header from "./Header"
import MuiPlayground from "./playground/mui/MuiPlayground"
import Start from "./playground/mui/Start"
import SignIn from "./SignIn"

function BackendHealth() {
  const { status } = useBackendHealth("LOADING")

  return <Typography sx={{ textAlign: "center" }}>Backend status is {status.status}</Typography>
}

function App() {
  return (
    <ThemeProvider theme={customTheme}>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          minHeight: "100vh",
        }}
      >
        {/* HashRouter only needed because github pages put the root to github.io/<name> */}
        <HashRouter>
          <Header />
          <Container component="main" maxWidth="lg">
            <Box mt={1} mb={1}>
              <Routes>
                <Route path="/" element={<Start />} />
                <Route path="/health" element={<BackendHealth />} />
                <Route path="/mui" element={<MuiPlayground />} />
                <Route path="/sign-in" element={<SignIn />} />
              </Routes>
            </Box>
          </Container>
        </HashRouter>
        <Footer />
      </Box>
    </ThemeProvider>
  )
}

export default App
