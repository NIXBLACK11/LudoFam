import { WebSocket } from "ws";
import { GameBoard } from "@repo/common/game"; 
import { INIT_GAME, MOVE } from "./types";

interface GameCollection {
    [key: string]: WebSocket[];
}

export class GameManager {
    private games: GameBoard[];
    private gamesPlayers: GameCollection = {};

    constructor() {
        this.games = [];
        this.gamesPlayers = {};
    }

    handleMessages(socket: WebSocket) {
        socket.on("message", (data) => {
            const message = JSON.parse(data.toString());

            if(message.type === INIT_GAME) {
                const gameCode: string = message.gameCode;
                if (!this.gamesPlayers[gameCode]) {
                    this.gamesPlayers[gameCode] = [];
                }
                this.gamesPlayers[gameCode]?.push(socket);
                const noOfPlayers = this.gamesPlayers[gameCode]?.length;

                if(noOfPlayers === 4) {
                    const gamePlayers = this.gamesPlayers[gameCode] || [];
                    const game = new GameBoard(gamePlayers, gameCode);
                    this.games.push(game);
                }
            }
            
            if(message.type === MOVE) {
                const move = message.move;
                // this.games.map((game) => {
                //     console.log(game.playerNames);
                // });
                const game = this.games.find((game) => 
                    game.playerNames[0] === socket || 
                    game.playerNames[1] === socket ||
                    game.playerNames[2] === socket ||
                    game.playerNames[3] === socket
                );
                const board: string[][] = game?.getBoard() || [];
                const res = game?.makeMove(move.player, move.piece, move.diceValue);
                game?.playerNames[0]?.send(JSON.stringify(res));
                game?.playerNames[1]?.send(JSON.stringify(res));
                game?.playerNames[2]?.send(JSON.stringify(res));
                game?.playerNames[3]?.send(JSON.stringify(res));
            }
        })
    }
    
    removeUser(socket: WebSocket) {
        const game = this.games.find((game) => 
            game.playerNames[0] === socket || 
            game.playerNames[1] === socket ||
            game.playerNames[2] === socket ||
            game.playerNames[3] === socket
        );
        if(game == undefined) {}
        else {
            const gameCode = game.gameCode;
            this.gamesPlayers[gameCode]?.filter(gamePlayer => {
                gamePlayer!=socket;
            });
        }
    }
}