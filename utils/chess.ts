// ===== 1. chess.ts (Types file) =====
export type PieceType = 'K' | 'Q' | 'R' | 'B' | 'N' | 'P' | 'k' | 'q' | 'r' | 'b' | 'n' | 'p' | null;

export interface PiecesProps {
  piece: PieceType;
}

export interface SquareProps {
  row: number;
  col: number;
  isLight: boolean;
  squareName: string;
  piece: PieceType;
  onSquareClick: (row: number, col: number, squareName: string) => void;
}