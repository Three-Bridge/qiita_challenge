import CameraSetupScreen from './screen/CameraSetupScreen.tsx'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import BarcodeScreen from './screen/BarcodeScreen.tsx'
import CharacterSelectScreen from './screen/CharacterSelectScreen.tsx'
import {useState} from 'react'

export default function App() {
  const [barcodeData, setBarcodeData] = useState<string | null>(null)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<CameraSetupScreen />} />
          <Route path='/scan' element={<BarcodeScreen setBarcodeData={setBarcodeData}/>} />
          <Route path='/scan-select' element={<CharacterSelectScreen barcodeData={barcodeData} />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}


