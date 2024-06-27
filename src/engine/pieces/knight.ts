import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        const ReletivePos = [[1, 2], [2, 1], [-1, 2], [-2, 1], [-2, -1], [-1, -2], [1, -2], [2, -1]]

        ReletivePos.forEach((v) => {
            const currentRow = row + v[0]
            const currentCol = col + v[1]

            if(currentRow < 0 || currentRow > 7 || currentCol < 0 || currentCol > 7 ) return

            const square = Square.at(currentRow, currentCol)

            // if blocked, add square if enable take piece
            const pieceOnSquare = board.getPiece(square)
            if (pieceOnSquare !== undefined) {
                if (
                    pieceOnSquare.player !== this.player &&
                    !(pieceOnSquare instanceof King)
                ) { moves.push(square) }
                return
            }

            moves.push(square)
        })

        return moves;
    }
}
