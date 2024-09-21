import {useNavigate} from 'react-router-dom'

export default function StartScreen() {
  const navigate = useNavigate()
  return (
    <>
      <div>
        <button onClick={() => navigate('/auth/login')}>つづき</button>
        <button> はじめから</button>
      </div>
    </>)
}