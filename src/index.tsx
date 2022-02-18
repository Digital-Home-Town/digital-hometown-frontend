import React from "react"
import ReactDOM from "react-dom"
import "./index.css"
import App from "./components/App"
import reportWebVitals from "./reportWebVitals"
import { AuthProvider } from "./contexts/AuthContext"
import { INITIAL_LOGGED_IN_USER } from "./types/User"

ReactDOM.render(
  <React.StrictMode>
    <AuthProvider initialLoggedInUser={undefined}>
      <App />
    </AuthProvider>
  </React.StrictMode>,
  document.getElementById("root"),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
