import "./App.css"
import "react-toastify/dist/ReactToastify.css"
import { Box } from "@mui/material"
import Container from "@mui/material/Container"
import React from "react"
import { HashRouter, Route, Routes } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { AuthProvider } from "src/auth/AuthContext"

import { ThemeContextProvider } from "../contexts/ThemeContext"
import BackendHealth from "./BackendHealth"
import Footer from "./general/Footer"
import Header from "./general/Header"
import MuiPlayground from "./playground/mui/MuiPlayground"
import { Register, RegisterOrg, ResetPassword, SignIn, SignInOrg, SignOut } from "./auth"
import Start from "./Start"
import ProfilePage from "./profile/ProfilePage"
import AccountPage from "./profile/AccountPage"
import Chat from "./chat/Chat"

toast.configure()

/**
 * Main app component
 */
function App() {
  return (
    <ThemeContextProvider defaultColor={"light" as const}>
      <AuthProvider>
        <ToastContainer position={toast.POSITION.TOP_RIGHT} />
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
                  <Route path="/account" element={<AccountPage />} />
                  <Route path="/profile/:id" element={<ProfilePage />} />
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
    </ThemeContextProvider>
  )
}

export default App
