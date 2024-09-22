import {useNavigate} from 'react-router-dom'
import style from './StartScreen.module.scss'

export default function StartScreen() {
  const navigate = useNavigate()
  return (
      <div className={style.screenContainer}>
          <div><img className={style.titleLogoHead} src={'./src/logoPicture/title.png'}></img></div>
          <div><img className={style.titleLogoMiddle} src={'./src/logoPicture/reiwa.png'}></img></div>
        <div className={style.startBottun}>
            <button className={style.Bottun} onClick={() => {
                navigate('/auth/login')    }}>Continue    </button>
            <button className={style.Bottun} onClick={() => {
                    navigate('/auth/login')
                }}> New Game
            </button>
        </div>
      </div>
  )
}
