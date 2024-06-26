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

        // check up
        for(let i = row+1; i < 8; i++){
            const square = Square.at(i,col)
            if(board.getPiece(square) !== undefined) break
            moves.push(square)
        }

        // check down
        for(let i = row-1; i >=0 ; i--){
            const square = Square.at(i,col)
            if(board.getPiece(square) !== undefined) break
            moves.push(square)
        }

        // check right
        for(let j = col+1; j < 8; j++){
            const square = Square.at(row,j)
            if(board.getPiece(square) !== undefined) break
            moves.push(square)
        }
        
        // check left
        for(let j = col-1; j >= 0; j--){
            const square = Square.at(row,j)
            if(board.getPiece(square) !== undefined) break
            moves.push(square)
        }

        return moves;
    }
}
