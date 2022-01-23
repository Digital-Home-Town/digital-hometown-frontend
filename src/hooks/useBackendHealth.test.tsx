import React from "react"
import axios from "axios"

import { getBackendHealth, useBackendHealth } from "./useBackendHealth"
import { create, ReactTestRendererJSON } from "react-test-renderer"
import { API_URL } from "../global"

jest.mock("axios")
const mockedAxios = axios as jest.Mocked<typeof axios>

describe("getBackendHealth request", () => {
  it("should fetch the backend health data", async () => {
    const expectedData = { status: "UP" }
    const healthUrl = `${API_URL}/api/health`

    mockedAxios.get.mockReturnValueOnce(Promise.resolve({ data: expectedData }))

    const data = await getBackendHealth()

    expect(data).toStrictEqual(expectedData)
    expect(axios.get).toHaveBeenCalledWith(healthUrl)
    expect(mockedAxios.get).toHaveBeenCalled()
  })
})

describe("useBackendHealth Hook", function () {
  it("should render the initial backend status when startup", () => {
    const backendStatus = "LOADING"
    function BackendHealthTestComponent() {
      const { status } = useBackendHealth(backendStatus)
      return <div>{JSON.stringify(status)}</div>
    }

    const renderer = create(<BackendHealthTestComponent />)
    const rendererJSON = renderer.toJSON() as ReactTestRendererJSON
    expect(rendererJSON.children).toContain(`{"status":"${backendStatus}"}`)
  })
})
