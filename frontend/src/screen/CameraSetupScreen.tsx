import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'
import {Amplify} from 'aws-amplify'
import {AuthUser, getCurrentUser, signOut } from 'aws-amplify/auth/cognito'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_TUBhSTpkw',
      userPoolClientId: 'j8kkhbqirvs8l3i181sind02j',
      loginWith: {
        oauth: {
          domain: 'barcode-battler.auth.ap-northeast-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['https://qiita-challenge-1.onrender.com'],
          redirectSignOut: ['https://qiita-challenge-1.onrender.com'],
          responseType: 'code',
          providers: ['Google']
        }
      }
    }
  }
})

export default function CameraSetupScreen() {
  const navigate = useNavigate()
  const [lambda, setLambda] = useState<string | null>(null)
  const apiUrl = import.meta.env.VITE_API_URL
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLambda(data))

    currentAuthenticatedUser()
  }, [])

  const loginWithSocialAccount = async () => {
    await signInWithRedirect({
      provider: 'Google'
    })
  }

  const signOutWithSocialAccount = async () => {
    await signOut({
      global: false,
      oauth: {
        redirectUrl: 'https://qiita-challenge-1.onrender.com'
      }
    })
  }

  async function currentAuthenticatedUser() {
    try {
      const user = await getCurrentUser()
      setAuthUser(user)
    } catch (error) {
      console.log('未ログイン: ',error)
    }
  }

  return (
    <>
      <h2>バーコード読み取り</h2>
      <div>{lambda}</div>
      <div>{authUser?.username || '未ログイン'}</div>
      <button onClick={() => loginWithSocialAccount()}>Googleでログイン</button>
      <button onClick={() => signOutWithSocialAccount()}>サインアウト</button>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}