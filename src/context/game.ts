import { createContext, useEffect, useMemo, useState } from 'react'
import { useInterval, useLocalStorage } from 'react-use'
import { createBoard, deep_copy, nextCycle, saveBoard, saved_label } from '../pages/Game/gameFunctions'
import { boardData } from '../types/cells'
import { showToast } from '../utils/toaster'
import { HotkeyConfig } from '@blueprintjs/core';
import { Board } from '../components/Models/game'
import { useHistory } from 'react-router-dom';
import { getGameLink } from '../utils/url'
import { useThemeContext } from './theme'
import { buildGenericContext } from './genericContext';

export const ToggleCellState = createContext((col: number, row: number) => {console.log('Not yet configured')})

export const useGame = () => {
    const [colCount, setColCount] = useState(40)
    const [rowCount, setRowCount] = useState(30)
    const [content, setContent] = useState<boardData>()
    const [resetCheckpoint, setResetCheckpoint] = useState<boardData>()
    const [speed, setSpeed] = useState(10)
    const [isPlaying, setIsPlaying] = useState(false)
    const [iterationCount, setIterationCount] = useState(0)
    const [highlightNew, setHighlightNew] = useLocalStorage('highlightNew', false)
    const [name, setName] = useState('')
    const history = useHistory()

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
        showToast('Reset board', 'primary') // TODO: maybe use this in the game and leave only logic here
    }

    const randomizeBoard = () => {
        initializeBoard(rowCount, colCount, true, false)
        showToast('Randomized cells', 'primary') // TODO: Same with this toast
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
            saveBoard(new Board(null, content, name))
            history.push("/" + saved_label(name))
            showToast(`Saved board: ${name}`, 'success')
        }
        else {
            alert("Invalid name")
        }
    }

    const getShareableLink = () => {
        const link = getGameLink(new Board(null, content, name))
        navigator.clipboard.writeText(link)
        showToast('Link copied to clipboard.', 'primary')
    }

    useEffect(() => {
        initializeBoard(rowCount, colCount)
    }, [rowCount, colCount])

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
        name, setName,
        toggleState,
        iterateOnce,
        resetBoard,
        randomizeBoard,
        clearBoard,
        togglePlaying,
        toggleHighlightNew,
        handleSave,
        getShareableLink,
        initializeBoard
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
        handleSave,
        getShareableLink,
        highlightNew,
    } = useGameContext()

    const { toggleTheme } = useThemeContext()

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
            onKeyDown: getShareableLink
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

    return hotkeysConfig
}
