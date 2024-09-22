import {Authenticator} from '@aws-amplify/ui-react'
import {useLocation, useNavigate} from 'react-router-dom'
import {getCurrentUser} from 'aws-amplify/auth/cognito'
import {post} from 'aws-amplify/api'

export default function WinOrLossScreen() {
  const navigate = useNavigate()
  const location = useLocation()

  async function handleBattleRecord() {
    const username = await currentAuthenticatedUser()
    if (username) {
      const res = await postBattleRecords(username)
      if (res === undefined) return

      const resText = await res.body.text()
      const data = JSON.parse(resText)
      navigate('/auth/battleRecord', {state: data})
    }
  }

  async function currentAuthenticatedUser() {
    try {
      const authUser = await getCurrentUser()
      return authUser.username
    } catch (error) {
      console.log('未ログイン: ', error)
    }
  }

  async function postBattleRecords(username: string) {
    try {
      const restOperation = post({
        apiName: 'AuthBarcodeBattler',
        path: '/auth/battleRecord',
        options: {
          body: {
            'id': window.crypto.randomUUID(),
            'battle-result': location.state.userResult === 'win',
            'battle-date': formatDateToYYYYMMDDHHMMSS(),
            'user-id': username
          },
        }
      })

      return await restOperation.response
    } catch (error) {
      console.log(error)
    }
  }

  function formatDateToYYYYMMDDHHMMSS(): string {
    const date = new Date()

    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    const hours = String(date.getHours()).padStart(2, '0')
    const minutes = String(date.getMinutes()).padStart(2, '0')
    const seconds = String(date.getSeconds()).padStart(2, '0')

    const formattedDateTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`

    console.log(formattedDateTime)
    return formattedDateTime
  }


  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between'}}>
        <h2
          style={{marginTop: '60px'}}
        >
          {`I ${location.state.userResult}!!`}
        </h2>`
        <img
          src={location.state.winCharacter}
          style={{width: '220px', margin: '20px'}}
        ></img>
        <div>{location.state.winner}</div>
        <button
          onClick={() => navigate('/auth/login')}
          style={{margin: '10px', width: '90%'}}
        >New Game!!!
        </button>
        <button
          onClick={() => navigate('/auth/battle')}
          style={{margin: '10px', width: '90%'}}
        >Try Again!!
        </button>
        <button
          onClick={() => handleBattleRecord()}
          style={{margin: '10px', width: '90%'}}
        >Battle Record
        </button>
      </div>

    </Authenticator>
  )
}