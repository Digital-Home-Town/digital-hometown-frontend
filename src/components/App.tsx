import "./App.css"

import React from "react"

import logo from "../logo.svg"

function App() {
  return (
    <div className="App">
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
        <a href="https://www.google.com">Jonas was here</a>
        <a href="https://github.com/bdnkl">Der hier auch</a>
      </header>
    </div>
  )
}

export default App
