import { SquareProps } from "../../../utils/chess";
import Pieces from "./Pieces";

const Square: React.FC<SquareProps> = ({row,col,isLight,squareName,piece,isSelected,isPossibleMove,onSquareClick}) => {
    let backgroundColor = isLight ? 'bg-[hsl(62.14deg,42.42%,87.06%)]' : 'bg-[hsl(90.45deg,29%,45.29%)]'

    if (isSelected){
        backgroundColor = 'bg-yellow-400'
    }
//     } else if (isPossibleMove){
// backgroundColor = isLight ? 'bg-green-200' : 'bg-green-400'
//     }
    return (
        <>
        <div className={`
        w-8 h-8 sm:w-12 sm:h-12 md:w-16 md:h-16
        flex items-center justify-center
        border border-gray-300
        cursor-pointer
        transition-colors duration-200
        ${backgroundColor}
        hover:opacity-80
      `}
      title={squareName}
      onClick={() => onSquareClick(row, col, squareName)}
    >
   <Pieces piece={piece}/>
        </div>
        </>
    )
}
export default Square;