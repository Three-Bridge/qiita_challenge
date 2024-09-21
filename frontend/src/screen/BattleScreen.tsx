import AutoSlider from "../sliderBar/sliderBar.tsx";
import {useEffect} from "react";
import { useState} from "react";
import {useLocation} from "react-router-dom";
// import {CharacterSelectScreen, setMyCharacter} from "./CharacterSelectScreen.tsx";

export default function BattleScreen(){
    const [isMoving, setIsMoving] = useState(true); // スライダーの動作状態を管理
    const [myCharacterParameters, setMyCharacterParameters] = useState<{
        image: string
        hp: string | number,
        attack: string | number,
        defence: string | number
    }>({image:'',hp: '', attack: '', defence: ''})

    const location = useLocation()
    useEffect(() => {
setMyCharacterParameters({
    image: location.state.myCharacterParameters.image,
        hp: location.state.myCharacterParameters.hp,
    attack: location.state.myCharacterParameters.attack,
    defence: location.state.myCharacterParameters.defence,
})
    }, []);
    const handleMouseDown = () => {
        setIsMoving(!isMoving); // スライダーの動作を停止・再開
    };

    return(
        <>
            <div>test</div>
            <p>myCharacter</p>
            <img src={myCharacterParameters.image}></img>
            <p><span>HP:</span> {myCharacterParameters.hp}</p>
            <p><span>Attack:</span>{myCharacterParameters.attack}</p>
            <p><span>Defence:</span>{myCharacterParameters.defence}</p>
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