import { useState, useEffect } from 'react'
import { IBoard, ISavedBoard } from '../types/cells';
import { getBoard, saved_label } from '../pages/Game/gameFunctions';
import { buildGenericContext } from './genericContext';
import { useHistory } from 'react-router-dom';
import { AppToaster } from '../utils/toaster';

const getLocalStorageBoardNames = (): string[] => {
    const result = [] as string[]
    for (const itemName of Object.keys(window.localStorage)) {
        if (itemName.startsWith('saved/'))
            result.push(itemName.replace('saved/', ''))
    }
    return result
}

const useSavedBoards = () => {
    const [boards, setBoards] = useState<ISavedBoard[]>([])
    const history = useHistory()

    const goToSaved = (name: string) => {
        if (name.length) {
            history.push("/" + saved_label(name))
        }
        else {
            AppToaster.show({ message: `Invalid board name`, intent: "danger" })
        }
    }

    const fetchBoards = async () => {
        const names =  getLocalStorageBoardNames()
        const newBoards = [] as ISavedBoard[]

        for (const boardName of names) {
            const board = await getBoard(boardName)
            if (board)
                newBoards.push(board)
        }
        console.log('Saved boards: ')
        console.table(newBoards)
        setBoards(newBoards)
    }

    const saveBoard = (to_save: IBoard) => {
        saveBoardToLocalStorage(to_save)
        fetchBoards()
    }

    const deleteBoard = (name: string) => {
        window.localStorage.removeItem(saved_label(name))
        fetchBoards()
    }

    useEffect(() => {
        fetchBoards()
    }, [])

    return {
        boards,
        goToSaved,
        deleteBoard,
        saveBoard,
    }
}

export const [SavedBoardsProvider, useSavedBoardsContext] = buildGenericContext(useSavedBoards)

export const board_to_saved_format = (to_save: IBoard): ISavedBoard => (
    {
        name: to_save.name,
        created: to_save.created,
        edited: to_save.edited,
        board_content: to_save.board_content,
        cols: to_save.getCols(),
        rows: to_save.getRows(),
    }
)

export const saveBoardToLocalStorage = (to_save: IBoard): void => {
    const storage_key = saved_label(to_save.name)

    if (window.localStorage.hasOwnProperty(storage_key)) {
        to_save.edited = new Date();
    }
    const formated_board = board_to_saved_format(to_save)
    const serialized_board = JSON.stringify(formated_board)

    window.localStorage.setItem(storage_key, serialized_board)
}
