import "./App.css"

import React from "react"
import { HashRouter, NavLink, Route, Routes } from "react-router-dom"

import logo from "../logo.svg"
import { useBackendHealth } from "../hooks/useBackendHealth"
import withAuth from "../hocs/withAuth"
import { AuthContextValues } from "../contexts/AuthContext"
import { INITIAL_LOGGED_IN_USER } from "../types/User"

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

function BackendHealthNoAuth({ loggedInUser, setLoggedInUser }: AuthContextValues) {
  const { status } = useBackendHealth("LOADING")

  return loggedInUser !== undefined ? (
    <div>
      <p>Backend status is {status.status}</p>
      <p>
        {loggedInUser.name.first} {loggedInUser.name.last} is logged in as {loggedInUser.role}
      </p>
      <button
        onClick={() => {
          setLoggedInUser(undefined)
        }}
      >
        Logout
      </button>
    </div>
  ) : (
    <div>
      <p>Not authenticated</p>
      <button
        onClick={() => {
          setLoggedInUser(INITIAL_LOGGED_IN_USER)
        }}
      >
        Login
      </button>
    </div>
  )
}

const BackendHealth = withAuth(BackendHealthNoAuth)

function App() {
  return (
    <div className="App">
      {/* HashRouter only needed because github pages put the root to github.io/<name> */}
      <HashRouter>
        <div className="Navbar">
          <ul>
            <li>
              <NavLink to="/">Home</NavLink>
            </li>
            <li>
              <NavLink to="/health">Backend Health</NavLink>
            </li>
          </ul>
        </div>
        <Routes>
          <Route path="/" element={<ReactStartPage />} />
          <Route path="/health" element={<BackendHealth />} />
        </Routes>
      </HashRouter>
    </div>
  )
}

export default App
