import Piece from './piece';
import Player from '../player';
import Board from '../board';
import Square from '../square';
import King from './king';

export default class Bishop extends Piece {
    public constructor(player: Player) {
        super(player);
    }

    public getAvailableMoves(board: Board) {
        let moves = new Array()
        const square = board.findPiece(this);
        const row = square.row;
        const col = square.col;

        const directions = [[1,1],[-1,1],[1,-1],[-1,-1]]

        directions.forEach((v)=>{
            let currentRow = row + v[0];
            let currentCol = col + v[1];
            
            while(!(currentRow < 0 || currentRow > 7 || currentCol < 0 || currentCol > 7 )){
                const currentSquare = Square.at(currentRow, currentCol)
                const pieceOnSquare = board.getPiece(currentSquare)
                if(pieceOnSquare !== undefined){
                    if(
                        pieceOnSquare.player !== this.player &&
                        !(pieceOnSquare instanceof King)
                    ){moves.push(currentSquare)}
                    break;
                }
                
                moves.push(currentSquare);
                currentRow += v[0];
                currentCol += v[1];
            }
        })

        return moves;
    }
}
