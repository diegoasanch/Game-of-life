import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ISavedBoard } from '../../types/cells'
import { AppToaster } from '../../utils/toaster'
import Game from '../Game'
import { hex_to_board } from '../Game/gameFunctions'

const default_saved_board: ISavedBoard = {
    name: 'undefined',
    created: new Date(),
    edited: new Date(),
    board_content: [[], []],
}

type IUrlParams = {
    dimensions: string,
    content: string,
}
const notifyInvalid = () => {
    AppToaster.show({ message: 'Invalid board', intent: 'warning' })
}

function SharedGame() {

    const { dimensions, content } = useParams<IUrlParams>()
    const [savedBoard, setSavedBoard] = useState(default_saved_board)

    const createBoard = (rows: number, cols: number, content: string) => {
        let generated_board

        if (rows && cols && content) {
            generated_board = hex_to_board(rows, cols, content)
            AppToaster.show({ message: `Loaded shared ${rows} x ${cols} board`, intent: "primary"})
        }
        else {
            generated_board = default_saved_board
            console.error("Invalid board")
            notifyInvalid()
        }
        setSavedBoard(generated_board)
    }

    useEffect(() => {
        let parsed_rows = 0
        let parsed_cols = 0

        if (dimensions.includes('x')) {
            const [str_rows, str_cols] = dimensions.split('x')
            parsed_rows = parseInt(str_rows) || 0
            parsed_cols = parseInt(str_cols) || 0
        }
        else if (dimensions.length && !isNaN(parseInt(dimensions))) {
            const side = parseInt(dimensions)
            parsed_rows = side
            parsed_cols = side
        }

        console.log({ dimensions, parsed_rows, parsed_cols, content})
        createBoard(parsed_rows, parsed_cols, content)

    }, [dimensions, content])


    return (
        <Game fromStorage={true} loadedBoard={savedBoard} />
    )
}

export default SharedGame
