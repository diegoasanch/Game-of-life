import { Board } from '../components/Models/game'
import { generateBoard } from '../pages/Game/gameFunctions'
import { base64ToBoard, getGameLink } from './url'

const alive = (board: { board_content: { alive: boolean }[][] }) =>
    board.board_content.map(row => row.map(cell => cell.alive))

describe('share links', () => {
    it.each([
        ['empty', generateBoard(30, 40)],
        ['random', generateBoard(30, 40, true)],
        ['sparse', generateBoard(7, 9, false, '1'.padEnd(63, '0').slice(0, 62) + '1')],
    ])('round-trips a %s board', (_, content) => {
        const link = getGameLink(new Board(null, content, 'b'))
        const [dimensions, encoded] = link.split('/').slice(-2)
        const [rows, cols] = dimensions.split('x').map(Number)

        expect(alive(base64ToBoard(rows, cols, encoded))).toEqual(alive({ board_content: content }))
    })
})
