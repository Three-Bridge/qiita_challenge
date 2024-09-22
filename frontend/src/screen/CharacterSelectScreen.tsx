import {useEffect, useState} from 'react'
import {DefaultThreeBridgeRepository} from '../repository/ThreeBridgeRepository.ts'
import {useNavigate} from 'react-router-dom'
import {Authenticator} from '@aws-amplify/ui-react'
import style from './StartScreen.module.scss'

type Props = {
  barcodeData: string | null;
};

export default function CharacterSelectScreen({barcodeData}: Props) {
  const threeBridgeRepository = new DefaultThreeBridgeRepository()
  // 自分のキャラ作製
  const [myCharacterImageUrl, setMyCharacterImageUrl] = useState<string>('')
  const [myCharacterParameters, setMyCharacterParameters] = useState<{
    hp?: number,
    attack?: number,
    defence?: number
  }>({hp: undefined, attack: undefined, defence: undefined})
  const navigate = useNavigate()

  // 敵キャラ作製
  const [enemyCharacterImageUrl, setEnemyCharacterImageUrl] = useState<string>('')
  const [enemyCharacterParameters, setEnemyCharacterParameters] = useState<{
    hp?: number,
    attack?: number,
    defence?: number
  }>({hp: undefined, attack: undefined, defence: undefined})

  const displayCharacter = async (barcodeDate: string | null) => {
    if (barcodeDate) {
      const valueEncodedInBase64 = btoa(barcodeData as string)
      const generatingAlphabetForMyCharacter = valueEncodedInBase64[3]
      const generatingAlphabetForEnemyCharacter = valueEncodedInBase64[7]
      // @ts-ignore
      try {
        const myCharacterImageUrl = await threeBridgeRepository.createCharacter(generatingAlphabetForMyCharacter)
        const EnemyCharacterImageUrl = await threeBridgeRepository.createCharacter(generatingAlphabetForEnemyCharacter)
        setMyCharacterImageUrl(myCharacterImageUrl)
        setEnemyCharacterImageUrl(EnemyCharacterImageUrl)
      } catch (error) {
        console.error('自キャラクター表示中にエラーが発生しました:', error)
      }
      try {
        const EnemyCharacterImageUrl = await threeBridgeRepository.createCharacter(generatingAlphabetForEnemyCharacter)
        setEnemyCharacterImageUrl(EnemyCharacterImageUrl)
      } catch (error) {
        console.error('敵キャラクター表示中にエラーが発生しました:', error)
      }
    }
  }

  // パラメータ関数
  const parameter = (barcodeDataString: string) => {
    const setNumber = Number(barcodeDataString)
    if (setNumber === 0) {
      return Math.floor((Math.random() * 9 + 1) * 100)
    } else {
      return setNumber * 100
    }
  }

  // パラメータセット
  const createCharacterParameters = (barcodeData: string | null) => {
    if (barcodeData) {
      // 自分のキャラパラメータ設定
      const myCharacterHp = parameter(barcodeData[4]) + 3000
      const myCharacterAttack = parameter(barcodeData[5])
      const myCharacterDefence = parameter(barcodeData[6])
      setMyCharacterParameters({hp: myCharacterHp, attack: myCharacterAttack, defence: myCharacterDefence})
      // 敵のキャラパラメータ設定
      const enemyCharacterHp = parameter(barcodeData[8]) + 3000
      const enemyCharacterAttack = parameter(barcodeData[9])
      const enemyCharacterDefence = parameter(barcodeData[10])
      setEnemyCharacterParameters({
        hp: enemyCharacterHp,
        attack: enemyCharacterAttack,
        defence: enemyCharacterDefence
      })
    }
  }

  useEffect(() => {
    createCharacterParameters(barcodeData)
    displayCharacter(barcodeData)
  }, [])

  return (
    <Authenticator
      socialProviders={['google', 'amazon', 'apple', 'facebook']}>
      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}}>
        {myCharacterImageUrl ?
          <div style={{margin: '10px', paddingTop: '40px'}}>
            Generated Character
          </div>
          :
          <div style={{margin: '10px', paddingTop: '40px'}}>
            Generating Character...
          </div>}
        {myCharacterImageUrl ? (
          <>
            <img
              src={myCharacterImageUrl}
              alt={'myCharacterImageUrl'}
              style={{width: '170px', margin: '10px', paddingBottom: '20px'}}
            />
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              padding: '20px',
            }}>
              <p>Character Status</p>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                border: '2px solid lightgray',
                padding: '20px'
              }}>
                <p>{`HP:${myCharacterParameters.hp}`}</p>
                <p>{`Attack:${myCharacterParameters.attack}`}</p>
                <p>{`Defence:${myCharacterParameters.defence}`}</p>
              </div>
            </div>
          </>
        ) : (
          <div style={spinnerContainerStyle}>
            <div className={style.loader}></div>
          </div>
        )}

        <button onClick={() => {
          navigate('/auth/battle', {
            state: {
              myCharacterParameters: {
                image: myCharacterImageUrl,
                hp: myCharacterParameters.hp,
                attack: myCharacterParameters.attack,
                defence: myCharacterParameters.defence
              },
              enemyCharacterParameters: {
                image: enemyCharacterImageUrl,
                hp: enemyCharacterParameters.hp,
                attack: enemyCharacterParameters.attack,
                defence: enemyCharacterParameters.defence
              }
            }
          })
        }}>
          Let's Fight!
        </button>
      </div>

    </Authenticator>
  )
}

const spinnerContainerStyle = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100vh', // コンテナを画面全体に広げる例
}