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

        const directions = [
            [1,1],[-1,1],[1,-1],[-1,-1],
            [0,1],[1,0],[-1,0],[0,-1]
        ]

        const myObject = {
            a: 1,
            b: 2,
            c: 3,
        };

        directions.forEach((v)=>{
            let _row = row + v[0];
            let _col = col + v[1];
            
            while(!(_row < 0 || _row > 7 || _col < 0 || _col > 7 )){
                const square = Square.at(_row, _col)
                if(board.getPiece(square) !== undefined) break
                
                moves.push(square)
                _row += v[0];
                _col += v[1];
            }
        })

        return moves;
    }
}
