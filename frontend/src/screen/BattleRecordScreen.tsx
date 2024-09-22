import {Authenticator} from '@aws-amplify/ui-react'
import {useLocation, useNavigate} from 'react-router-dom'
import style from './BattleRecordScreen.module.scss'

export default function BattleRecordScreen() {
  const navigator = useNavigate();
  const location = useLocation()
  const responseObject = location.state

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <div className={style.body}>
      <h1>History</h1>
      <div className={style.spacer}></div>
      <div className={style.tableContainer}>
        <table border={1}>
          <thead>
          <tr>
            <th className={style.idRow} scope="col">ID</th>
            <th className={style.resultRow} scope="col">Result</th>
            <th className={style.dateRow} scope="col">Date</th>
          </tr>
          </thead>
          <tbody>
          {responseObject.map((ele,index) => (
            <tr key = {index}>
              <td >{index+1}</td>
              <td className={style.result} scope="row">{ele['battle-result']?"Win":"Lose"}</td>
              <td>
                <p>{ele['battle-date'].slice(0,10)}</p>
                <p>{ele['battle-date'].slice(11,19)}</p>
              </td>
            </tr>
          ))}
          </tbody>
        </table>
        <div className={style.spacer}></div>
      </div>
        <div className={style.buttonContainer}>

      <button onClick={()=>{
        navigator("/")
      }}>Start Again</button>
        </div>

      </div>
    </Authenticator>
  )
}