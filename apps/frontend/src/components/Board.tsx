import { COORDINATES_MAP, STEP_LENGTH } from '../constant/constants';
const [move, setMove] = useRecoilState(moveState);
import { useEffect } from 'react';
import "../App.css";
import { useRecoilState } from 'recoil';
import { moveState } from '../atoms/atom';


export function movePiece(pieceId: string, coordinateIndex: number): void {
  const pieceElement = document.getElementById(pieceId);
  if (pieceElement) {
    const currentCoordinate = COORDINATES_MAP[coordinateIndex] ?? [0, 0];
    pieceElement.style.top = `${currentCoordinate[1] * STEP_LENGTH}%`;
    pieceElement.style.left = `${currentCoordinate[0] * STEP_LENGTH}%`;
  } else {
    console.error(`Element with id ${pieceId} not found`);
  }
}

function setInitialPosition(): void {
  const COORDINATE_OFFSETS: { [key: number]: number } = {
    0: 100,
    1: 200,
    2: 300,
    3: 400,
  };

  for (let player = 0; player < 4; player++) {
    for (let piece = 0; piece < 4; piece++) {
      const pieceId = `p${player}${piece}`;
      const CoordOff = COORDINATE_OFFSETS[player] ?? 0;
      const coordinateIndex = CoordOff + piece;
      const pieceElement = document.getElementById(pieceId);
      if (pieceElement) {
        const currentCoordinate = COORDINATES_MAP[coordinateIndex] ?? [0, 0];
        pieceElement.style.top = `${currentCoordinate[1] * STEP_LENGTH}%`;
        pieceElement.style.left = `${currentCoordinate[0] * STEP_LENGTH}%`;
        pieceElement.style.display = "block";
      } else {
        console.error(`Element with id ${pieceId} not found`);
      }
    }
  }
}

export const Board = () => {
  const dicevalue: number = 0;
  useEffect(() => {
    setInitialPosition();
  }, []);

  return (
    <div className='w-screen h-screen p-16'>
      <div className='flex justify-center bg-grey content-center'>
        <div id="ludo-board" className=" m-6 justify-center bg-grey">
          <img src="ludo-bg.jpg"/>
          <div 
            id="p00"
            className='piece player-one-piece'
            onClick={()=>{
              setMove([0, 0, dicevalue]);
            }}
          ></div>
          <div 
            id="p01"
            className='piece player-one-piece'
            onClick={()=>{
              setMove([0, 1, dicevalue]);
            }}
          ></div>
          <div 
            id="p02"
            className='piece player-one-piece'
            onClick={()=>{
              setMove([0, 2, dicevalue]);
            }}
          ></div>
          <div 
            id="p03"
            className='piece player-one-piece'
            onClick={()=>{
              setMove([0, 3, dicevalue]);
            }}
          ></div>

          <div 
            id="p10"
            className='piece player-two-piece'
            onClick={()=>{
              setMove([1, 0, dicevalue]);
            }}
          ></div>
          <div 
            id="p11"
            className='piece player-two-piece'
            onClick={()=>{
              setMove([1, 1, dicevalue]);
            }}
          ></div>
          <div 
            id="p12"
            className='piece player-two-piece'
            onClick={()=>{
              setMove([1, 2, dicevalue]);
            }}
          ></div>
          <div 
            id="p13"
            className='piece player-two-piece'
            onClick={()=>{
              setMove([1, 3, dicevalue]);
            }}
          ></div>

          <div 
            id="p20"
            className='piece player-three-piece'
            onClick={()=>{
              setMove([2, 0, dicevalue]);
            }}
          ></div>
          <div 
            id="p21"
            className='piece player-three-piece'
            onClick={()=>{
              setMove([2, 1, dicevalue]);
            }}
          ></div>
          <div 
            id="p22"
            className='piece player-three-piece'
            onClick={()=>{
              setMove([2, 2, dicevalue]);
            }}
          ></div>
          <div 
            id="p23"
            className='piece player-three-piece'
            onClick={()=>{
              setMove([2, 3, dicevalue]);
            }}
          ></div>

          <div 
            id="p30"
            className='piece player-four-piece'
            onClick={()=>{
              setMove([3, 0, dicevalue]);
            }}
          ></div>
          <div 
            id="p31"
            className='piece player-four-piece'
            onClick={()=>{
              setMove([3, 1, dicevalue]);
            }}
          ></div>
          <div 
            id="p32"
            className='piece player-four-piece'
            onClick={()=>{
              setMove([3, 2, dicevalue]);
            }}
          ></div>
          <div 
            id="p33"
            className='piece player-four-piece'
            onClick={()=>{
              setMove([3, 3, dicevalue]);
            }}
          ></div>
        </div>
      </div>
    </div>
  )
}