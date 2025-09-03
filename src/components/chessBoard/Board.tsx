const Board = () => {
  
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
        
        squares.push(
          <div
            key={`${row}-${col}`}
            className={`
              w-16 h-16 
              flex items-center justify-center
              border border-gray-300
              cursor-pointer
            ${isLight ? 'bg-[hsl(62.14deg,42.42%,87.06%)]' : 'bg-[hsl(90.45deg,29%,45.29%)]'}
              hover:opacity-80
            `}
            title={squareName}
          >
            {/* Empty for now - we'll add pieces later */}
          </div>
        );
      }
      
      // Add this row to our rows array
      rows.push(
        <div key={row} className="flex">
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
        </div>
      </div>

     
    
  );
};

export default Board;