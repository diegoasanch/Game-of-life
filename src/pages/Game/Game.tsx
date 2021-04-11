import React, { useContext, useEffect, useState, useMemo } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import CellGrid from '../../components/CellGrid'
import { numInputCallback, SetNumValue } from '../../types/inputs'
import { boardData, ISavedBoard } from '../../types/cells'
import { ToggleCellState } from '../../context/game'
import { useInterval, useLocalStorage } from 'react-use';
import { CurrentTheme, ThemeContext } from '../../context/theme'
import { IthemeProp } from '../../types/styles'
import { nextCycle, deep_copy, createBoard, saveBoard, saved_label, getGameLink } from './gameFunctions'
import { ContextMenu2 } from "@blueprintjs/popover2";
import BoardMenu from '../../components/BoardMenu'
import { Intent, useHotkeys } from "@blueprintjs/core";
import { Board } from '../../components/Models/game'
import { useHistory } from 'react-router-dom'
import { AppToaster } from '../../utils/toaster'

const PageContainer = styled.div<IthemeProp>`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    display: flex;
    flex-direction: row;
`
const SideContainer = styled.div`
    width: 270px;
    z-index: 1;
`
const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`
const ResizedContextMenu = styled(ContextMenu2)`
    height: 100vh;
    width: 100vw;
`


type IProps = {
    fromStorage: boolean,
    loadedBoard?: ISavedBoard,
}

const Game = ({ fromStorage, loadedBoard }: IProps) => {

    const theme = useContext(CurrentTheme)
    const { isDark, toggleTheme } = useContext(ThemeContext)

    const [colCount, setColCount] = useState(40)
    const [rowCount, setRowCount] = useState(30)
    const [content, setContent] = useState<boardData>()

    const [speed, setSpeed] = useState(10)
    const [isPlaying, setIsPlaying] = useState(false)
    const [iterationCount, setIterationCount] = useState(0)
    const [highlightNew, setHighlightNew] = useLocalStorage('highlightNew', false)
    const history = useHistory()

    const [name, setName] = useState('')

    const handleColInput: numInputCallback = (valueAsNumber, valueAsString, innputElement) => {
        setColCount(valueAsNumber)
    }
    const handleRowInput: numInputCallback = (valueAsNumber, valueAsString, innputElement) => {
        setRowCount(valueAsNumber)
    }
    const handleSpeed: SetNumValue = (value) => {
        setSpeed(value)
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

    const resetBoard = (random=false, heart=false) => {
        initializeBoard(rowCount, colCount, random, heart)
    }

    const togglePlaying = () => {
        setIsPlaying(old => !old)
    }
    const toggleHighlightNew = () => {
        setHighlightNew(old => !old)
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

    const showToast = (message: string, intent?: Intent) => {
        AppToaster.show({ message, intent })
    }

    const getShareableLink = () => {
        const link = getGameLink(new Board(null, content, name))
        navigator.clipboard.writeText(link)
        showToast('Link copied to clipboard.', 'primary')
    }

    useEffect(() => {
        initializeBoard(rowCount, colCount)
    }, [rowCount, colCount])

    useEffect(() => {
        if (fromStorage) {
            setContent(loadedBoard?.board_content)
            setName(loadedBoard?.name ?? 'untitled_board')
        }
        else
            initializeBoard(rowCount, colCount, false, true)
    // eslint-disable-next-line
    }, [fromStorage, loadedBoard?.board_content])

    useInterval(() => {
        iterateOnce()
    }, isPlaying ? (1000 / speed) : null)

    const hotkeys = useMemo(() => [
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
            onKeyDown: () => resetBoard(true, false)
        },
        {
            combo: 'shift + c',
            global: true,
            label: "Clear board",
            onKeyDown: () => resetBoard(false, false)
        },
        {
            combo: 'shift + r',
            global: true,
            label: "Reset Board",
            onKeyDown: () => resetBoard(false, true)
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
            combo: 'shift + h',
            global: true,
            label: "Share board",
            onKeyDown: getShareableLink
        },
    // eslint-disable-next-line
    ], [content, isDark])

    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeys)

    return (
        <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <ToggleCellState.Provider value={toggleState} >
                <ResizedContextMenu content={
                    <BoardMenu
                        iterateOnce={iterateOnce}
                        isPlaying={isPlaying}
                        togglePlaying={togglePlaying}
                        resetBoard={resetBoard}
                        name={name}
                        setName={setName}
                        saveBoard={handleSave}
                        share={getShareableLink}

                    />
                }>
                    <PageContainer theme={theme}>
                        <SideContainer>
                            <Sidebar
                                rows={rowCount}
                                cols={colCount}
                                setRows={handleRowInput}
                                setCols={handleColInput}
                                iterateOnce={iterateOnce}
                                speed={speed}
                                setSpeed={handleSpeed}
                                isPlaying={isPlaying}
                                togglePlaying={togglePlaying}
                                resetBoard={resetBoard}
                                iterationCount={iterationCount}
                                isDark={isDark}
                                toggleTheme={toggleTheme}
                                highlightNew={!!highlightNew}
                                toggleHighlightNew={toggleHighlightNew}
                            />
                        </SideContainer>

                            <MainContainer>
                                <CellGrid
                                    rows={content}
                                    highlightNew={!!highlightNew}
                                />
                        </MainContainer>
                    </PageContainer>
                </ResizedContextMenu>
            </ToggleCellState.Provider>
        </div>
    )
}

export default Game
