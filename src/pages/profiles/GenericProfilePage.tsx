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
  const [isOrg, setIsOrg] = React.useState<null | boolean>(null)
  const [exists, setExists] = React.useState<null | boolean>(null)
  const [isLoading, setIsLoading] = React.useState<boolean>(true)

  useEffect(() => {
    const getProfile = async () => {
      const service = isOrg ? clubService : profileService
      const profileData = await service.get(id || "")
      if (profileData) {
        setProfile(profileData)
      }
    }
    if (!profile) getProfile()
  }, [id, isOrg, profile])

  useEffect(() => {
    const getExists = async () => {
      let exists = await profileService.exists(id || "")
      if (exists) {
        setIsOrg(false)
        setExists(exists)
        setIsLoading(false)
        return
      }
      exists = await clubService.exists(id || "")
      setIsOrg(true)
      setExists(exists)
      setIsLoading(false)
      return
    }
    if (id && !exists) getExists()
    else if (!id && currentUser) {
      setIsOrg(currentUser?.isOrg)
      setExists(true)
      setIsLoading(false)
      setProfile(currentUser)
    }
  }, [id, exists, currentUser])

  return (
    <ReactPlaceholder ready={!isLoading} type={"media"}>
      {exists ? (
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
