import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'
import { Hub } from 'aws-amplify/utils'
import { getCurrentUser } from 'aws-amplify/auth'

export default function CameraSetupScreen() {
  const navigate = useNavigate()
  const [lambda, setLambda] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL

  Hub.listen('auth', async ({ payload }) => {
    switch(payload.event) {
      case 'signInWithRedirect':
        const user = await getCurrentUser()
        console.log(user.username)
        break
      case 'signInWithRedirect_failure':
        break
      case 'customOAuthState':
        const state = payload.data
        console.log(state)
        break
    }
  })

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLambda(data))
  }, [])

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
      <button onClick={() => loginWithSocialAccount}>Googleでログイン</button>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}