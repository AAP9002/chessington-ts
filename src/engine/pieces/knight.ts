import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';

export default class Knight extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        for(let i = Math.max(0,row-2); i <= Math.min(7,row+2); i++){
            for(let j = Math.max(0,row-2); j <= Math.min(7,row+2); j++){
                if(i === row && j === col) continue

                const rowDiff = Math.abs(i - row)
                const colDiff = Math.abs(j - col)
                if(rowDiff === 1 && colDiff === 2)  moves.push(Square.at(i,j))
                if(rowDiff === 2 && colDiff === 1)  moves.push(Square.at(i,j))
            }
        }

        return moves;
    }
}
