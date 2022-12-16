import { render } from "@testing-library/react"
import React from "react"

import App from "./App"

describe("App component", () => {
  it("renders without errors", () => {
    render(<App />)
    // const linkElement = screen.getByText(/learn react/i)
    // expect(linkElement).toBeInTheDocument()
  })
})
