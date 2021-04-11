import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { ISavedBoard } from '../../types/cells'
import { AppToaster } from '../../utils/toaster'
import Game from '../Game'
import { getBoard } from '../Game/gameFunctions'

const default_saved_board: ISavedBoard = {
    name: 'undefined',
    created: new Date(),
    edited: new Date(),
    board_content: [[], []],
}

type IUrlParams = {
    name: string,
}

function SavedGame() {

    const { name } = useParams<IUrlParams>()
    const [savedBoard, setSavedBoard] = useState(default_saved_board)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        const fetchBoard = async () => {
            try {
                const from_localstorage = await getBoard(name)
                if (from_localstorage) {
                    setSavedBoard(from_localstorage)
                    AppToaster.show({ message: `Loaded board "${name}"`, intent: "primary"})
                }
                else {
                    setSavedBoard(default_saved_board)
                    AppToaster.show({ message: `Couldn't load board "${name}"`, intent: "danger"})
                }
            } catch (error) {
                AppToaster.show({ message: "Error loading the board.", intent: 'danger'})
            } finally {
                setIsLoading(false)
            }
        }

        setIsLoading(true)
        fetchBoard()

    }, [name])

    return (
        <Game fromStorage={true} loadedBoard={savedBoard} isLoading={isLoading} />
    )
}

export default SavedGame
