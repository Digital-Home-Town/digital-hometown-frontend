import * as React from "react"

import { Register } from "./"

function RegisterOrg() {
  return (
    <div>
      <h1>Organisation</h1>
      <Register isOrg={true} />
    </div>
  )
}

export default RegisterOrg
