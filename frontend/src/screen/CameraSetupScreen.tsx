import {useNavigate} from 'react-router-dom'
import {useEffect, useState} from 'react'

export default function CameraSetupScreen() {
  const navigate = useNavigate()
  const [lambda, setLambda] = useState<string | null>(null)

  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    fetch(apiUrl)
      .then(res => res.json())
      .then(data => setLambda(data))
  }, [])

  return (
    <>
      <h2>バーコード読み取り</h2>
      <div>{lambda}</div>
      <button onClick={() => navigate('/scan')}>カメラを起動する</button>
    </>
  )
}