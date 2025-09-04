import { PieceType } from "../../../utils/chess";
import Square from "./Square";


const Board = () => {

    // initial chessboard
    const initialBoard: PieceType[][] = [
         ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'], // Black back row
    ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'], // Black pawns
    [null, null, null, null, null, null, null, null], // Empty
    [null, null, null, null, null, null, null, null], // Empty
    [null, null, null, null, null, null, null, null], // Empty
    [null, null, null, null, null, null, null, null], // Empty
    ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'], // White pawns
    ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R']  
    ]
  
  // Function to decide if a square should be light or dark
  const isLightSquare = (row :number, col:number) => {
    // If row + column = even number, it's light
    // If row + column = odd number, it's dark
    return (row + col) % 2 === 0;
  };

  // Function to convert row/col numbers to chess names (like "e4")
  const getSquareName = (row:number, col:number) => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return letters[col] + numbers[row];
  };
const handleSqaureClick = (row: number, col:number, squareName: string): void => {
   console.log(`clicked: ${squareName} ${row}, ${col}`)
   const piece = initialBoard[row][col]
   if (piece) {
    console.log(`piece: ${piece}`)
   }
}
  // Create column labels (a-h)
  const renderColumnLabels = () => {
    const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
    return (
      <div className="flex">
        <div className="w-4 sm:w-6 md:w-8"></div> {/* Empty corner */}
        {letters.map((letter) => (
          <div
            key={letter}
            className="w-8 h-4 sm:w-12 sm:h-6 md:w-16 md:h-8 flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold text-gray-700"
          >
            {letter}
          </div>
        ))}
      </div>
    );
  };

  // Create row labels (8-1)
  const renderRowLabel = (rowIndex: number) => {
    const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
    return (
      <div className="w-4 h-8 sm:w-6 sm:h-12 md:w-8 md:h-16 flex items-center justify-center text-xs sm:text-sm md:text-base font-semibold text-gray-700">
        {numbers[rowIndex]}
      </div>
    );
  };


  // Create 8 rows
  const renderBoard = () => {
    const rows = [];
    
    // Loop through 8 rows (0 to 7)
    for (let row = 0; row < 8; row++) {
      const squares = [];
      
      // Loop through 8 columns (0 to 7) 
      for (let col = 0; col < 8; col++) {
        const isLight = isLightSquare(row, col);
        const squareName = getSquareName(row, col);
        const piece = initialBoard[row][col]
        
        squares.push(
          
          <Square 
          key={`${row}-${col}`}
          row={row}
          col={col}
          isLight={isLight}
          squareName={squareName}
          piece={piece}
          onSquareClick={handleSqaureClick}
          />
        );
      }
      
      // Add this row to our rows array
      rows.push(
        <div key={row} className="flex">
            {renderRowLabel(row)}
          {squares}
        </div>
      );
    }
    
    return rows;
  };

  return (
    
      
      <div className="flex justify-center">
        <div className="bg-white p-4 my-5 rounded-lg shadow-lg">
           
          {renderBoard()}
          {renderColumnLabels()}
        </div>
      </div>

     
    
  );
};

export default Board;