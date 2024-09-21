import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'
import {AuthUser, getCurrentUser, signOut} from 'aws-amplify/auth/cognito'
import {get} from 'aws-amplify/api'
import './login.css'
import {Authenticator} from '@aws-amplify/ui-react'

type ResObject = {
  success: string,
  url: string
}

export default function CameraSetupScreen() {
  // const apiUrl = import.meta.env.VITE_API_URL
  const navigate = useNavigate()
  const [authUser, setAuthUser] = useState<AuthUser | null>(null)
  const [resObject, setResObject] = useState<ResObject>({success: '', url: ''})


  useEffect(() => {
    userGet()
      .then(res => res?.body.text())
      .then(text => setResObject(JSON.parse(text ?? JSON.stringify({success: '', url: ''}))))

    currentAuthenticatedUser()
  }, [])

  async function userGet() {
    try {
      const restOperation = get({
        apiName: 'AuthBarcodeBattler',
        path: '/auth',
      })

      return await restOperation.response
    } catch (error) {
      console.log(error)
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
      console.log('未ログイン: ', error)
    }
  }

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <h2>バーコード読み取り</h2>
      <div>{authUser?.username || '未ログイン'}</div>
      <div>{resObject.success}</div>
      <button onClick={() => loginWithSocialAccount()}>Googleでログイン</button>
      <button onClick={() => signOutWithSocialAccount()}>サインアウト</button>
      <button onClick={() => navigate('/auth/scan')}>カメラを起動する</button>
      <button onClick={() => navigate('/auth/battle')}>バトル画面</button>
    </Authenticator>
  )
}