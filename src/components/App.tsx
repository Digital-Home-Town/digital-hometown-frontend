import "./App.css"
import "react-toastify/dist/ReactToastify.css"

import { Box, PaletteMode } from "@mui/material"
import { grey } from "@mui/material/colors"
import Container from "@mui/material/Container"
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider"
import { de } from "date-fns/locale"
import React from "react"
import { BrowserRouter, Route, Routes } from "react-router-dom"
import { toast, ToastContainer } from "react-toastify"
import { AuthProvider } from "src/auth/AuthContext"
import ChatPage from "src/pages/ChatPage"
import GenericProfilePage from "src/pages/profiles/GenericProfilePage"
import BlockedPage from "src/pages/settings/BlockedPage"
import ClubSettingsPage from "src/pages/settings/ClubSettingsPage"
import UserSettingsPage from "src/pages/settings/UserSettingsPage"

import { ThemeContextProvider } from "../contexts/ThemeContext"
import {
  Register,
  RegisterOrg,
  ResetPassword,
  SignIn,
  SignInOrg,
  SignOut,
} from "./auth"
import BackendHealth from "./BackendHealth"
import Footer from "./general/Footer"
import Header from "./general/Header"
import LandingPageOrg from "./LandingPageOrg"
import MuiPlayground from "./playground/mui/MuiPlayground"
import { PostProvider } from "./posts/PostContext"
import PostList from "./posts/PostList"
import Start from "./Start"

export const ColorModeContext = React.createContext({ toggleColorMode: () => {} })
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeContextProvider defaultColor={"light" as const}>
      <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={de}>
        <AuthProvider>{children}</AuthProvider>
      </LocalizationProvider>
    </ThemeContextProvider>
  )
}

/**
 * Main app component
 */
function App() {
  const [mode, setMode] = React.useState<PaletteMode>("light")
  const colorMode = React.useMemo(
    () => ({
      // The dark mode switch would invoke this method
      toggleColorMode: () => {
        setMode((prevMode: PaletteMode) => (prevMode === "light" ? "dark" : "light"))
      },
    }),
    [],
  )
  return (
    <ColorModeContext.Provider value={colorMode}>
      <Providers>
        <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: mode === "dark" ? grey[800] : grey[200],
            color: "text.primary",
          }}
          style={{ minHeight: "100vh" }}
        >
          {/* HashRouter only needed because github pages put the root to github.io/<name> */}
          {/* <HashRouter> */}
          <BrowserRouter>
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
                  <Route path="/user-settings" element={<UserSettingsPage />} />
                  <Route path="/club-settings" element={<ClubSettingsPage />} />
                  <Route path="/blocked" element={<BlockedPage />} />
                  <Route path="/profile" element={<GenericProfilePage />} />
                  <Route
                    path="/posts"
                    element={
                      <PostProvider>
                        <PostList />
                      </PostProvider>
                    }
                  />
                  <Route path="/profile/:id" element={<GenericProfilePage />} />
                  <Route path="/reset-password" element={<ResetPassword />} />
                  <Route path="/chat/:id" element={<ChatPage />} />
                  <Route path="/organization">
                    <Route path="sign-in" element={<SignInOrg />} />
                    <Route path="register" element={<RegisterOrg />} />
                    <Route path="LandingPage" element={<LandingPageOrg />} />
                  </Route>
                </Routes>
              </Box>
            </Container>
            {/* </HashRouter> */}
          </BrowserRouter>
          <Footer />
        </Box>
      </Providers>
    </ColorModeContext.Provider>
  )
}

export default App
