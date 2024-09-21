import {AutoSlider, Range} from '../sliderBar/sliderBar.tsx'
import {useEffect, useState} from 'react'
// import {useLocation} from "react-router-dom";
import styles from './BattleScreen.module.scss'
import {useLocation} from 'react-router-dom'
import {Authenticator} from '@aws-amplify/ui-react'
import BattleBgm from '../bgm/BattleBgm02.mp3'
import useSound from "use-sound";


export default function BattleScreen() {
  const [setPoints, setTapPoints] = useState(0)
  const [isMoving, setIsMoving] = useState(true)
  const [myCharacterParameters, setMyCharacterParameters] = useState<{
    image: string
    hp: number,
    attack: number,
    defence: number
  // }>({image: '', hp: '', attack: '', defence: ''})
  }>({image: '', hp: 1500, attack: 200, defence: 300})
  const [enemyCharacterParameters, setEnemyCharacterParameters] = useState<{
    image: string
    hp: number,
    attack: number,
    defence: number
  // }>({image: '', hp: '', attack: '', defence: ''})
  }>({image: '', hp: 1000, attack: 500, defence: 100})
  const location = useLocation()
  const [play, stop] = useSound(BattleBgm,{volume: 0.1})
  useEffect(() => {
    // play()
  }, []);
  // useEffect(() => {
  //   setMyCharacterParameters({
  //     image: location.state.myCharacterParameters.image,
  //     hp: location.state.myCharacterParameters.hp,
  //     attack: location.state.myCharacterParameters.attack,
  //     defence: location.state.myCharacterParameters.defence,
  //   })
  //   setEnemyCharacterParameters({
  //     image: location.state.enemyCharacterParameters.image,
  //     hp: location.state.enemyCharacterParameters.hp,
  //     attack: location.state.enemyCharacterParameters.attack,
  //     defence: location.state.enemyCharacterParameters.defence,
  //   })
  // }, [])
  // useEffect(() => {
  //   handleMouseDown()
  // }, [setPoints]);
  const handleMouseDown = () => {
    setIsMoving(!isMoving)
    if(setPoints >= 45 && setPoints <=55){
    console.log("in if ",setPoints)
      setMyCharacterParameters({...myCharacterParameters, hp:myCharacterParameters.hp -myCharacterParameters.attack})
    }
  }

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <div>test</div>
      <div className={styles.characters}>
        <div className={styles.myCharacter}>
          <div className={styles.myName}>user</div>
          <p>myCharacter</p>
          {/*DemoCharacter*/}
          <img className={styles.characterPicture} src={"./src/demoPicture/demo1.png"} alt={'demo1'}></img>
          {/*<img src={myCharacterParameters.image}></img>*/}
          <p>{`HP:${myCharacterParameters.hp}`}</p>
          <p>{`Attack:${myCharacterParameters.attack}`}</p>
          <p>{`Defence:${myCharacterParameters.defence}`}</p>

        </div>
        <div className={styles.vsText}>vs</div>
        <div className={styles.enemyCharacter}>
          <div className={styles.enemyName}>CPU</div>
          <p>enemyCharacter</p>
          {/*DemoEnemy*/}
          <img className={styles.characterPicture} src={"./src/demoPicture/demo1.png"} alt={'demo2'}></img>
          {/*<img className={styles.enemyCharacterPicture} src={enemyCharacterParameters.image}></img>*/}
          <p>{`HP:${enemyCharacterParameters.hp}`}</p>
          <p>{`Attack:${enemyCharacterParameters.attack}`}</p>
          <p>{`Defence:${enemyCharacterParameters.defence}`}</p>
        </div>
      </div>
      <div className={styles.sliderContainer}>
        <AutoSlider
            isMoving={isMoving}
            setIsMoving={setIsMoving}
            setTapPoints={setTapPoints}
        />
        <Range
            max={100}
            min={0}
            value={50}
            color='red'
            width="10%"
            className={styles.targetZone}
        />
      </div>
      <button
        onClick={handleMouseDown}
      >
        tap
      </button>
    </Authenticator>
  )
}