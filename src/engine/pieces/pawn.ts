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

        const isWhite = this.player===Player.WHITE

        const direction = isWhite?[1,0]:[-1,0]
        const startRow = isWhite? 1:6
        let maxStep = row === startRow?2:1 

        let _row = row + direction[0];
        let _col = col + direction[1];
           
        while(!(_row < 0 || _row > 7 || _col < 0 || _col > 7 ) && maxStep > 0){
            const square = Square.at(_row, _col)
            if(board.getPiece(square) !== undefined) break
              
            moves.push(square)
            _row += direction[0];
            _col += direction[1];
            maxStep--;
        }
        
        return moves;
    }
}
