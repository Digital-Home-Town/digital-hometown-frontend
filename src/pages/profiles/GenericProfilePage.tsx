import * as React from "react"
import { useEffect } from "react"
import ReactPlaceholder from "react-placeholder"
import { useParams } from "react-router"
import { AuthContextI } from "src/auth/AuthContext"
import ClubProfile from "src/components/profile/ClubProfile"
import UserProfile from "src/components/profile/UserProfile"
import clubService from "src/services/ClubService"
import profileService from "src/services/ProfileService"

import withAuth from "../../auth/withAuth"

function GenericProfilePage({ currentUser }: AuthContextI) {
  const { id } = useParams()
  const [profile, setProfile] = React.useState<null | GenericProfile>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const getExists = async () => {
      const userData = await profileService.get(id || "")
      if (userData) {
        setIsLoading(false)
        setProfile(userData)
        return
      }
      const clubData = await clubService.get(id || "")
      if (clubData) {
        setProfile(clubData)
      }
      setIsLoading(false)
      return
    }
    if (id) {
      getExists()
    } else if (!id && currentUser) {
      setIsLoading(false)
      setProfile(currentUser)
    } else {
      setIsLoading(false)
    }
  }, [id, currentUser])

  return (
    <ReactPlaceholder ready={!isLoading} type={"media"}>
      {profile ? (
        profile?.isOrg ? (
          <ClubProfile profile={profile}></ClubProfile>
        ) : (
          <UserProfile profile={profile}></UserProfile>
        )
      ) : (
        <div>Du hast keinen Zugriff auf diese Seite</div>
      )}
    </ReactPlaceholder>
  )
}

export default withAuth(GenericProfilePage)
