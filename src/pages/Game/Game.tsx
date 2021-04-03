import React, { useContext, useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import CellGrid from '../../components/CellGrid'
import { numInputCallback, SetNumValue } from '../../types/inputs'
import { boardData } from '../../types/cells'
import { ToggleCellState } from '../../context/game'
import { useInterval } from 'react-use';
import { CurrentTheme } from '../../context/theme'
import { IthemeProp } from '../../types/styles'
import { nextCycle, deep_copy, createBoard } from './gameFunctions'

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
    width: calc(100% - 270px);
    display: flex;
    flex-direction: column;
    align-items: center;
`

interface Iprops {
    readonly isDark: boolean,
    toggleTheme: () => void,
}

const Game = ({ isDark, toggleTheme }: Iprops) => {

    const [colCount, setColCount] = useState(40)
    const [rowCount, setRowCount] = useState(30)
    const [content, setContent] = useState<boardData>()
    const [speed, setSpeed] = useState(10)
    const [isPlaying, setIsPlaying] = useState(false)
    const [iterationCount, setIterationCount] = useState(0)
    const theme = useContext(CurrentTheme)

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

    useEffect(() => {
        initializeBoard(rowCount, colCount)
    }, [rowCount, colCount])

    useEffect(() => {
        initializeBoard(rowCount, colCount, false, true)
    }, [])

    useInterval(() => {
        iterateOnce()
    }, isPlaying ? (1000 / speed) : null)

    return (
        <ToggleCellState.Provider value={toggleState} >

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
                    />
                </SideContainer>
                <MainContainer>
                    <CellGrid
                        rows={content}
                    />
                </MainContainer>
            </PageContainer>
        </ToggleCellState.Provider>
    )
}

export default Game
