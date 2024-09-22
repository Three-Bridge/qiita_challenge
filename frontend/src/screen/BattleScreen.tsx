import {AutoSlider, Range} from '../sliderBar/sliderBar.tsx'
import  {useEffect, useState} from 'react'
// import {useLocation} from "react-router-dom";
import styles from './BattleScreen.module.scss'
import {useLocation, useNavigate} from 'react-router-dom'
import {Authenticator} from '@aws-amplify/ui-react'
import BattleBgm from '../bgm/BattleBgm02.mp3'
import useSound from "use-sound";

type Props = {
    barcodeData: string | null;
};

export default function BattleScreen({barcodeData}: Props) {
    const navigate = useNavigate()
    const [setPoints, setTapPoints] = useState(0)
    const [isMoving, setIsMoving] = useState(0)
    const [myCharacterParameters, setMyCharacterParameters] = useState<{
        image: string
        hp: number,
        attack: number,
        defence: number
        // }>({image: '', hp: '', attack: '', defence: ''})
    }>({image: "../src/demoPicture/demo1.png", hp: 1500, attack: 200.01, defence: 300})
    const [enemyCharacterParameters, setEnemyCharacterParameters] = useState<{
        image: string
        hp: number,
        attack: number,
        defence: number
        // }>({image: '', hp: '', attack: '', defence: ''})
    }>({image: '../src/demoPicture/demo2.png', hp: 1000, attack: 500, defence: 100})
    const location = useLocation()

//パラメータ関数
    const barSize = (barcodeDataString: string) => {
        const setNumber = Number(barcodeDataString)
        if (setNumber === 0) {
            return Math.floor(Math.random() * 9 + 1) // 1から10の値
        } else {
            return setNumber
        }
    }

    // 10から30の間
    const targetZoneWidth = Math.floor(barSize(barcodeData![9]) / 3) * 10

    // const barSpeedUpValue = Math.floor(barSize(barcodeData![9]) / 3)

    //3ー10の間
    const criticalZoneWidth = (() => {
        if (barSize(barcodeData![10]) < 3) {
            return 3
        } else {
            return barSize(barcodeData![10])
        }
    })();

    //30ー70で10刻み
    const criticalZonePosition = barSize(barcodeData![11]) * 10 <= 30 ? 30 :
        barSize(barcodeData![11]) * 10 > 70 ? 70 : barSize(barcodeData![11]) * 10

    const [play, stop] = useSound(BattleBgm, {volume: 0.1})
    useEffect(() => {
        // play()
    }, []);
    useEffect(() => {
      setMyCharacterParameters({
        image: location.state.myCharacterParameters.image,
        hp: location.state.myCharacterParameters.hp,
        attack: location.state.myCharacterParameters.attack,
        defence: location.state.myCharacterParameters.defence,
      })
      setEnemyCharacterParameters({
        image: location.state.enemyCharacterParameters.image,
        hp: location.state.enemyCharacterParameters.hp,
        attack: location.state.enemyCharacterParameters.attack,
        defence: location.state.enemyCharacterParameters.defence,
      })
    }, [])

    const handleMouseDown = () => {
        setIsMoving((current)=>current +1)
        if (setPoints >= 50 - criticalZoneWidth / 2 && setPoints <= 50 + criticalZoneWidth / 2){
        console.log("critical ", setPoints)
            if(myCharacterParameters.attack > enemyCharacterParameters.defence) {
                setEnemyCharacterParameters({
                    ...enemyCharacterParameters,
                    hp: Math.floor(enemyCharacterParameters.hp - (myCharacterParameters.attack * 1.5))
                })
            }else {
                setEnemyCharacterParameters({
                    ...enemyCharacterParameters,
                    hp: Math.floor(enemyCharacterParameters.hp - (myCharacterParameters.attack * 1.2))
                })
            }
        }
        if (setPoints >= 50 - targetZoneWidth / 2 && setPoints <= 50 + targetZoneWidth / 2) {
            console.log("attack", setPoints)
            if (myCharacterParameters.attack > enemyCharacterParameters.defence) {
                const myAttack = myCharacterParameters.attack + (myCharacterParameters.attack - enemyCharacterParameters.defence) * 0.1
                setEnemyCharacterParameters({
                    ...enemyCharacterParameters,
                    hp: Math.floor(enemyCharacterParameters.hp - myAttack)
                })
            }else if(myCharacterParameters.attack == enemyCharacterParameters.defence){
                setEnemyCharacterParameters({
                    ...enemyCharacterParameters,
                    hp: Math.floor(enemyCharacterParameters.hp - myCharacterParameters.attack)
                })

            }else {
                const myAttack = myCharacterParameters.attack - (myCharacterParameters.attack - enemyCharacterParameters.defence) * 0.1
                setEnemyCharacterParameters({
                    ...enemyCharacterParameters,
                    hp: Math.floor(enemyCharacterParameters.hp - myAttack)
                })

            }
        }
    }

    const enemyAttack = () => {
        console.log(Math.round((Math.random()/2+0.5)*10)/10)
        setMyCharacterParameters({
            ...myCharacterParameters,
            hp: Math.floor(myCharacterParameters.hp - enemyCharacterParameters.attack * (Math.round((Math.random()/2+0.5)*10)/10))
        })
    }

    useEffect(() => {
        //screen moving
        if(enemyCharacterParameters.hp <= 0 ) {
            navigate('/auth/winOrLoss',{state :{winCharacter: myCharacterParameters.image,winner:"User" ,userResult:"win" }})
        }else if(myCharacterParameters.hp <= 0 ){
            navigate('/auth/winOrLoss',{state :{winCharacter: enemyCharacterParameters.image,winner:"CPU" ,userResult:"lose"}})
        }
    }, [myCharacterParameters.hp,enemyCharacterParameters.hp]);

    return (
        <Authenticator
            socialProviders={['google', 'amazon', 'apple', 'facebook']}>
            <div className={styles.title}>Fight!</div>
            <div className={styles.characters}>
                <div className={styles.myCharacter}>
                    <div className={styles.myName}>myCharacter</div>
                    {/*<p className={styles.myCharacterName}>myCharacter</p>*/}
                    <img className={styles.characterPicture} src={myCharacterParameters.image} alt={'demo1'}></img>
                    <p>{`HP:${myCharacterParameters.hp}`}</p>
                    <p>{`Attack:${myCharacterParameters.attack}`}</p>
                    <p>{`Defence:${myCharacterParameters.defence}`}</p>
                </div>
                <div className={styles.vsText}>vs</div>
                <div className={styles.enemyCharacter}>
                    <div className={styles.enemyName}>CPU</div>
                    {/*<p>enemyCharacter</p>*/}
                    <img className={styles.characterPicture} src={enemyCharacterParameters.image}></img>
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
                    enemyAttack ={enemyAttack}
                    // barSpeedUpValue={barSpeedUpValue}
                />
                <Range
                    max={100}
                    min={0}
                    value={50}
                    color='orange'
                    width={`${targetZoneWidth}%`}
                    className={styles.targetZone}
                    barBackgroundColor={"transparent"}/>
                <Range
                    max={100}
                    min={0}
                    value={criticalZonePosition}
                    color='red'
                    width={`${criticalZoneWidth}%`}
                    className={styles.criticalZone}
                    barBackgroundColor={'transparent'}/>
            </div>
            <div className={styles.tapButtonContainer}>
                <button className={styles.tapBottun}
                        onClick={handleMouseDown}
                >
                    {isMoving ? "Attack" : "Start"}
                </button>
            </div>
        </Authenticator>
    )
}