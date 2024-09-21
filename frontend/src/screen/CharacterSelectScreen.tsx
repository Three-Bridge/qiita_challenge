import {useEffect, useState} from "react";
import {DefaultThreeBridgeRepository} from "../repository/ThreeBridgeRepository.ts";
import {useLocation, useNavigate} from "react-router-dom";

type Props = {
    barcodeData: string | null;
};

export default function CharacterSelectScreen({barcodeData}: Props) {
    const threeBridgeRepository = new DefaultThreeBridgeRepository();
    // 自分のキャラ作製
    const [myCharacterimageUrl, setMyCharacterimageUrl] = useState<string>('')
    const [myCharacterParameters, setMyCharacterParameters] = useState<{
        hp: string | number,
        attack: string | number,
        defence: string | number
    }>({hp: '', attack: '', defence: ''})
    const navigate = useNavigate()
const location = useLocation()

    // 敵キャラ作製
    const [enemyCharacterimageUrl, setEnemyCharacterimageUrl] = useState<string>('')
    const [enemyCharacterParameters, setEnemyCharacterParameters] = useState<{
        hp: string | number,
        attack: string | number,
        defence: string | number
    }>({hp: '', attack: '', defence: ''})

    // パラメータ関数
    const paramerter = (barcodeDateString: string) =>{

        if (barcodeDateString === "0") {
            return (Math.floor((Math.random() * 9 + 1) * 100)).toString()
        } else {
            return (Number(barcodeDateString) * 100).toString()
        }
    }

    const displayCharacter = async (barcodeDate: string | null) => {
        if (barcodeDate) {
            const valueEncodedInBase64 = btoa(barcodeData as string)
            const generatingAlphabetForMyCharacter = valueEncodedInBase64[3]
            const generatingAlphabetForEnemyCharacter = valueEncodedInBase64[7]
            // @ts-ignore
            try {
                const myCharacterImageUrl = await threeBridgeRepository.createCharacter(generatingAlphabetForMyCharacter)
                const EnemyCharacterImageUrl = await threeBridgeRepository.createCharacter(generatingAlphabetForEnemyCharacter)
                setMyCharacterimageUrl(myCharacterImageUrl)
                setEnemyCharacterimageUrl(EnemyCharacterImageUrl)
            } catch (error) {
                console.error("自キャラクター表示中にエラーが発生しました:", error);
            }
            try {
                const EnemyCharacterImageUrl = await threeBridgeRepository.createCharacter(generatingAlphabetForEnemyCharacter)
                setEnemyCharacterimageUrl(EnemyCharacterImageUrl)
            } catch (error) {
                console.error("敵キャラクター表示中にエラーが発生しました:", error);
            }

        }
    }

    const createCharacterParameters = (barcodeDate: string | null) => {
        if(barcodeDate){
        // 自分のキャラパラメータ設定
        const myCharacterHp = paramerter(barcodeDate[4])
        const myCharacterAttack = paramerter(barcodeDate[5])
        const myCharacterDefence = paramerter(barcodeDate[6])
        setMyCharacterParameters({hp: myCharacterHp, attack: myCharacterAttack, defence: myCharacterDefence})
        // 敵のキャラパラメータ設定
        const enemyCharacterHp = paramerter(barcodeDate[8])
        const enemyCharacterAttack = paramerter(barcodeDate[9])
        const enemyCharacterDefence = paramerter(barcodeDate[10])
        setEnemyCharacterParameters({hp: enemyCharacterHp, attack: enemyCharacterAttack, defence: enemyCharacterDefence})
        }
    }

    useEffect(() => {
        console.log(location)
        createCharacterParameters(barcodeData)
        displayCharacter(barcodeData)
    }, [])

    return (
        <>
            <p className={character}>Character Select</p>
            <span>{barcodeData}</span>
            <iframe src={myCharacterimageUrl} width={'512px'} height={'512px'}/>
            <p>{`HP:${myCharacterParameters.hp}`}</p>
            <p>{`ATTACK:${myCharacterParameters.attack}`}</p>
            <p>{`Defense:${myCharacterParameters.defence}`}</p>
            <button onClick={() => navigate("/battle", {
                state: {
                    myCharacterParameters: {
                        image: myCharacterimageUrl,
                        hp: myCharacterParameters.hp,
                        attack: myCharacterParameters.attack,
                        defence: myCharacterParameters.defence
                    },
                    enemyCharacterParameters:{
                        image: enemyCharacterimageUrl,
                        hp: enemyCharacterParameters.hp,
                        attack: enemyCharacterParameters.attack,
                        defence: enemyCharacterParameters.defence
                    }
                }
            })}>たたかう</button>
        </>
    );
}
