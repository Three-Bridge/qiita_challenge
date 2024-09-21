import React, {useState, useEffect, MouseEvent, SetStateAction, useRef} from 'react';
import styled from 'styled-components';

// スライダーのスタイルを定義
export const Range = styled.input.attrs({
  type: 'range',
  step: 'any',
})<{
  value: number;
  max: number;
  min: number ;
  width: string;
  color : string;
  barBackgroundColor:string;
}>`
    width: 100%; //バー全体の幅
    height: 20px;
    background: ${props => props.barBackgroundColor};
    outline: none;
    pointer-events: none; // スライダー本体はイベントを受け取らない
    -webkit-appearance: none;
    appearance: none;
    margin: 0;
  z-index: 0;

    &::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: ${props => props.width};//つまみ部分の幅 
        height: 20px;
        background-color: ${props => props.color};
      cursor: pointer;
        pointer-events: auto; // つまみ部分のみイベントを受け取る
        position: relative;
        z-index: 1; // つまみが他の要素の上に来るように
    }
`;
type Props={
  // onClickAttack:()=> void,
  // ref:React.MutableRefObject<HTMLElement | null>;
  isMoving:boolean,
  setIsMoving:React.Dispatch<SetStateAction<boolean>>;
  setTapPoints:React.Dispatch<SetStateAction<number>>;
}
export const AutoSlider = ({isMoving,setIsMoving,setTapPoints}:Props) => {
// const AutoSlider = () => {
  const [value, setValue] = useState(50); // 初期値は50
  // const [isMoving, setIsMoving] = useState(true); // スライダーの動作状態を管理
  const [direction, setDirection] = useState(1); // スライダーの動く方向（1: 右、-1: 左）
  const min = 0;
  const max = 100;
  const barStyleColor="green"
  const barWidth="5px"
  const movingSpeed =25;
  const slideRef = useRef(null);

  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;

    if (isMoving) {
      interval = setInterval(() => {
        setValue((prevValue) => {
          if (prevValue >= max) {
            setDirection(-1); // 左へ移動
            return prevValue - 1; // 折り返し時も少し戻る
          } else if (prevValue <= min) {
            setDirection(1); // 右へ移動
            return prevValue + 1; // 折り返し時も少し進む
          }
          return prevValue + direction; // 通常時は方向に応じて動かす
        });
      }, movingSpeed);
    }
    setTapPoints(Number((slideRef.current! as HTMLInputElement).value))

    return () => {
      if (interval) clearInterval(interval); // コンポーネントがアンマウントされるときにintervalをクリア
    };
  }, [isMoving, direction]); // isMovingやdirectionが変更されるたびに動作を再設定

  const handleMouseDown = (e: MouseEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    // つまみ部分がクリックされた場合のみ動作を停止・再開
    if (e.clientX >= target.getBoundingClientRect().left &&
      e.clientX <= target.getBoundingClientRect().right )
    {
    console.log("X",e.clientX);
      setIsMoving(!isMoving); // つまみ部分をクリックした場合、動作を停止・再開
    }
  };

  return (
    <div>
      <Range
          ref={slideRef}
        value={value}
        min={min}
        max={max}
          color={barStyleColor}
          barBackgroundColor="#ddd"
        width={barWidth}
        onPointerDown={handleMouseDown} // つまみをクリックすると動作を停止
        // onMouseDown={handleMouseDown} // つまみをクリックすると動作を停止
        // onTouchStart={handleMouseDown} // タッチデバイスでのクリックイベント
      />
    </div>
  );
};

// export default AutoSlider;
