import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import {AuthUser, getCurrentUser } from 'aws-amplify/auth'

export default function CameraSetupScreen() {
  const navigate = useNavigate()
  const [lambda, setLambda] = useState<string | null>(null)
  const [user, setUser] = useState<AuthUser | null>(null)
  const [customState, setCustomState] = useState<string>('')

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLambda(data))

    const unsubscribe = Hub.listen('auth', async ({ payload }) => {
      switch(payload.event) {
        case 'signInWithRedirect':
          getUser()
          break
        case 'signInWithRedirect_failure':
          console.log("An error has occurred during the Oauth flow.")
          break
        case 'customOAuthState':
          setCustomState(payload.data)
          break
      }
    })

    getUser()

    return unsubscribe
  }, [])

  const getUser = async (): Promise<void> => {
    try {
      const currentUser = await getCurrentUser()
      setUser(currentUser)
    } catch (error) {
      console.log(error)
      console.error("Not Signed in")
    }
  }

  const loginWithSocialAccount = async (customState: string) => {
    await signInWithRedirect({
      provider: 'Google',
      customState
    })
  }

  return (
    <>
      <h2>バーコード読み取り</h2>
      <div>{lambda}</div>
      <div>{user?.username || 'ログイン未'}</div>
      <button onClick={() => loginWithSocialAccount(customState)}>Googleでログイン</button>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}