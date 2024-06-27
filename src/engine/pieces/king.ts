import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class King extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        const top = Math.max(0, row - 1)
        const bottom = Math.min(7, row + 1)
        const left = Math.max(0, col - 1)
        const right = Math.min(7, col + 1)

        for (let i = top; i <= bottom; i++) {
            for (let j = left; j <= right; j++) {
                if (i === row && j === col) continue

                const currentSquare = Square.at(i, j)
                const pieceOnSquare = board.getPiece(currentSquare)
                
                if (pieceOnSquare !== undefined) {
                    if (
                        pieceOnSquare.player !== this.player &&
                        !(pieceOnSquare instanceof King)
                    ) { moves.push(currentSquare) }
                }
                else {
                    moves.push(currentSquare)
                }
            }
        }
        return moves
    }
}
