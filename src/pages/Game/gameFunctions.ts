import { boardData, IBoard, ISavedBoard } from '../../types/cells'

export const aliveNextCycle = (board: boardData, row: number, col: number): boolean => {
    const ROWS = board.length;
    const COLS = board[0].length;
    const current = board[row][col]

    const UP = row - 1
    const DOWN = row + 1
    const LEFT = col - 1
    const RIGHT = col + 1

    const HAS_RIGHT = RIGHT < COLS
    const HAS_DOWN = DOWN < ROWS
    const HAS_UP = UP >= 0
    const HAS_LEFT = LEFT >= 0

    const top_left = (HAS_LEFT && HAS_UP) ? Number(board[UP][LEFT].alive) : 0;
    const top_center = HAS_UP ? Number(board[UP][col].alive) : 0;
    const top_right = (HAS_RIGHT && HAS_UP) ? Number(board[UP][RIGHT].alive) : 0;
    const center_left = HAS_LEFT ? Number(board[row][LEFT].alive) : 0;
    const center_right = HAS_RIGHT ? Number(board[row][RIGHT].alive) : 0;
    const bottom_left = (HAS_LEFT && HAS_DOWN) ? Number(board[DOWN][LEFT].alive) : 0;
    const bottom_center = HAS_DOWN ? Number(board[DOWN][col].alive) : 0;
    const bottom_right = (HAS_DOWN && HAS_RIGHT) ? Number(board[DOWN][RIGHT].alive) : 0;

    const alive_neighbors = (top_left + top_center + top_right + center_left + center_right + bottom_left + bottom_center + bottom_right)
    return (alive_neighbors === 3) || (current.alive && alive_neighbors === 2)
}

export const nextCycle = (board: boardData) : boardData => {
    const copied_data = deep_copy(board) // copy the board
    let i;
    let j;

    const rows = board.length;
    const cols = board[0].length;
    let new_state
    let current_cell

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            new_state = aliveNextCycle(board, i, j)
            current_cell = copied_data[i][j]
            current_cell.alive = new_state

            if (new_state) {
                current_cell.age += 1
            }
            else {
                current_cell.age = 0
            }
        }
    }
    return copied_data
}

export const deep_copy = (to_copy: any): any => {
    return JSON.parse(JSON.stringify(to_copy))
}


const heartPattern: number[][] = [
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,1,1,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,1,1,0,0,0,0,0,0,0,1,1,0,0,0,0,0,1],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0,1,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,1,0,0,0,0,1,0,0,1,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,1,0,0,0,0,1,0,1,1,1,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0],
    [0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,1,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,1,1,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0,0],
    [1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,0]
]



export const createBoard = (rows: number, cols: number, random: boolean, heart=false): boardData  => {
    const array = []
    let row;
    let is_alive

    for (let i = 0; i < rows; i++) {
        row = []
        for (let j = 0; j < cols; j++) {
            if (random)
                is_alive = !!(Math.round(Math.random()))
            else if (heart)
                is_alive = !!(heartPattern[i][j])
            else
                is_alive = false;


            row.push({
                alive: is_alive,
                age: 0,
                row: i,
                column: j
            })
        }
        array.push(row)
    }
    return array
}

export const saved_label = (name: string): string => {
    return `saved/${name.replace(' ', '_')}`

}

export const board_to_saved_format = (to_save: IBoard): ISavedBoard => (
    {
        name: to_save.name,
        created: to_save.created,
        edited: to_save.edited,
        board_content: to_save.board_content,
    }
)

export const saveBoard = (to_save: IBoard): void => {
    const storage_key = saved_label(to_save.name)

    if (window.localStorage.hasOwnProperty(storage_key)) {
        to_save.edited = new Date();
    }
    const formated_board = board_to_saved_format(to_save)
    const serialized_board = JSON.stringify(formated_board)

    window.localStorage.setItem(storage_key, serialized_board)
}

export const getBoard = (name: string): ISavedBoard | undefined => {

    if (window.localStorage.hasOwnProperty(saved_label(name))) { // saved entry
        const board_string = window.localStorage.getItem(saved_label(name)) ?? '{}'
        const parsed_board = JSON.parse(board_string)
        const default_content: boardData = [[]]

        const loaded_board: ISavedBoard = {
            name: parsed_board.name ?? 'undefined',
            created: parsed_board.created ?? new Date(),
            edited: parsed_board.edited ?? new Date(),
            board_content: parsed_board.board_content ?? default_content,
        }
        return loaded_board
    }
    return undefined
}

/**
 * Shortens the input string, replaces long repeating strings of zeroes with
 * `x{LEN}` where `LEN` is the amount of repetitions
 * @param hex
 */
const shorten_hex = (hex: string): string => {
    let new_hex = ''
    let current = ''
    let next = ''
    let repeating = false

    for (let char = 0; char < hex.length; char++) {
        current = hex[char]
        next = (char < hex.length - 1) ? hex[char + 1] : ''

        if ([current, next].every(a => a === '0')) {
            let count = 0
            repeating = true

            while (repeating && char < hex.length) {
                count++
                repeating = hex[++char] === current
            }
            new_hex += `x${count};`
            char--
        }
        else {
            new_hex += current
        }
    }
    return new_hex
}

const board_to_hex = (content: boardData): string => {
    let bin = ''
    let hex = ''

    // Board to binary
    for (let row of content) {
        for (let col of row) {
            bin += col.alive ? '1' : '0'
        }
    }
    let byte;
    // Binary to hex, separating in bytes
    for (let i = 0; i < bin.length; i += 8) {

        byte = bin.substring(i, i+8)
        hex += parseInt(byte, 2).toString(16)
    }

    return hex
}

export const getGameLink = (board: IBoard): string => {
    const cols = board.getCols()
    const rows = board.getRows()
    const content = board_to_hex(board.board_content)


    // return window.location.host + `/shared/${rows}x${cols}/${content}`
    return window.location.host + `/shared/${rows}x${cols}/${shorten_hex(content)}`
}

const unzip_hex = (hex: string): string => {
    let out = ''
    for (let i = 0; i < hex.length; i++) {
        if (hex[i] !== 'x')
            out += hex[i]
        else {
            const separator = hex.indexOf(';', i);
            const repetitions = parseInt(hex.substring(i+1, separator))
            console.log({separator, repetitions, i})
            i = separator


            out += '0'.repeat(repetitions)
        }
    }
    return out
}
const hex_to_bin = (hex: string) => parseInt(hex, 16).toString(2)

export const hex_to_board = (hex: string): void => {
    const unzipped = unzip_hex(hex)
    console.log(`Before: ${hex} \n\n\n After: ${unzipped}`)
    console.log(`\n\nBinary: ${hex_to_bin(unzipped)}`)
}
