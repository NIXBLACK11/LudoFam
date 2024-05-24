import "../App.css";
import { useRecoilState } from 'recoil';
import Dice from 'react-dice-roll';
import { useEffect } from 'react';
import { COORDINATES_MAP, STEP_LENGTH } from '../constant/constants';
import { codeState, socketState } from '../atoms/atom';
import { GameBoard } from "@repo/common/game";


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
  let dicevalue = 0;
  const [code, _setCode] = useRecoilState(codeState);
  const [socket, _setSocket] = useRecoilState(socketState);
  const game = new GameBoard(code);

  useEffect(() => {
    if (!socket) {
      console.log("yoooo");
      return
    };
    console.log("hello");

    const handleMessage = (event: { data: { toString: () => string; }; }) => {
        try {
            const message = JSON.parse(event.data.toString());
            console.log('Message from server:', message);
            
            
            if (message.type === "move") {
                if (message.completed) {
                  const moves = message.Moves;
                  moves?.map((m: { player: { toString: () => any; }; piece: { toString: () => any; }; nextPos: any; }) => {
                    let move = `p${m.player.toString()}${m.piece.toString()}`;
                    movePiece(move, m.nextPos??0);
                  });
                }
            }
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    };

    socket.onmessage = handleMessage;

    return () => {
        socket.onmessage = null;
    };
  }, [socket]);

  const testMove = (player: number, piece: number, dicevalue: number) => {
    const res = game.makeMove(player, piece, dicevalue);
    console.log(res);
    if(!res?.success) {
      alert(`wrong request`);
      console.log(res);
      return;
    }
    const moves = res?.Moves;
    moves?.map((m: { player: { toString: () => any; }; piece: { toString: () => any; }; nextPos: any; }) => {
      let move = `p${m.player.toString()}${m.piece.toString()}`;
      movePiece(move, m.nextPos??0);
    });
    socket?.send(JSON.stringify(res));
  }

  useEffect(() => {
    setInitialPosition();
  }, []);

  return (
    <div className='w-screen h-screen p-16 flex flex-col'>
      <div className='flex flex-row justify-center bg-grey content-center'>
        <div id="ludo-board" className=" m-6 justify-center bg-grey">
          <img src="ludo-bg.jpg"/>
          <div 
            id="p00"
            className='piece player-one-piece'
            onClick={()=>{
              testMove(0, 0, dicevalue);
            }}
          ></div>
          <div 
            id="p01"
            className='piece player-one-piece'
            onClick={()=>{
              testMove(0, 1, dicevalue);
            }}
          ></div>
          <div 
            id="p02"
            className='piece player-one-piece'
            onClick={()=>{
              testMove(0, 2, dicevalue);
            }}
          ></div>
          <div 
            id="p03"
            className='piece player-one-piece'
            onClick={()=>{
              testMove(0, 3, dicevalue);
            }}
          ></div>

          <div 
            id="p10"
            className='piece player-two-piece'
            onClick={()=>{
              testMove(1, 0, dicevalue);
            }}
          ></div>
          <div 
            id="p11"
            className='piece player-two-piece'
            onClick={()=>{
              testMove(1, 1, dicevalue);
            }}
          ></div>
          <div 
            id="p12"
            className='piece player-two-piece'
            onClick={()=>{
              testMove(1, 2, dicevalue);
            }}
          ></div>
          <div 
            id="p13"
            className='piece player-two-piece'
            onClick={()=>{
              testMove(1, 3, dicevalue);
            }}
          ></div>

          <div 
            id="p20"
            className='piece player-three-piece'
            onClick={()=>{
              testMove(2, 0, dicevalue);
            }}
          ></div>
          <div 
            id="p21"
            className='piece player-three-piece'
            onClick={()=>{
              testMove(2, 1, dicevalue);
            }}
          ></div>
          <div 
            id="p22"
            className='piece player-three-piece'
            onClick={()=>{
              testMove(2, 2, dicevalue);
            }}
          ></div>
          <div 
            id="p23"
            className='piece player-three-piece'
            onClick={()=>{
              testMove(2, 3, dicevalue);
            }}
          ></div>

          <div 
            id="p30"
            className='piece player-four-piece'
            onClick={()=>{
              testMove(3, 0, dicevalue);
            }}
          ></div>
          <div 
            id="p31"
            className='piece player-four-piece'
            onClick={()=>{
              testMove(3, 1, dicevalue);
            }}
          ></div>
          <div 
            id="p32"
            className='piece player-four-piece'
            onClick={()=>{
              testMove(3, 2, dicevalue);
            }}
          ></div>
          <div 
            id="p33"
            className='piece player-four-piece'
            onClick={()=>{
              testMove(3, 3, dicevalue);
            }}
          ></div>
        </div>
      </div>
      <div className="flex flex-row justify-center content-center m-5">
        <Dice size={80} onRoll={(value) => dicevalue=value} />
      </div>
    </div>
  )
}