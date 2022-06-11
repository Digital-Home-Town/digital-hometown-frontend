import "./App.css"
import "react-toastify/dist/ReactToastify.css"

import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { de } from "date-fns/locale"
import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { AuthProvider } from "src/auth/AuthContext"
import GenericProfilePage from "src/pages/profiles/GenericProfilePage"
import ClubSettingsPage from "src/pages/settings/ClubSettingsPage"

import { ThemeContextProvider } from "../contexts/ThemeContext"
import Chat from "../pages/Chat"
import ProfileSettingsPage from "../pages/settings/ProfileSettingsPage"
import { Register, RegisterOrg, ResetPassword, SignIn, SignInOrg, SignOut } from "./auth"
import BackendHealth from "./BackendHealth"
import Footer from "./general/Footer"
import Header from "./general/Header"
import MuiPlayground from "./playground/mui/MuiPlayground"
import Start from "./Start"

toast.configure()

/**
 * Main app component
 */
function App() {
  return (
    <ThemeContextProvider defaultColor={"light" as const}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <AuthProvider>
          <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.default",
              color: "text.primary",
            }}
            style={{ minHeight: "100vh" }}
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
                    <Route path="/sign-in" element={<SignIn isOrg={false} />} />
                    <Route path="/sign-out" element={<SignOut />} />
                    <Route path="/register" element={<Register isOrg={false} />} />
                    <Route path="/settings-profile" element={<ProfileSettingsPage />} />
                    <Route path="/settings-club" element={<ClubSettingsPage />} />
                    <Route path="/profile" element={<GenericProfilePage />} />
                    <Route path="/profile/:id" element={<GenericProfilePage />} />
                    <Route path="/reset-password" element={<ResetPassword />} />
                    <Route path="/dashboard">
                      <Route path="chat" element={<Chat />} />
                    </Route>
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
        </AuthProvider>
      </LocalizationProvider>
    </ThemeContextProvider>
  )
}

export default App
