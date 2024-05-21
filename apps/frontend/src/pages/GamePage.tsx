import React, { useEffect } from "react";
import '../App.css';
import { Board, movePiece } from "../components/Board";
import { Popup } from '@repo/ui/Popup';
import { useRecoilState } from "recoil";
import { codeState, colorState, gameState, moveState, socketState } from "../atoms/atom";

export const GamePage = () => {
    const [socket, _setSocket] = useRecoilState(socketState);
    const [code, setCode] = useRecoilState(codeState);
    const [move, setMove] = useRecoilState(moveState);
    const [color, _setColor] = useRecoilState(colorState);
    const [game, _setGame] = useRecoilState(gameState);
    
    useEffect(() => {
        if (!socket) return;

        const handleMessage = (event: { data: { toString: () => string; }; }) => {
            try {
                const message = JSON.parse(event.data.toString());
                console.log('Message from server:', message);
                
                

                // game?.makeMove()

                if (message.type === "move") {
                    if (message.completed) {
                        // Handle completed move logic
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

    return (
        <div className="w-screen h-screen flex justify-center items-center">
            {color !== 'black' && <Popup color={color} />}
            <Board />
        </div>
    );
};
