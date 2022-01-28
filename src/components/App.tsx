import "./App.css"

import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import logo from "../logo.svg"
import { useBackendHealth } from "../hooks/useBackendHealth"
import MuiPlayground from "./playground/MuiPlayground"
import customTheme from "../theme/customTheme"
import { Box, ThemeProvider, Typography } from "@mui/material"
import SignIn from "./SignIn"
import Footer from "./Footer"
import Container from "@mui/material/Container"
import Header from "./Header"
import Link from "@mui/material/Link"

function ReactStartPage() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Digital Hometown Frontend
        {/* <br /> */}
        {/* {new Date().toLocaleString()} */}
      </p>
      <Link className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </Link>
      <Link href="https://startpage.com">Jan</Link>
      <Link href="https://www.google.com">Jonas was here</Link>
      <Link href="#">Boas</Link>
    </header>
  )
}

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
                <Route path="/" element={<ReactStartPage />} />
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
