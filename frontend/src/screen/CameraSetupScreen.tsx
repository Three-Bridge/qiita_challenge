import {useNavigate} from 'react-router-dom'

export default function CameraSetupScreen() {
  const navigate = useNavigate()

  return (
    <>
      <h2>バーコード読み取り</h2>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}