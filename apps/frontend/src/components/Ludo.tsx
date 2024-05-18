import { COORDINATES_MAP, STEP_LENGTH } from '../constant/constants';
import { useState } from 'react';


function movePiece(pieceId: string, coordinateIndex: number): void {
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
    1: 100,
    2: 200,
    3: 300,
    4: 400,
  };

  for (let player = 1; player <= 4; player++) {
    for (let piece = 1; piece <= 4; piece++) {
      const pieceId = `p${player}${piece}`;
      const CoordOff = COORDINATE_OFFSETS[player] ?? 0;
      const coordinateIndex = CoordOff + piece - 1;
      const pieceElement = document.getElementById(pieceId);
      if (pieceElement) {
        const currentCoordinate = COORDINATES_MAP[coordinateIndex] ?? [0, 0];
        pieceElement.style.top = `${currentCoordinate[1] * STEP_LENGTH}%`;
        pieceElement.style.left = `${currentCoordinate[0] * STEP_LENGTH}%`;
      } else {
        console.error(`Element with id ${pieceId} not found`);
      }
    }
  }
}

function Ludo() {
  const [pieceId, setPieceId] = useState("");
  const [coordinateIndex, setCoordinateIndex] = useState("");
  const handleSubmit = (event: { preventDefault: () => void; }) => {
    event.preventDefault();
    var coordinateIndexInt = parseInt(coordinateIndex, 10);
    movePiece(pieceId, coordinateIndexInt);
  };
  return (
    <>
      <div className='flex m-6 justify-center bg-grey'>
        <div id="ludo-board" className=" m-6 justify-center bg-grey">
          <img src="ludo-bg.jpg" />
          <div id="p11" className='piece player-one-piece'></div>
          <div id="p12" className='piece player-one-piece'></div>
          <div id="p13" className='piece player-one-piece'></div>
          <div id="p14" className='piece player-one-piece'></div>

          <div id="p21" className='piece player-two-piece'></div>
          <div id="p22" className='piece player-two-piece'></div>
          <div id="p23" className='piece player-two-piece'></div>
          <div id="p24" className='piece player-two-piece'></div>

          <div id="p31" className='piece player-three-piece'></div>
          <div id="p32" className='piece player-three-piece'></div>
          <div id="p33" className='piece player-three-piece'></div>
          <div id="p34" className='piece player-three-piece'></div>

          <div id="p41" className='piece player-four-piece'></div>
          <div id="p42" className='piece player-four-piece'></div>
          <div id="p43" className='piece player-four-piece'></div>
          <div id="p44" className='piece player-four-piece'></div>
        </div>
        <button onClick={setInitialPosition} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Start</button>
      </div>
      <form id="piece-position-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="piece-id">Piece ID:</label>
          <input
            type="text"
            id="piece-id"
            name="pieceId"
            value={pieceId}
            onChange={(e) => setPieceId(e.target.value)}
            required
          />
        </div>
        <div className="form-group" >
          <label htmlFor="coordinate-index">Coordinate Index:</label>
          <input
            type="number"
            id="coordinate-index"
            name="coordinateIndex"
            value={coordinateIndex}
            onChange={(e) => setCoordinateIndex(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Submit</button>
        </div>
      </form>
    </>
  )
}

export default Ludo;
