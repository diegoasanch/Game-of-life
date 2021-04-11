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


const heartPattern: string = `
0000000000000000000000000100000000000000
0000000000000000000000000000000100000000
0000000000100000000000010000000100000000
0001100011000000100000000000000100000110
0000100001000000010000000000000000000010
0000000000000000001000000000000000000000
0000000000000000000000000000000000000000
0000000000000000000000000000000001000000
0000000000000000000000000010000000000000
0000000000000000000000000000000000000000
0000000000000000011000110000000000000000
0000000000000000111101111000000000000000
0001100000000001111111111100000000000000
0011000000000001111111111100000000000000
0010000000000000111111111000000011000001
0000000000000000011111110000000000000000
0000100001000000001111100000000000000010
0000100001001000000111000000000000000010
0000100001011100000010000000000000000010
0000000000110000000000000000000000000000
0000000000000000000000000000000000000000
0000000000000000000000000000000000000000
0000000000000000000000000010000000000000
0000000000000000000000000111000000000000
0000000000000000000000000010000100000000
0000011100001110000000000000000010000000
0000000000000010000000000000000001000000
0000000000000000000000000000000000000000
0000000000000000000000110000000011000000
1000010000000000000000100000000001100000
`

const generateBoard = (rows: number, cols: number, random?: boolean, pattern?: string): boardData => {
    const generated = []
    let row;
    let is_alive

    for (let i = 0; i < rows; i++) {
        row = []
        for (let j = 0; j < cols; j++) {
            if (random)
                is_alive = !!(Math.round(Math.random()))
            else if (pattern?.length)
                is_alive = !!parseInt(pattern[(i * cols) + j])
            else
                is_alive = false;

            row.push({
                alive: is_alive,
                age: 0,
                row: i,
                column: j
            })
        }
        generated.push(row)
    }
    return generated
}

export const createBoard = (rows: number, cols: number, random: boolean, heart=false): boardData  => {

    const pattern = heartPattern.replaceAll('\n', '')

    if (heart)
        return generateBoard(rows, cols, random, pattern)
    return generateBoard(rows, cols, random)
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
        hex += parseInt(byte, 2).toString(16).padStart(2, '0')
    }

    console.log(`Binary: ${bin}\n\nHex: ${hex}`)

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
            // console.log({separator, repetitions, i})
            i = separator

            out += '0'.repeat(repetitions)
        }
    }
    return out
}
const hex_to_bin = (hex: string): string => {
    let out = ''

    for (let i = 0; i < hex.length; i += 2) {
        let byte = hex.substring(i, i+2)
        out += parseInt(byte, 16).toString(2).padStart(8, '0')
    }

    return out
}

export const hex_to_board = (rows: number, cols: number, zipped_hex: string): ISavedBoard => {
    const hex = unzip_hex(zipped_hex)
    const bin = hex_to_bin(hex)

    console.log(`Zipped: ${zipped_hex} \n\n\n Hex: ${hex}\n\n\nBinary: ${bin}`)

    const content = generateBoard(rows, cols, false, bin)
    const board: ISavedBoard = {
        name: 'Shared board',
        created: new Date(),
        edited: new Date(),
        board_content: content,
    }

    return board
}
