import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Pawn extends Piece {
    public constructor(player: Player) {
        super(player);
    }
    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        if (this.player === Player.BLACK) {
            moves.push(Square.at(row - 1, col))
            if(row === 6){
                moves.push(Square.at(row - 2, col))
            }
        }
        else {
            moves.push(Square.at(row + 1, col))
            if(row === 1){
                moves.push(Square.at(row + 2, col))
            }
        }

        return moves;
    }
}
