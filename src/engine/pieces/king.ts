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

        for(let i = Math.max(0,row-1); i <= Math.min(7,row+1); i++){
            for(let j = Math.max(0,col-1); j <= Math.min(7,col+1); j++){
                if(i === row && j === col) continue
                moves.push(Square.at(i,j))
            }
        }
        return moves
    }
}
