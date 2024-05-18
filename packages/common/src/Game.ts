import { Result, Move } from '@repo/common/config';
import { WebSocket } from 'ws';

export class GameBoard {
    public gameCode: string;
    private players: number[][];
    private playersPosEnt: number[][];
    private totalCompleted: number;
    private playersMoved: number[][];
    private playersCompleted: boolean[][];
    public playerNames: WebSocket[];
    private entry: number[][][];
    private exitPoints: number[];
    private startPoints: number[];
    private board: string[][];

    constructor(playerNames: WebSocket[], gameCode: string) {
        this.gameCode = gameCode;
        this.playerNames = playerNames;
        this.playersCompleted = [
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false],
            [false, false, false, false]
        ]
        this.playersPosEnt = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1]
        ]
        this.players = [
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1],
            [-1, -1, -1, -1]
        ];
        this.playersMoved = [
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.totalCompleted = 0;
        this.board = [];
        for (let i = 0; i < 52; i++) {
            this.board.push([]);
        }
        this.entry = [];
        for (let i = 0; i < 6; i++) {
            const innerArray = [];
            for (let j = 0; j < 4; j++) {
                innerArray.push(new Array(4).fill(0));
            }
            this.entry.push(innerArray);
        }
        this.exitPoints = [50, 11, 24, 37];
        this.startPoints = [0, 13, 26, 39];

        this.playerNames[0]?.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "red"
            }
        }))
        this.playerNames[1]?.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "yellow"
            }
        }))
        this.playerNames[2]?.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "green"
            }
        }))
        this.playerNames[3]?.send(JSON.stringify({
            type: "init_game",
            payload: {
                color: "blue"
            }
        }))
    }
    
    public getBoard(): string[][] {
        return this.board;
    }

    public getPlayers(): number[][] {
        return this.players;
    }

    public getPlayersMoved(): number[][] {
        return this.playersMoved;
    }

    public getSocketName(this: any, player: number): WebSocket {
        return this.playerNames[player];
    }

    public makeMove(this: any, player: number, piece: number, diceValue: number): Result {
        if(this.totalCompleted===4) {
            return { success: false, completed: true, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
        }

        if (diceValue > 6) {
            return { success: false, completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
        }
      
        if (piece > 3 || player > 3 || piece < 0 || player < 0) {
            return { success: false, completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
        }
      
        if (!this.players || !this.startPoints || !this.exitPoints) {
            // Check if necessary properties are defined
            return { success: false, completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
        }

        // Condition when player's selected piece is in home and diceValue is 6
        if (this.players[player][piece] === -1 && diceValue===6) {
            this.players[player][piece] = this.startPoints[player];
            this.board[this.startPoints[player]].push(`${player}, ${piece}`);
            return { success: true, completed: false, Moves: [{ player: player, piece: piece, entry: false, nextPos: this.startPoints[player] || 0 }]};
        }
      
        // Condition when player's piece is not in home
        if (this.players[player][piece] !== -1) {
            // store current moved
            this.playersMoved[player][piece] = this.playersMoved[player][piece]+diceValue;

            // logic to calculate the next position
            let nextPos: number = 0;
            if(this.players[player][piece] + diceValue > 51 && this.playersMoved[player][piece]<=50) {
                nextPos = (this.players[player][piece] || 0) + diceValue - 52;
            } else {
                nextPos = (this.players[player][piece] || 0) + diceValue;
            }
            
            // Remove player from old position
            this.board[this.players[player][piece]] = this.board[this.players[player][piece]].filter((s: string) => s !== `${player}, ${piece}`);

            // Condition if the player's selected piece can enter the entry
            if (this.playersMoved[player][piece]>50) {
                nextPos = nextPos - (this.exitPoints[player] || 0);
                if(this.players[player][piece]===0) {
                    if(nextPos<6) {
                        this.entry[player][this.playersPosEnt[player][piece]] = 
                            this.entry[player][this.playersPosEnt[player][piece]].filter((s: string) => {
                                s!=`${player},${piece}`;
                            });
                        this.playerMoved[player][piece]+=diceValue;
                        this.playersPosEnt[player][piece] = nextPos-1;
                        this.entry[player][nextPos-1].push(`${player}, ${piece}`);
                        return { success: true, completed: false, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos }]};
                    } else if(nextPos>6) {
                        return { success: false, completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
                    } else {
                        this.entry[player][this.playersPosEnt[player][piece]] = 
                            this.entry[player][this.playersPosEnt[player][piece]].filter((s: string) => {
                                s!=`${player},${piece}`;
                            });
                        this.playerMoved[player][piece]+=diceValue;
                        this.playersPosEnt[player][piece] = nextPos-1;
                        this.entry[player][nextPos-1].push(`${player}, ${piece}`);
                        this.playersCompleted[player][piece] = true;
                        this.totalCompleted++;
                        if(this.totalCompleted===4) {
                            return { success: true, completed: true, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos }]};
                        } else {
                            return { success: true, completed: false, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos }]};
                        }    
                    }
                } else {
                    this.players[player][piece]=0;
                    this.entry[player][nextPos-1].push(`${player}, ${piece}`);
                    return { success: true, completed: false, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos }]};
                }
            }

            // cutting logic
            let toCut: string[] = [];
            let Moves: Move[] = [];

            // save all those diff palyer pieces
            this.board[nextPos].forEach((s: string) => {
                if(s.split(',')[0] !== `${player}`) {
                    toCut.push(s);
                }
            });

            // remove all those diff player pieces
            this.board[nextPos] = this.board[nextPos].filter((s: string) => {
                s.split(",")[0]==player.toString()
            });

            toCut.forEach((s: string) => {
                let playerToCut = Number(s.split(",")[0]);
                let pieceToCut = Number(s.split(",")[1]);
                Moves.push({player: playerToCut, piece: pieceToCut, entry: false, nextPos: -1});
                this.players[playerToCut][pieceToCut] = -1;
            })

            this.board[nextPos].push(`${player}, ${piece}`);
            this.players[player][piece] = nextPos;

            Moves.push({player: player, piece: piece, entry: false, nextPos: nextPos});
            return { success: true, completed: false, Moves: Moves};
        }
        return { success: false, completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
      }     
}