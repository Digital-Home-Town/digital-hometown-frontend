import "./App.css"

import React from "react"

import { HashRouter, Route, Routes } from "react-router-dom"

import { Box, Typography } from "@mui/material"
import Container from "@mui/material/Container"

import { useBackendHealth } from "../hooks/useBackendHealth"
import Footer from "./Footer"
import Header from "./Header"
import MuiPlayground from "./playground/mui/MuiPlayground"
import SignIn from "./SignIn"
import SignOut from "./SignOut"
import { ThemeContextProvider } from "../context/ThemeContext"
import { AuthProvider } from "../auth/AuthContext"
import Start from "./Start"
import { INITIAL_LOGGED_IN_USER } from "../auth/Auth"

function BackendHealth() {
  const { status } = useBackendHealth("LOADING")

  return <Typography sx={{ textAlign: "center" }}>Backend status is {status.status}</Typography>
}

function App() {
  return (
    <AuthProvider initialLoggedInUser={INITIAL_LOGGED_IN_USER}>
      <ThemeContextProvider defaultColor={"dark" as const}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "100vh",
            bgcolor: "background.default",
            color: "text.primary",
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
                  <Route path="/sign-out" element={<SignOut />} />
                </Routes>
              </Box>
            </Container>
          </HashRouter>
          <Footer />
        </Box>
      </ThemeContextProvider>
    </AuthProvider>
  )
}

export default withAuth(App)
