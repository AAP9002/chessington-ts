import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Queen extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        for(let i = 0; i < 8; i++){
            for(let j = 0; j < 8; j++){
                if(i === row && j === col) continue
                // horizontal/vertical
                if(i === row) moves.push(Square.at(row,j))
                if(j === col) moves.push(Square.at(i,col))
                // diagonal
                if(Math.abs(i - row) !== Math.abs(j - col)) continue
                moves.push(Square.at(i,j))
            }
        }
        return moves;
    }
}
