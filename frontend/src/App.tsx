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

Amplify.configure(amplifyconfig)


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


