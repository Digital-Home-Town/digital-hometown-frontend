import "./App.css"

import { Dashboard } from "@mui/icons-material"
import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"

import { AuthProvider } from "../auth/AuthContext"
import { ThemeContextProvider } from "../contexts/ThemeContext"
import BackendHealth from "./BackendHealth"
import Footer from "./Footer"
import Header from "./Header"
import MuiPlayground from "./playground/mui/MuiPlayground"
import Register from "./profile/Register"
import RegisterOrg from "./profile/RegisterOrg"
import SignIn from "./profile/SignIn"
import SignInOrg from "./profile/SignInOrg"
import SignOut from "./profile/SignOut"
import Start from "./Start"

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
                  <Route path="/dashboard" element={<Dashboard />} />
                  <Route path="/mui" element={<MuiPlayground />} />
                  <Route path="/sign-in" element={<SignIn />} />
                  <Route path="/sign-out" element={<SignOut />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="/organization">
                    <Route path="sign-in" element={<SignInOrg />} />
                    <Route path="register" element={<RegisterOrg />} />
                  </Route>
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
