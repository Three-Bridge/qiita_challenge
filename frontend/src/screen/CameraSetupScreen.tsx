import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'
import {signInWithRedirect} from '@aws-amplify/auth'
import {AuthUser, getCurrentUser, signOut} from 'aws-amplify/auth/cognito'
import {get} from 'aws-amplify/api'
import './login.css'
import styles from './CameraSetupScreen.module.scss'
import {Authenticator} from '@aws-amplify/ui-react'
import style from "./StartScreen.module.scss";
import barcodePicture from '../items/barcode_1.png'

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
        <div className={styles.topBarcode} ><img src={barcodePicture}></img></div>

        <h2 className={styles.loginButtonContainer}>Start Config</h2>
        <div className={styles.loginButtonContainer}>{authUser?.username || '未ログイン'}</div>
        <div className={styles.loginButtonContainer}>{resObject.success}</div>
        <div className={styles.loginButtonContainer}>
          <button className={styles.loginButton} onClick={() => loginWithSocialAccount()}>Log in by Google</button>
          <button className={styles.loginButton} onClick={() => signOutWithSocialAccount()}>Sign out</button>
          <button className={styles.loginButton} onClick={() => navigate('/auth/scan')}>Scan Barcode</button>
          <button className={styles.loginButton} onClick={() => navigate('/auth/battle')}>バトル画面</button>
        </div>
        <img className={styles.underBarcode} src={barcodePicture}></img>
      </Authenticator>
  )
}