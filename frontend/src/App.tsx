import CameraSetupScreen from './screen/CameraSetupScreen.tsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import BarcodeScreen from './screen/BarcodeScreen.tsx'
import CharacterSelectScreen from './screen/CharacterSelectScreen.tsx'
import { useState} from 'react'
import { Amplify } from 'aws-amplify';
import amplifyconfig from './amplifyconfiguration.json';
import BattleScreen from "./screen/BattleScreen.tsx";
import WinOrLossScreen from "./screen/WinOrLossScreen.tsx";
import BattleRecordScreen from "./screen/BattleRecordScreen.tsx";
import './screen/login.css'
import StartScreen from './screen/StartScreen.tsx'
import useSound from "use-sound";
import OpeningBgm from './bgm/OpeningBgm.mp3'


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
const [openingBgmPlay, openingBgmStop] = useSound(OpeningBgm,{volume: 0.1})

  // const dummyBarcodeData = "4901123018162";
  const dummyBarcodeData = "4901178043162";

const openigBgmPlayHandler = ()=>{openingBgmPlay()}
// const openingBgmStopHandler = ()=>{openingBgmStop()}

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<StartScreen bgmPlayHandler={openigBgmPlayHandler}/>} />
          <Route path='/auth/login' element={<CameraSetupScreen/>} />
          <Route path='/auth/scan' element={<BarcodeScreen setBarcodeData={setBarcodeData}/>} />
          <Route path='/auth/scan-select' element={<CharacterSelectScreen barcodeData={dummyBarcodeData} />} />
          <Route path='/auth/battle' element={<BattleScreen barcodeData={dummyBarcodeData}/>} />
          <Route path='/auth/winOrLoss' element={<WinOrLossScreen/>} />
          <Route path='/auth/battleRecord' element={<BattleRecordScreen/>} />
        </Routes>
      </BrowserRouter>
    </>

  )
}


