import { Result, Move } from '@repo/common/config';

export class GameBoard {
    public gameCode: string;
    public players: number[][];
    public playersPosEnt: number[][];
    public totalCompleted: number;
    public playersMoved: number[][];
    public playersCompleted: boolean[][];
    public entry: number[][][];
    public exitPoints: number[];
    public startPoints: number[];
    public board: string[][];

    constructor(gameCode: string) {
        this.gameCode = gameCode;
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
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ];
        this.totalCompleted = 0;
        this.board = [];
        for (let i = 0; i < 52; i++) {
            this.board.push([]);
        }
        this.entry = [];
        for (let i = 0; i < 4; i++) {
            let innerArray = [];
            for (let j = 0; j < 6; j++) {
                innerArray.push(new Array(4).fill(0));
            }
            this.entry.push(innerArray);
        }
        this.exitPoints = [50, 11, 24, 37];
        this.startPoints = [0, 13, 26, 39];
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

    // public makeMove = (player: number, piece: number, diceValue: number): Result => {
    public makeMove(this: any, player: number, piece: number, diceValue: number): Result {
        try {
            console.log(`makeMove called with player: ${player}, piece: ${piece}, diceValue: ${diceValue}`);

            if(this.totalCompleted===4) {
                console.log(1);
                return { player: player, diceValue: diceValue, success: false, type: "move", completed: true, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
            }

            if (diceValue > 6 || diceValue < 1) {
                console.log(2);
                return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
            }
        
            if (piece > 3 || player > 3 || piece < 0 || player < 0) {
                console.log(3);
                return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
            }
        
            if (!this.players || !this.startPoints || !this.exitPoints) {
                // Check if necessary properties are defined
                console.log(4);
                return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
            }

            // Condition when player's selected piece is in home and diceValue is 6
            if (this.players[player][piece] === -1 && diceValue===6) {
                this.players[player][piece] = this.startPoints[player];
                this.board[this?.startPoints[player]].push(`${player}, ${piece}`);
                console.log(5);
                return { player: player, diceValue: diceValue, success: true, type: "move", completed: false, Moves: [{ player: player, piece: piece, entry: false, nextPos: this.startPoints[player] || 0 }]};
            }
        
            // Condition when player's piece is not in home
            if (this.players[player][piece] !== -1) {

                console.log("here");
                // store current moved
                if(this.playersMoved[player][piece]+diceValue>56) {
                    console.log("error", this.playersMoved[player][piece]+diceValue);
                    console.log(6);
                    return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{player: player, piece: piece, entry: true, nextPos: 0 }]};
                }
                this.playersMoved[player][piece] = this.playersMoved[player][piece]+diceValue;
                console.log("error", this.playersMoved[player][piece]);

                // logic to calculate the next position
                let nextPos: number = 0;
                if(this.playersMoved[player][piece]<=50) {
                    nextPos = (this.players[player][piece] || 0) + diceValue;
                } else {
                    nextPos = this.playersMoved[player][piece] - 50;
                }
                
                // Condition if the player's selected piece can enter the entry
                if (this.playersMoved[player][piece]>50) {
                    if(this.players[player][piece]===0) {
                        if(nextPos<6) {
                            this.entry[player][this.playersPosEnt[player][piece]] = 
                                this.entry[player][this.playersPosEnt[player][piece]].filter((s: string) => {
                                    s!=`${player},${piece}`;
                                });
                            this.playersPosEnt[player][piece] = nextPos-1;
                            console.log("nextpos<6", nextPos-1);
                            this.entry[player][nextPos-1].push(`${player}, ${piece}`);
                            console.log(7);
                            return { player: player, diceValue: diceValue, success: true, type: "move", completed: false, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos-1 }]};
                        } else if(nextPos>6) {
                            console.log("nextpos>6", nextPos-1);
                            console.log(8);
                            return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
                        } else {
                            console.log("nextpos==6", nextPos-1);
                            this.entry[player][this.playersPosEnt[player][piece]] = 
                            this.entry[player][this.playersPosEnt[player][piece]].filter((s: string) => {
                                s!=`${player},${piece}`;
                            });
                            this.playersPosEnt[player][piece] = nextPos-1;
                            this.entry[player][nextPos-1].push(`${player}, ${piece}`);
                            this.playersCompleted[player][piece] = true;
                            this.totalCompleted++;
                            if(this.totalCompleted===4) {
                                console.log(9);
                                return { player: player, diceValue: diceValue, success: true, type: "move", completed: true, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos }]};
                            } else {
                                console.log(10);
                                return { player: player, diceValue: diceValue, success: true, type: "move", completed: false, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos }]};
                            }    
                        }
                    } else {
                        this.players[player][piece]=0;
                        this.entry[player][nextPos-1].push(`${player}, ${piece}`);
                        this.playersPosEnt[player][piece] = nextPos-1;
                        console.log(11);
                        return { player: player, diceValue: diceValue, success: true, type: "move", completed: false, Moves: [{ player: player, piece: piece, entry: true, nextPos: nextPos-1 }]};
                    }
                }
                // Remove player from old position
                this.board[this.players[player][piece]] = this.board[this.players[player][piece]].filter((s: string) => s !== `${player}, ${piece}`);
                
                // cutting logic
                let toCut: string[] = [];
                let Moves: Move[] = [];

                // save all those diff palyer pieces
                this.board[nextPos].forEach((s: string) => {
                    if(s.split(',')[0] !== `${player}`) {
                        toCut.push(s);
                        this.playersMoved[parseInt(s.split(',')[0] ?? "")][s.split(',')[1] ?? ""] = -1;
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
                console.log(12);
                return { player: player, diceValue: diceValue, success: true, type: "move", completed: false, Moves: Moves};
            }
        } catch (e: any) {
            console.log(`${e}13`);
            return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
        }
        console.log(14);
        return { player: player, diceValue: diceValue, success: false, type: "move", completed: false, Moves: [{ player: 0, piece: 0, entry: false, nextPos: 0 }] };
      }     
}