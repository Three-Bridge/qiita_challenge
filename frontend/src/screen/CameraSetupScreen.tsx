import {useNavigate} from 'react-router-dom'
import {signOut} from 'aws-amplify/auth/cognito'
import styles from './CameraSetupScreen.module.scss'
import {Authenticator} from '@aws-amplify/ui-react'
import barcodePictureTop from '../items/barcodeTop.png'
import '@aws-amplify/ui-react/styles.css'


export default function CameraSetupScreen() {
  const navigate = useNavigate()

  const signOutWithSocialAccount = async () => {
    await signOut({
      global: false,
      oauth: {
        redirectUrl: import.meta.env.VITE_SIGN_OUT_REDIRECT_URL
      }
    })
  }

  return (
      <Authenticator
          socialProviders={['google', 'amazon', 'apple', 'facebook']}>
        <div className={styles.topBarcode} ><img src={barcodePictureTop}></img></div>

        <div style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: '120px'
        }}>
          <button className={styles.loginButton} onClick={() => navigate('/auth/scan')}>Scan Barcode</button>
          <button className={styles.loginButton} onClick={() => signOutWithSocialAccount()}>Sign out</button>
        </div>
      </Authenticator>
)
}