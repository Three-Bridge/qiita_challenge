import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'
import {Amplify} from 'aws-amplify'
import {AuthUser, getCurrentUser, signOut} from 'aws-amplify/auth/cognito'
import { get } from 'aws-amplify/api'

Amplify.configure({
  Auth: {
    Cognito: {
      userPoolId: 'ap-northeast-1_nBog007S4',
      userPoolClientId: '3cttt8i30gdu6sk4kjbd4s4c4',
      loginWith: {
        oauth: {
          domain: 'barcode-battler-cog.auth.ap-northeast-1.amazoncognito.com',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: ['https://qiita-challenge-1.onrender.com', 'http://localhost:5173'],
          redirectSignOut: ['https://qiita-challenge-1.onrender.com', 'http://localhost:5173'],
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
    fetch('/api')
      .then(res => res.json())
      .then(data => setLambda(data))

    getData()

    currentAuthenticatedUser()
  }, [])

  async function getData() {
    try {
      const restOperation = get({
        apiName: 'barcode-battler-api',
        path: '/'
      })
      const response = await restOperation.response
      console.log('response', response)
    } catch (error) {
      console.error('fetch [GET] / error',error)
    }
  }

  const loginWithSocialAccount = async () => {
    await signInWithRedirect({
      provider: 'Google'
    })
  }

  const signOutWithSocialAccount = async () => {
    await signOut({
      global: false,
      oauth: {
        redirectUrl: import.meta.env.VITE_SIGN_OUT_REDIRECT_URL
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