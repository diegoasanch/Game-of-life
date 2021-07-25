import { ISavedBoard } from "../types/cells";

export const default_saved_board: ISavedBoard = {
    name: 'undefined',
    created: new Date(),
    edited: new Date(),
    board_content: [[], []],
    rows: 0,
    cols: 0,
}
