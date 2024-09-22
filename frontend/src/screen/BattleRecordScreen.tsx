import {Authenticator} from '@aws-amplify/ui-react'
import {useLocation} from 'react-router-dom'
// importy style from

export default function BattleRecordScreen() {
  const location = useLocation()
  const responseObject = location.state

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <h1>戦績</h1>
      <table border={1}>
        <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">勝敗</th>
          <th scope="col">戦闘日</th>
        </tr>
        </thead>
        <tbody>
        {responseObject.map((ele,index) => (
          <tr key = {index}>
            <th>{index+1}</th>
            <th scope="row">{ele['battle-result']?"Win":"Lose"}</th>
            <td>{ele['battle-date']}</td>
          </tr>
        ))}
        </tbody>
      </table>
    </Authenticator>
  )
}