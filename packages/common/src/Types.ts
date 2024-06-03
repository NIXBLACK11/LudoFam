export const name = "test@123";
export type Player = string;

export type Move = {
  player: number;
  piece: number;
  entry: boolean;
  nextPos: number | undefined;
};

export type Result = {
  player: number,
  diceValue: number,
  type: string;
  success: boolean;
  completed: boolean;
  Moves: Move[];
}
