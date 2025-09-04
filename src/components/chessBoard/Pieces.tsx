import { PiecesProps, PieceType } from './../../../utils/chess'

const Pieces: React.FC<PiecesProps> = ({ piece }) => { 
  if (!piece) return null;

  // Using Wikimedia Commons images
  const pieceImages: Record<string, string> = {
    K: 'https://upload.wikimedia.org/wikipedia/commons/4/42/Chess_klt45.svg',
    Q: 'https://upload.wikimedia.org/wikipedia/commons/1/15/Chess_qlt45.svg',
    R: 'https://upload.wikimedia.org/wikipedia/commons/7/72/Chess_rlt45.svg',
    B: 'https://upload.wikimedia.org/wikipedia/commons/b/b1/Chess_blt45.svg',
    N: 'https://upload.wikimedia.org/wikipedia/commons/7/70/Chess_nlt45.svg',
    P: 'https://upload.wikimedia.org/wikipedia/commons/4/45/Chess_plt45.svg',
    k: 'https://upload.wikimedia.org/wikipedia/commons/f/f0/Chess_kdt45.svg',
    q: 'https://upload.wikimedia.org/wikipedia/commons/4/47/Chess_qdt45.svg',
    r: 'https://upload.wikimedia.org/wikipedia/commons/f/ff/Chess_rdt45.svg',
    b: 'https://upload.wikimedia.org/wikipedia/commons/9/98/Chess_bdt45.svg',
    n: 'https://upload.wikimedia.org/wikipedia/commons/e/ef/Chess_ndt45.svg',
    p: 'https://upload.wikimedia.org/wikipedia/commons/c/c7/Chess_pdt45.svg',
  };

  return (
    <img
      src={pieceImages[piece]}
      alt={`Chess ${piece}`}
      className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 select-none"
      draggable={false}
    />
  );
};

export default Pieces;