import {Authenticator} from '@aws-amplify/ui-react'
import {useLocation, useNavigate} from "react-router-dom";



export default function WinOrLossScreen() {
    const navigate = useNavigate()
    const location = useLocation()
  return (
      <Authenticator
          socialProviders={['google', 'amazon', 'apple', 'facebook']}>
          <h2>{`I ${location.state.userResult}!!`}</h2>`
          <img src={location.state.winCharacter}></img>
          <div>{location.state.winner}</div>
          <button onClick={() => {
              navigate('/auth/login')
          }}>New Game!!!
          </button>
          <button onClick={() => {
              navigate('/auth/battle')
          }}>Try Again!!!
          </button>
          <button onClick={() => {
              navigate('/auth/battleRecord')
          }}>Battle Record</button>
      </Authenticator>
  )
}