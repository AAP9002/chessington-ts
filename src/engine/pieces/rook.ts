import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Rook extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        for(let i = 0; i < 8; i++){
            if(i === row) continue
            moves.push(Square.at(i,col))
        }

        for(let j = 0; j < 8; j++){
            if(j === col) continue
            moves.push(Square.at(row,j))
        }

        return moves;
    }
}
