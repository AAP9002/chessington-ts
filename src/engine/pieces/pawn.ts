import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';

export default class Pawn extends Piece {

    canEnPassant: boolean = false

    public constructor(player: Player) {
        super(player);
    }


    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        const isWhite = this.player === Player.WHITE

        // Moving forward
        const direction = isWhite ? [1, 0] : [-1, 0]
        const startRow = isWhite ? 1 : 6
        let maxStep = row === startRow ? 2 : 1

        let currentRow = row + direction[0];
        let currentCol = col + direction[1];

        while (
            !(currentRow < 0 || currentRow > 7 || currentCol < 0 || currentCol > 7) &&
            maxStep > 0
        ) {
            const square = Square.at(currentRow, currentCol)
            if (board.getPiece(square) !== undefined) break

            moves.push(square)
            currentRow += direction[0];
            currentCol += direction[1];
            maxStep--;
        }

        // Check diagonal left
        currentRow = row + direction[0];
        currentCol = col - 1;
        if (currentRow >= 0 && currentRow <= 7 && currentCol >= 0 && currentCol <= 7) {
            const currentSquareLeft = Square.at(currentRow, currentCol)
            const pieceOnSquareLeft = board.getPiece(currentSquareLeft)
            if (pieceOnSquareLeft !== undefined) {
                if (
                    pieceOnSquareLeft.player !== this.player &&
                    !(pieceOnSquareLeft instanceof King)
                ) { moves.push(currentSquareLeft) }
            }
        }

        // Check diagonal right
        currentRow = row + direction[0];
        currentCol = col + 1;
        if (currentRow >= 0 && currentRow <= 7 && currentCol >= 0 && currentCol <= 7) {
            const currentSquareRight = Square.at(currentRow, currentCol)
            const pieceOnSquareRight = board.getPiece(currentSquareRight)
            if (pieceOnSquareRight !== undefined) {
                if (
                    pieceOnSquareRight.player !== this.player &&
                    !(pieceOnSquareRight instanceof King)
                ) { moves.push(currentSquareRight) }
            }
        }

        // check for En Passant
        console.log("Checking En Passant")
        currentRow = row + direction[0];
        currentCol = col + 1;
        if (currentRow >= 0 && currentRow <= 7 && currentCol >= 0 && currentCol <= 7) {
            const currentSquareRight = Square.at(currentRow-1, currentCol)
            const pieceOnSquareRight = board.getPiece(currentSquareRight)
            if (
                pieceOnSquareRight !== undefined &&
                pieceOnSquareRight.player !== this.player &&
                pieceOnSquareRight instanceof Pawn &&
                pieceOnSquareRight.canEnPassant
            ) {
                console.log("Piece on right")
                moves.push(Square.at(currentRow, currentCol))
            }
        }

        currentRow = row + direction[0];
        currentCol = col - 1;
        if (currentRow >= 0 && currentRow <= 7 && currentCol >= 0 && currentCol <= 7) {
            const currentSquareLeft = Square.at(currentRow-1, currentCol)
            const pieceOnSquareLeft = board.getPiece(currentSquareLeft)
            if (
                pieceOnSquareLeft !== undefined &&
                pieceOnSquareLeft.player !== this.player &&
                pieceOnSquareLeft instanceof Pawn &&
                pieceOnSquareLeft.canEnPassant
            ) {
                console.log("Piece on left")
                moves.push(Square.at(currentRow, currentCol))
            }
        }

        return moves;
    }
}
