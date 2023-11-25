import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { showToast } from '../../utils/toaster'
import Game from '../Game'
import { base64ToBoard } from '../../utils/url'
import { default_saved_board } from '../../utils/constants'

type IUrlParams = {
    name?: string,
    dimensions: string,
    content: string,
}


const notifyInvalid = () => {
    console.error("Invalid board")
    showToast('Invalid board', 'danger')
}

function SharedGame() {

    const { name, dimensions, content } = useParams<IUrlParams>()
    const [savedBoard, setSavedBoard] = useState(default_saved_board)
    const [isLoading, setIsLoading] = useState(true)

    const createBoard = (rows: number, cols: number, boardContent: string): Promise<void> => {
        return new Promise((resolve, reject) => {
            let generated_board

            try {
                if (rows && cols && boardContent) {
                    generated_board = base64ToBoard(rows, cols, boardContent)
                    showToast(`Loaded ${rows} x ${cols} board` + (name ? `: ${name}` : ''), "primary")
                    setSavedBoard({ ...generated_board, name: name ?? 'untitled_board' })
                    return resolve()
                }
                throw new Error('invalid board')
            } catch (error) {
                return reject()
            }
        })
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
        console.log({ dimensions, parsed_rows, parsed_cols, content, name})

        const call_create = async () => {
            setIsLoading(true)
            try {
                await createBoard(parsed_rows, parsed_cols, content)
            } catch (error) {
                setSavedBoard(default_saved_board)
                notifyInvalid()
            } finally {
                setIsLoading(false)
            }
        }
        call_create()
    // eslint-disable-next-line
    }, [dimensions, content, name])

    return (
        <Game loadedBoard={savedBoard} isLoading={isLoading} />
    )
}

export default SharedGame
