export async function movePiece(socket: WebSocket, player: number, piece: number, diceValue: number, gameCode: string){
    try {
        socket.send(JSON.stringify({
            type: "move",
            gameCode: gameCode,
            move: {
                player: player,
                piece: piece,
                diceValue: diceValue
            }
        }))
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}