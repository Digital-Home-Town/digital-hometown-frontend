import { useEffect, useState } from "react"
import axios from "axios"
import { API_URL } from "../global"

export async function getBackendHealth() {
  const resp = await axios.get(`${API_URL}/api/health`)
  console.log("/api/health", resp)
  return resp.data
}

export function useBackendHealth(loadingDefaultText: string) {
  const [status, setStatus] = useState({ status: loadingDefaultText })
  const [error, setError] = useState<string>("")

  useEffect(() => {
    async function updateStatus() {
      try {
        const data = await getBackendHealth()
        setStatus(data)
      } catch (error) {
        setError(String(error))
        setStatus({ status: "ERROR" })
      }
    }

    updateStatus().then(() => {
      console.log("Updated health")
    })
  }, [])

  return { status, error }
}
