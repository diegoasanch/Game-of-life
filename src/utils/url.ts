import { boardData, IBoard, ISavedBoard } from "../types/cells"
import { generateBoard } from '../pages/Game/gameFunctions'

const board_to_bin = (content: boardData): string => {
    let bin = ''

    for (let row of content) {
        for (let col of row) {
            bin += col.alive ? '1' : '0'
        }
    }
    return bin
}

const bin_to_ascii = (bin: string): string => {
    let out = ''
    let byte = ''

    for (let i = 0; i < bin.length; i += 8) {
        byte = bin.substring(i, i + 8).padEnd(8, '0')
        out += String.fromCharCode(parseInt(byte, 2))
    }
    return out
}

const bin_to_base64 = (bin: string): string => {
    const ascii = bin_to_ascii(bin)
    const b64 = btoa(ascii).replaceAll('/', '_')
    return b64
}

const shorten_b64 = (b64: string): string => {
    let new_hex = ''
    let current = ''
    let next = ''
    let repeating = false

    for (let char = 0; char < b64.length; char++) {
        current = b64[char]
        next = (char < b64.length - 1) ? b64[char + 1] : ''

        if ([current, next].every(a => a === 'A')) {
            let count = 0
            repeating = true

            while (repeating && char < b64.length) {
                count++
                repeating = b64[++char] === current
            }
            new_hex += `&${count};`
            char--
        }
        else {
            new_hex += current
        }
    }
    return new_hex
}

const unzip_b64 = (b64: string): string => {
    let out = ''
    for (let i = 0; i < b64.length; i++) {
        if (b64[i] !== '&')
            out += b64[i]
        else {
            const separator = b64.indexOf(';', i);
            const repetitions = parseInt(b64.substring(i+1, separator))
            i = separator
            out += 'A'.repeat(repetitions)
        }
    }
    return out
}
const ascii_to_bin = (ascii: string): string => {
    let out = ''
    let char = ''

    for (let i = 0; i < ascii.length; i++) {
        char = (ascii[i].charCodeAt(0)).toString(2).padStart(8, '0')
        out += char
    }
    return out
}

const base64_to_bin = (b64: string): string => {
    const ascii = atob(b64.replaceAll('_', '/'))
    const bin = ascii_to_bin(ascii)
    return bin
}

export const getGameLink = (board: IBoard): string => {
    const cols = board.getCols()
    const rows = board.getRows()

    const bin = board_to_bin(board.board_content)
    const b64 = bin_to_base64(bin)

    const { host, pathname } = window.location
    return host + pathname + `#/shared/${rows}x${cols}/${shorten_b64(b64)}`
}

export const base64ToBoard = (rows: number, cols: number, b64Content: string): ISavedBoard => {
    const b64 = unzip_b64(b64Content)
    const bin = base64_to_bin(b64)

    // console.log(`Zipped: ${b64Content} \n\n\n Hex: ${b64}\n\n\nBinary: ${bin}`)

    const content = generateBoard(rows, cols, false, bin)
    return {
        name: 'Shared board',
        created: new Date(),
        edited: new Date(),
        board_content: content,
        rows: content.length,
        cols: content[0].length,
    }

}
