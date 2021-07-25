export type cellContent = {
    alive: boolean,
    age: number,
    row: number,
    column: number,
}

export type boardData = cellContent[][];

export interface ISavedBoard {
    name: string,
    created: Date,
    edited: Date,
    board_content: boardData
    rows: number,
    cols: number
}

export interface IBoard extends ISavedBoard {
    getRows: () => number,
    getCols: () => number,
}
