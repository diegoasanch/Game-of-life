import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { useLocalStorage } from 'react-use'
import { Board } from '../../components/Models/game'
import { ISavedBoard, IBoard } from '../../types/cells'
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

    useEffect(() => {
        const from_localstorage = getBoard(name)
        if (from_localstorage) {
            setSavedBoard(from_localstorage)
            AppToaster.show({ message: `Loaded board "${name}"`, intent: "primary"})
        }
        else
            AppToaster.show({ message: `Couldn't load board "${name}"`, intent: "danger"})
    }, [name])

    return (
        <Game fromStorage={true} loadedBoard={savedBoard} />
    )
}

export default SavedGame
