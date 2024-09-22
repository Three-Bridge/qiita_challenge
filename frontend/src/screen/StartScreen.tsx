import {useNavigate} from 'react-router-dom'
import style from './StartScreen.module.scss'

type Props = {
    bgmPlayHandler?: ()=>void
}

export default function StartScreen({bgmPlayHandler}:Props) {
  const navigate = useNavigate()
  return (
      <div className={style.screenContainer}>
          <div><img className={style.titleLogoHead} src={'./src/logoPicture/title.png'}></img></div>
          <div><img className={style.titleLogoMiddle} src={'./src/logoPicture/reiwa.png'}></img></div>
        <div className={style.startBottun}>
            <button className={style.Bottun} onClick={() => {
                // if(bgmPlayHandler) bgmPlayHandler()
                navigate('/auth/login')    }}>Continue    </button>
            <button className={style.Bottun} onClick={() => {
                    // if(bgmPlayHandler) bgmPlayHandler()
                    navigate('/auth/login')
                }}> New Game
            </button>
        </div>
      </div>
  )
}
