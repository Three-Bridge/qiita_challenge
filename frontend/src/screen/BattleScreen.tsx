import AutoSlider from "../sliderBar/sliderBar.tsx";
import {useEffect, useState} from "react";
// import {useLocation} from "react-router-dom";
import styles from "./BattleScreen.module.scss";
import {useLocation} from "react-router-dom";

export default function BattleScreen() {
    const [isMoving, setIsMoving] = useState(true)
    const [myCharacterParameters, setMyCharacterParameters] = useState<{
        image: string
        hp: string | number,
        attack: string | number,
        defence: string | number
    }>({image: '', hp: '', attack: '', defence: ''})
    const [enemyCharacterParameters, setEnemyCharacterParameters] = useState<{
        image: string
        hp: string | number,
        attack: string | number,
        defence: string | number
    }>({image: '', hp: '', attack: '', defence: ''})

    const location = useLocation()
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
        setIsMoving(!isMoving)
    };

    return (
        <>
            <div>test</div>
            <div className={styles.characters}>
                <div className={styles.myCharacter}>
                    <div className={styles.myName}>user</div>
                    <p>myCharacter</p>
                    {/*<img src={myCharacterParameters.image}></img>*/}
                    {/*<p><span>HP:</span> {myCharacterParameters.hp}</p>*/}
                    {/*<p><span>Attack:</span>{myCharacterParameters.attack}</p>*/}
                    {/*<p><span>Defence:</span>{myCharacterParameters.defence}</p>*/}
                </div>
                <div>vs</div>
                <div className={styles.enemyCharacter}>
                    <div className={styles.enemyName}>CPU</div>
                    <p>enemyCharacter</p>
                    {/*<img src={enemyCharacterParameters.image}></img>*/}
                    {/*<p><span>HP:</span> {enemyCharacterParameters.hp}</p>*/}
                    {/*<p><span>Attack:</span>{enemyCharacterParameters.attack}</p>*/}
                    {/*<p><span>Defence:</span>{enemyCharacterParameters.defence}</p>*/}
                </div>
            </div>
            <AutoSlider
                isMoving={isMoving}
                setIsMoving={setIsMoving}
            />
            <button
                onClick={handleMouseDown}
            >
                tap
            </button>
        </>
    )
}