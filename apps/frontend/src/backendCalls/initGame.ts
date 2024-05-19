export async function initGame(socket: WebSocket, gameCode: string){
    try {
        socket.send(JSON.stringify({
            type: "init_game",
            gameCode: gameCode
        }))
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}