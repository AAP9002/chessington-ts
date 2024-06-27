import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';

export default class Pawn extends Piece {
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

        while (!(currentRow < 0 || currentRow > 7 || currentCol < 0 || currentCol > 7) && maxStep > 0) {
            const square = Square.at(currentRow, currentCol)
            if (board.getPiece(square) !== undefined) break

            moves.push(square)
            currentRow += direction[0];
            currentCol += direction[1];
            maxStep--;
        }

        // taking pieces

        // Check diagonal left
        currentRow = row + direction[0];
        currentCol = col - 1;
        if (currentRow >= 0 && currentRow <= 7 && currentCol >= 0 && currentCol <= 7) {
            const currentSquareL = Square.at(currentRow, currentCol)
            const pieceOnSquareL = board.getPiece(currentSquareL)
            if (pieceOnSquareL !== undefined) {
                if (
                    pieceOnSquareL.player !== this.player &&
                    !(pieceOnSquareL instanceof King)
                ) { moves.push(currentSquareL) }
            }
        }

        // Check diagonal right
        currentRow = row + direction[0];
        currentCol = col - 1;
        if (currentRow >= 0 && currentRow <= 7 && currentCol >= 0 && currentCol <= 7) {
            const currentSquareR = Square.at(currentRow, currentCol)
            const pieceOnSquareR = board.getPiece(currentSquareR)
            if (pieceOnSquareR !== undefined) {
                if (
                    pieceOnSquareR.player !== this.player &&
                    !(pieceOnSquareR instanceof King)
                ) { moves.push(currentSquareR) }
            }
        }


        return moves;
    }
}
