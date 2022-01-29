import React from "react"

import { render } from "@testing-library/react"

import App from "./App"

describe("App component", () => {
  it("renders learn react link", () => {
    render(<App />)
    // const linkElement = screen.getByText(/learn react/i)
    // expect(linkElement).toBeInTheDocument()
  })
})
