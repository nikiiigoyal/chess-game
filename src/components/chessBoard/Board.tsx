/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
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

    // Gamestate to be remembered.
    const [board, setBoard] = useState<PieceType[][]>(initialBoard)
    const [currentPlayer, setCurrentPlayer] = useState<'white' | 'black'>('white')
    const [selectedSqaure, setSelectedSqaure] = useState<{row: number, col: number} | null>(null)

    // check if piece is black or white
    const isPlayersPiece = (piece: PieceType, player: 'white' | 'black'): boolean => {
        if (!piece) return false;
        if (player === 'white') {
            return piece === piece.toUpperCase();
        } else{
            return piece === piece.toLowerCase() && piece !== piece.toUpperCase();
        }
    }

    //  check if square is the selected one
    const isSelectedSquare = (row: number, col: number): boolean => {
        if (!selectedSqaure) return false;
        return selectedSqaure.row === row && selectedSqaure.col === col;
    }

    // switch to next player
    const switchPlayer = (): void => {
        setCurrentPlayer(currentPlayer === 'white'? 'black' : 'white')
    }

    // Function to decide if a square should be light or dark
    const isLightSquare = (row: number, col: number) => {
        // If row + column = even number, it's light
        // If row + column = odd number, it's dark
        return (row + col) % 2 === 0;
    };

    // Function to convert row/col numbers to chess names (like "e4")
    const getSquareName = (row: number, col: number) => {
        const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const numbers = ['8', '7', '6', '5', '4', '3', '2', '1'];
        return letters[col] + numbers[row];
    };

    // Function to check if path is clear (for rook, bishop, queen)
    const isPathClear = (fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
        const rowStep = toRow === fromRow ? 0 : (toRow > fromRow ? 1 : -1);
        const colStep = toCol === fromCol ? 0 : (toCol > fromCol ? 1 : -1);
        
        let currentRow = fromRow + rowStep;
        let currentCol = fromCol + colStep;
        
        // Check each square along the path (excluding the destination)
        while (currentRow !== toRow || currentCol !== toCol) {
            if (board[currentRow][currentCol] !== null) {
                return false; // Path is blocked
            }
            currentRow += rowStep;
            currentCol += colStep;
        }
        
        return true;
    };

    // Function to check if a move is valid for a specific piece
    const isValidMove = (piece: PieceType, fromRow: number, fromCol: number, toRow: number, toCol: number): boolean => {
        if (!piece) return false;
        
        const rowDiff = Math.abs(toRow - fromRow);
        const colDiff = Math.abs(toCol - fromCol);
        const targetPiece = board[toRow][toCol];
        
        // Can't capture your own piece
        if (targetPiece && isPlayersPiece(targetPiece, currentPlayer)) {
            return false;
        }
        
        // Basic move validation for each piece type
        const pieceType = piece.toLowerCase();
        
        switch (pieceType) {
            case 'p': // Pawn
                const isWhitePawn = piece === 'P';
                const direction = isWhitePawn ? -1 : 1; // White moves up (-1), Black moves down (+1)
                const startingRow = isWhitePawn ? 6 : 1;
                
                // Moving forward
                if (fromCol === toCol) {
                    // One square forward
                    if (toRow === fromRow + direction && !targetPiece) {
                        return true;
                    }
                    // Two squares forward from starting position
                    if (fromRow === startingRow && toRow === fromRow + (2 * direction) && !targetPiece) {
                        return true;
                    }
                }
                // Diagonal capture
                else if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && targetPiece) {
                    return true;
                }
                return false;
                
            case 'r': // Rook
                // Moves horizontally or vertically
                if (fromRow === toRow || fromCol === toCol) {
                    return isPathClear(fromRow, fromCol, toRow, toCol);
                }
                return false;
                
            case 'n': // Knight
                // L-shaped moves
                return (rowDiff === 2 && colDiff === 1) || (rowDiff === 1 && colDiff === 2);
                
            case 'b': // Bishop
                // Moves diagonally
                if (rowDiff === colDiff) {
                    return isPathClear(fromRow, fromCol, toRow, toCol);
                }
                return false;
                
            case 'q': // Queen
                // Combines rook and bishop moves
                if (fromRow === toRow || fromCol === toCol || rowDiff === colDiff) {
                    return isPathClear(fromRow, fromCol, toRow, toCol);
                }
                return false;
                
            case 'k': // King
                // Moves one square in any direction
                return rowDiff <= 1 && colDiff <= 1;
                
            default:
                return false;
        }
    };

    const handleSqaureClick = (row: number, col: number, squareName: string): void => {
        console.log(`clicked: ${squareName} ${row}, ${col}`)
        const clickedPiece = board[row][col] // FIXED: Changed from Board to board
        
        // SITUATION A: Nothing is selected yet
        if (selectedSqaure === null) { // FIXED: Changed from setSelectedSqaure to selectedSqaure
            console.log("🤔 No piece selected yet...");
            
            if (clickedPiece && isPlayersPiece(clickedPiece, currentPlayer)) {
                // SELECT THIS PIECE
                setSelectedSqaure({row, col});
                console.log(`✅ SELECTED: ${clickedPiece} at ${squareName}`);
            } else if (clickedPiece) {
                console.log(`❌ WRONG TURN: That piece belongs to ${clickedPiece === clickedPiece.toUpperCase() ? 'white' : 'black'}, but it's ${currentPlayer}'s turn`);
            } else {
                console.log(`❌ EMPTY: No piece to select`);
            }
        } 
        // SITUATION B: A piece is already selected
        else {
            console.log("🎯 A piece is already selected...");
            const selectedPiece = board[selectedSqaure.row][selectedSqaure.col]; // FIXED: Changed from Board to board and setSelectedSqaure to selectedSqaure
            const fromSquare = getSquareName(selectedSqaure.row, selectedSqaure.col); // FIXED: Changed from setSelectedSqaure to selectedSqaure
            
            // Clicking the same square = deselect
            if (selectedSqaure.row === row && selectedSqaure.col === col) { // FIXED: Changed from setSelectedSqaure to selectedSqaure
                setSelectedSqaure(null);
                console.log(`🔄 DESELECTED: ${selectedPiece} at ${squareName}`);
            } 
            // Clicking different square = try to move
            else {
                console.log(`🚀 ATTEMPTING MOVE: ${selectedPiece} from ${fromSquare} to ${squareName}`);

                // VALIDATION ADDED: Check if move is valid before executing
                if (isValidMove(selectedPiece, selectedSqaure.row, selectedSqaure.col, row, col)) {
                    // create new board with piece moved
                    const newBoard = board.map((boardRow: any) => [...boardRow]); // FIXED: Changed from Board to board
                    newBoard[row][col] = selectedPiece;
                    newBoard[selectedSqaure.row][selectedSqaure.col] = null // FIXED: Changed from setSelectedSqaure to selectedSqaure

                    setBoard(newBoard)
                    setSelectedSqaure(null)
                    switchPlayer();

                    console.log(`✅ MOVE COMPLETE: ${selectedPiece} moved from ${fromSquare} to ${squareName}`);
                    console.log(`👤 NOW IT'S ${currentPlayer === 'white' ? 'black' : 'white'}'s TURN`);
                } else {
                    // Invalid move - just deselect
                    console.log(`❌ INVALID MOVE: Move not allowed by chess rules`);
                    setSelectedSqaure(null);
                }
            }
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
                const piece = board[row][col] // FIXED: Changed from Board to board
                const isSquareSelected = isSelectedSquare(row, col)
                
                squares.push(
                    <Square 
                        key={`${row}-${col}`}
                        row={row}
                        col={col}
                        isLight={isLight}
                        squareName={squareName}
                        piece={piece}
                        isSelected={isSquareSelected}
                        onSquareClick={handleSqaureClick} 
                        isPossibleMove={false}          
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
                <div className="mb-4 p-2 rounded-lg text-center">
                    <h2 className="text-xl font-bold mb-2">Chess Game</h2>
                    <p className="text-lg">
                        Current Turn: <span className={`font-bold ${currentPlayer === 'white' ? 'text-blue-600' : 'text-green-600'}`}>
                            {currentPlayer.toUpperCase()}
                        </span>
                    </p>
                    <div className="h-4 mt-1">
                    {selectedSqaure && (
                        <p className="text-sm text-purple-600">
                            Selected: {getSquareName(selectedSqaure.row, selectedSqaure.col)} 
                            ({board[selectedSqaure.row][selectedSqaure.col]})
                        </p>
                    )}
                </div>
                </div>

                {renderBoard()}
                {renderColumnLabels()}
            </div>
        </div>
    );
};

export default Board;