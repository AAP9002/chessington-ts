import Player from './player';
import GameSettings from './gameSettings';
import Square from './square';
import Piece from './pieces/piece';
import Pawn from './pieces/pawn';
import { updateChessBoard } from '../frontend/js/chessington';

export default class Board {
    public currentPlayer: Player;
    private readonly board: (Piece | undefined)[][];

    public constructor(currentPlayer?: Player) {
        this.currentPlayer = currentPlayer ? currentPlayer : Player.WHITE;
        this.board = this.createBoard();
    }

    public setPiece(square: Square, piece: Piece | undefined) {
        this.board[square.row][square.col] = piece;
    }

    public getPiece(square: Square) {
        return this.board[square.row][square.col];
    }

    public findPiece(pieceToFind: Piece) {
        for (let row = 0; row < this.board.length; row++) {
            for (let col = 0; col < this.board[row].length; col++) {
                if (this.board[row][col] === pieceToFind) {
                    return Square.at(row, col);
                }
            }
        }
        throw new Error('The supplied piece is not on the board');
    }

    public movePiece(fromSquare: Square, toSquare: Square) {
        let pieceRemoved = false;

        const movingPiece = this.getPiece(fromSquare);
        if (!!movingPiece && movingPiece.player === this.currentPlayer) {
            if(movingPiece instanceof Pawn){
                if(Math.abs(fromSquare.row - toSquare.row) >= 2)
                {
                    movingPiece.canEnPassant = true
                    console.log("En Passant Set")
                }

                const squareBehind = Square.at(fromSquare.row, toSquare.col)
                const piece = this.getPiece(squareBehind)
                if(piece instanceof Pawn){
                    if(piece.canEnPassant)
                        {
                            this.setPiece(squareBehind, undefined);
                            pieceRemoved = true;
                        }
                }
            }

            this.board.forEach((rows) =>
                rows.forEach((cell)=>{
                    if( cell instanceof Pawn &&
                        cell !== movingPiece
                    ){
                        cell.canEnPassant = false
                    }
                })
            )

            this.setPiece(toSquare, movingPiece);
            this.setPiece(fromSquare, undefined);
            this.currentPlayer = (this.currentPlayer === Player.WHITE ? Player.BLACK : Player.WHITE);

            if(pieceRemoved) updateChessBoard(this);
        }
    }

    private createBoard() {
        const board = new Array(GameSettings.BOARD_SIZE);
        for (let i = 0; i < board.length; i++) {
            board[i] = new Array(GameSettings.BOARD_SIZE);
        }
        return board;
    }
}
