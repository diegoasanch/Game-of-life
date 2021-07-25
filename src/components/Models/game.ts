import { boardData, IBoard, ISavedBoard } from "../../types/cells";

export class Board implements IBoard {
    public name = ''
    public created = new Date()
    public edited =  new Date()
    public board_content: boardData = [[]]
    public rows = 0
    public cols = 0

    constructor(loaded_board: ISavedBoard | null, board_content?: boardData, name?: string) {

        if (loaded_board) {
            console.log(`Creating board from: ${loaded_board}`)

            this.name = loaded_board.name ?? 'undefined'
            this.created = loaded_board.created ?? new Date()
            this.edited =  loaded_board.edited ?? new Date()
            this.board_content = loaded_board.board_content
        }
        else if (board_content) {
            this.name = name ?? 'untitled_board'
            this.created = new Date()
            this.edited = new Date()
            this.board_content = board_content
        }

        this.rows = this.getRows()
        this.cols = this.getCols()
    }

    getRows() {
        return this.board_content.length
    }

    getCols() {
        return this.board_content[0].length
    }
}
