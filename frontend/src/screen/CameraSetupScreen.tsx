import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'

export default function CameraSetupScreen() {
  const navigate = useNavigate()
  const [lambda, setLambda] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLambda(data))
  }, [])

  const loginWithSocialAccount = async () => {
    await signInWithRedirect({
      provider: 'Google',
    })
  }

  return (
    <>
      <h2>バーコード読み取り</h2>
      <div>{lambda}</div>
      <button onClick={loginWithSocialAccount}>Googleでログイン</button>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}