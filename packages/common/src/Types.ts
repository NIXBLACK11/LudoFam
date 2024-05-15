export const name = "test@123";
export type Player = string;

export type Move = {
  player: number;
  piece: number;
  entry: boolean;
  nextPos: number | undefined;
};

export type Result = {
  success: boolean;
  Moves: Move[];
}
