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
            const one_space = Square.at(row - 1, col)
            if(board.getPiece(one_space) === undefined)
            {
                moves.push(one_space)

                // check if move 2 possible
                if(row === 6){
                    const two_space = Square.at(row - 2, col)
                    if(board.getPiece(two_space) === undefined){
                        moves.push(two_space)
                    }
                }
            }
        }
        else {
            const one_space = Square.at(row + 1, col)
            if(board.getPiece(one_space) === undefined)
            {
                moves.push(one_space)

                // check if move 2 possible
                if(row === 1){
                    const two_space = Square.at(row + 2, col)
                    if(board.getPiece(two_space) === undefined){
                        moves.push(two_space)
                    }
                }
            }
        }

        return moves;
    }
}
