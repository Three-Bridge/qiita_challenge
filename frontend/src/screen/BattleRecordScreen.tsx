import {Authenticator} from '@aws-amplify/ui-react'
import {post} from 'aws-amplify/api'
import {useEffect, useState} from 'react'
import {getCurrentUser} from 'aws-amplify/auth/cognito'

type ResObject = {
  id: string,
  'battle-result': boolean,
  opponent: string,
  'battle-date': string
}

export default function BattleRecordScreen() {
  const [resObject, setResObject] = useState<ResObject[]>([])

  useEffect(() => {
    (async () => {
      const username = await currentAuthenticatedUser()

      if (username) {
        postBattleRecords(username)
          .then(res => res?.body.text())
          .then(data => setResObject(JSON.parse(data ?? '[]')))
      }
    })()
  }, [])

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
            userName: username
          }
        }
      })

      return await restOperation.response
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <h1>戦績</h1>
      <table border={1}>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">勝敗</th>
          <th scope="col">敵</th>
          <th scope="col">戦闘日</th>
        </tr>
        </thead>
        <tbody>
        {resObject.map((ele,index) => (
          <tr key = {index}>
            <th>{index+1}</th>
            <th scope="row">{ele['battle-result']?"Win":"Lose"}</th>
            <td>{ele.opponent }</td>
            <td>{ele['battle-date']}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Authenticator>
  )
}