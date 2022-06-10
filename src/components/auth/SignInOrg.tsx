import * as React from "react"

import { SignIn } from "./"

function SignInOrg() {
  return (
    <div>
      <h1>Organisation</h1>
      <SignIn isOrg={true} />
    </div>
  )
}

export default SignInOrg
