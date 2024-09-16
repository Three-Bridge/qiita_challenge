import {useNavigate} from 'react-router-dom'
import {useEffect} from 'react'

export default function CameraSetupScreen() {
  const navigate = useNavigate()

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(apiUrl)
      .then(res => console.log(res.json()))
  }, [])

  return (
    <>
      <h2>バーコード読み取り</h2>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}