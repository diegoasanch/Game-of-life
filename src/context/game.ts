import { createContext, useEffect, useMemo, useState, useCallback } from 'react';
import { useInterval, useLocalStorage } from 'react-use'
import { createBoard, deep_copy, nextCycle, saved_label } from '../pages/Game/gameFunctions'
import { boardData, ISavedBoard } from '../types/cells';
import { showToast } from '../utils/toaster'
import { HotkeyConfig } from '@blueprintjs/core';
import { Board } from '../components/Models/game'
import { useHistory } from 'react-router-dom';
import { getGameLink } from '../utils/url'
import { useThemeContext } from './theme'
import { buildGenericContext } from './genericContext';
import { saveBoardToLocalStorage, useSavedBoardsContext } from './savedBoards';
import { default_saved_board, MAX_NAME_LENGTH } from '../utils/constants';

export const ToggleCellState = createContext((col: number, row: number) => {console.log('Not yet configured')})

export const useGame = () => {
    const [colCount, setColCount] = useState(40)
    const [rowCount, setRowCount] = useState(30)
    const [content, setContent] = useState<boardData>(default_saved_board.board_content)
    const [resetCheckpoint, setResetCheckpoint] = useState<boardData>(default_saved_board.board_content)
    const [speed, setSpeed] = useState(10)
    const [isPlaying, setIsPlaying] = useState(false)
    const [iterationCount, setIterationCount] = useState(0)
    const [highlightNew, setHighlightNew] = useLocalStorage('highlightNew', false)
    const [name, setName] = useState('')
    const [loadedBoard, setLoadedBoard] = useState<ISavedBoard>()
    const history = useHistory()

    const handleName = (newName: string) => {
        setName(newName.substring(0, MAX_NAME_LENGTH))
    }

    const toggleState = (col: number, row: number) : void => {
        if (Array.isArray(content)) {
            console.log(`Toggling cell: [${row}][${col}]`)
            const copiedContent = deep_copy(content)

            copiedContent[row][col].alive = !copiedContent[row][col].alive
            setContent(copiedContent)
        }
    }

    const iterateOnce = () => {
        if (Array.isArray(content)) {
            setContent(nextCycle(content))
            setIterationCount(prev => prev + 1)
        }
    }

    const initializeBoard = (rows: number, cols: number, random=false, heart=false) => {
        setContent(createBoard(rows, cols, random, heart))
        setIterationCount(0)
    }

    const resetBoard = () => {
        setContent(resetCheckpoint)
        setIterationCount(0)
        showToast('Reset board', 'primary')
    }

    const randomizeBoard = () => {
        initializeBoard(rowCount, colCount, true, false)
        showToast('Randomized cells', 'primary')
    }
    const clearBoard = () => {
        initializeBoard(rowCount, colCount, false, false)
        showToast('Cleared board', 'primary')
    }

    const togglePlaying = () => {
        setIsPlaying(old => !old)
    }
    const toggleHighlightNew = () => {
        setHighlightNew(!highlightNew)
    }

    const handleSave = () => {
        if (name.length) {
            console.log(`Saving... ${name}`)
            saveBoardToLocalStorage(new Board(null, content, name))
            history.push("/" + saved_label(name))
            showToast(`Saved board: ${name}`, 'success')
        }
        else {
            showToast("Invalid name", 'danger')
        }
    }

    const getShareableLink = (board?: boardData) => {
        const toConvert = board ?? content
        const link = getGameLink(new Board(null, toConvert, name))
        navigator.clipboard.writeText(link)
        showToast('Link copied to clipboard.', 'primary')
    }

    useEffect(() => {
        let checkpoint: boardData | undefined;

        if (loadedBoard) {
            setContent(loadedBoard.board_content)
            setName(loadedBoard.name)
            checkpoint = loadedBoard.board_content
        }
        else {
            console.log('Initialize heart board')
            initializeBoard(rowCount, colCount, false, true)
            checkpoint = createBoard(rowCount, colCount, false, true)
        }
        setResetCheckpoint(checkpoint)
    }, [rowCount, colCount, loadedBoard])

    useInterval(() => {
        iterateOnce()
    }, isPlaying ? (1000 / speed) : null)

    return {
        colCount, setColCount,
        rowCount, setRowCount,
        content, setContent,
        resetCheckpoint, setResetCheckpoint,
        speed, setSpeed,
        isPlaying, setIsPlaying,
        iterationCount, setIterationCount,
        highlightNew: !!highlightNew, setHighlightNew,
        name, setName: handleName,
        toggleState,
        iterateOnce,
        resetBoard,
        randomizeBoard,
        clearBoard,
        togglePlaying,
        toggleHighlightNew,
        handleSave,
        getShareableLink,
        initializeBoard,
        loadedBoard, setLoadedBoard
    }
}

export const [GameContextProvider, useGameContext] = buildGenericContext(useGame)

export const useGameHotkeysConfig = () => {
    const {
        togglePlaying,
        iterateOnce,
        randomizeBoard,
        clearBoard,
        resetBoard,
        toggleHighlightNew,
        getShareableLink,
        content,
        name,
        highlightNew,
    } = useGameContext()

    const { saveBoard } = useSavedBoardsContext()
    const { toggleTheme } = useThemeContext()

    const handleSave = useCallback(() => {
        saveBoard(new Board(null, content, name))
    }, [saveBoard, content, name])


    const hotkeysConfig = useMemo<HotkeyConfig[]>(() => ([
        {
            combo: 'p',
            global: true,
            label: "Play",
            onKeyDown: togglePlaying
        },
        {
            combo: 'right',
            global: true,
            label: "Iterate once",
            onKeyDown: iterateOnce
        },
        {
            combo: 'shift + n',
            global: true,
            label: "Randomize cells",
            onKeyDown: randomizeBoard
        },
        {
            combo: 'shift + c',
            global: true,
            label: "Clear board",
            onKeyDown: clearBoard
        },
        {
            combo: 'shift + r',
            global: true,
            label: "Reset Board",
            onKeyDown: resetBoard
        },
        {
            combo: 'shift + l',
            global: true,
            label: "Toggle theme",
            onKeyDown: toggleTheme
        },
        {
            combo: 'shift + h',
            global: true,
            label: "Toggle theme",
            onKeyDown: toggleHighlightNew
        },
        {
            combo: 'shift + s',
            global: true,
            label: "Save board",
            onKeyDown: handleSave
        },
        {
            combo: 'shift + d',
            global: true,
            label: "Share board",
            onKeyDown: getShareableLink as () => void
        },
    // eslint-disable-next-line
    ]), [
        togglePlaying,
        iterateOnce,
        randomizeBoard,
        clearBoard,
        resetBoard,
        toggleHighlightNew,
        handleSave,
        getShareableLink,
        highlightNew,
        toggleTheme
    ])

    return { hotkeysConfig }
}
