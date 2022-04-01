import "./App.css"

import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from "../auth/AuthContext"
import { ThemeContextProvider } from "../contexts/ThemeContext"
import logo from "../logo.svg"
import Footer from "./Footer"
import Header from "./Header"
import MuiPlayground from "./playground/mui/MuiPlayground"
import Register from "./profile/Register"
import SignIn from "./profile/SignIn"
import SignOut from "./profile/SignOut"
import Start from "./Start"

function BackendHealth() {
  const { status } = useBackendHealth("LOADING")

function ReactStartPage() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Digital Hometown Frontend
        {/* <br /> */}
        {/* {new Date().toLocaleString()} */}
      </p>
      <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
        Learn React
      </a>
      <a href="https://startpage.com">Jan</a>
      <a href="https://www.google.com">Jonas was here</a>
      <a href="https://github.com/bdnkl">Der hier auch</a>
    </header>
  )
}

function App() {
  return (
    <AuthProvider initialLoggedInUser={undefined}>
      <ThemeContextProvider defaultColor={"light" as const}>
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
                  <Route path="/register" element={<Register />} />
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

export default App
