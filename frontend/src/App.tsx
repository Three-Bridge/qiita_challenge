import CameraSetupScreen from './screen/CameraSetupScreen.tsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import BarcodeScreen from './screen/BarcodeScreen.tsx'
import CharacterSelectScreen from './screen/CharacterSelectScreen.tsx'
import {useEffect, useState} from 'react'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import BattleScreen from "./screen/BattleScreen.tsx";
import WinOrLossScreen from "./screen/WinOrLossScreen.tsx";
import BattleRecordScreen from "./screen/BattleRecordScreen.tsx";
import useSound from "use-sound";
import OpeningBgm from "./bgm/OpeningBgm.mp3"
import './screen/login.css'
import StartScreen from './screen/StartScreen.tsx'

const awsconfig = {
  ...amplifyconfig,
  oauth: {
    domain: 'barcode-battler-auth.auth.ap-northeast-1.amazoncognito.com',
    scope: ['email', 'profile', 'openid'],
    redirectSignIn: 'https://qiita-challenge-1.onrender.com,http://localhost:5173/auth/scan',
    redirectSignOut: 'https://qiita-challenge-1.onrender.com,http://localhost:5173',
    responseType: 'code',
  },
  federated: {
    googleClientId: '831511520721-atk5lhqpb6smq3v6tbheojbo0k3qdcil.apps.googleusercontent.com',
  },
}

Amplify.configure(awsconfig)


export default function App() {
  const [barcodeData, setBarcodeData] = useState<string | null>(null)
const [play, stop] = useSound(OpeningBgm)

  useEffect(() => {
    play()
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CameraSetupScreen openingBgm={OpeningBgm}/>} />
          <Route path='/scan' element={<BarcodeScreen setBarcodeData={setBarcodeData}/>} />
          <Route path='/scan-select' element={<CharacterSelectScreen barcodeData={barcodeData} />} />
          <Route path='/battle' element={<BattleScreen/>} />
          <Route path='/winOrLoss' element={<WinOrLossScreen/>} />
          <Route path='/battleRecord' element={<BattleRecordScreen/>} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


