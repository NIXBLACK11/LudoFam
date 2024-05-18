import { Board, movePiece } from "../components/Board"
import '../App.css';


export const GamePage = () => {
    return (
        <div className="w-screen h-screen flex justify-center items-center">
            <Board />
        </div>
    )
}