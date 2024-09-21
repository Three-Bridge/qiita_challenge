import {useNavigate} from 'react-router-dom'

type Props = {
    bgmPlayHandler?: ()=>void
}
export default function StartScreen({bgmPlayHandler}:Props) {
  const navigate = useNavigate()
  return (
    <>
      <div>
          {/*<img/ src={./src/logoPicture/barcode.png}>*/}
        <button onClick={() => {
            // if(bgmPlayHandler) bgmPlayHandler()
            navigate('/auth/login')}}>つづき</button>
        <button> はじめから</button>
      </div>
    </>)
}