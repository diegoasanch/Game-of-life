import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import CellGrid from '../../components/CellGrid'
import { dark } from '../../styles/colors'
import { numInputCallback, SetNumValue } from '../../types/inputs'
import { boardData } from '../../types/cells'
import { ToggleCellState } from '../../context/game'
import { useInterval } from 'react-use';

const PageContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${dark.background};
    color: ${dark.text};
    display: flex;
    flex-direction: row;
`
const MainContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const deep_copy = (to_copy: any): any => {
    return JSON.parse(JSON.stringify(to_copy))
}

const aliveNextCycle = (board: boardData, row: number, col: number): boolean => {
    const ROWS = board.length;
    const COLS = board[0].length;
    const current = board[row][col]

    const UP = row - 1
    const DOWN = row + 1
    const LEFT = col - 1
    const RIGHT = col + 1

    const HAS_RIGHT = RIGHT < COLS
    const HAS_DOWN = DOWN < ROWS
    const HAS_UP = UP >= 0
    const HAS_LEFT = LEFT >= 0

    const top_left = (HAS_LEFT && HAS_UP) ? Number(board[UP][LEFT].alive) : 0;
    const top_center = HAS_UP ? Number(board[UP][col].alive) : 0;
    const top_right = (HAS_RIGHT && HAS_UP) ? Number(board[UP][RIGHT].alive) : 0;
    const center_left = HAS_LEFT ? Number(board[row][LEFT].alive) : 0;
    const center_right = HAS_RIGHT ? Number(board[row][RIGHT].alive) : 0;
    const bottom_left = (HAS_LEFT && HAS_DOWN) ? Number(board[DOWN][LEFT].alive) : 0;
    const bottom_center = HAS_DOWN ? Number(board[DOWN][col].alive) : 0;
    const bottom_right = (HAS_DOWN && HAS_RIGHT) ? Number(board[DOWN][RIGHT].alive) : 0;

    const alive_neighbors = (top_left + top_center + top_right + center_left + center_right + bottom_left + bottom_center + bottom_right)
    return (alive_neighbors === 3) || (current.alive && alive_neighbors === 2)
}

const nextCycle = (board: boardData) : boardData => {
    const copied_data = deep_copy(board) // copy the board
    let i;
    let j;

    const rows = board.length;
    const cols = board[0].length;

    for (i = 0; i < rows; i++) {
        for (j = 0; j < cols; j++) {
            const new_state = aliveNextCycle(board, i, j)
            copied_data[i][j].alive = new_state
        }
    }
    return copied_data
}

const createBoard = (rows: number, cols: number, random: boolean): boardData  => {
    const array = []
    let row;
    for (let i = 0; i < rows; i++) {
        row = []
        for (let j = 0; j < cols; j++) {
            row.push({
                alive: random ? !!(Math.round(Math.random())) : false,
                age: 0,
                row: i,
                column: j
            })
        }
        array.push(row)
    }
    return array
}

const Game = () => {

    const [colCount, setColCount] = useState(30)
    const [rowCount, setRowCount] = useState(30)
    const [content, setContent] = useState<boardData>()
    const [speed, setSpeed] = useState(1)
    const [isPlaying, setIsPlaying] = useState(false)
    const [iterationCount, setIterationCount] = useState(0)

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
            console.time("Iterating board!!")
            setContent(nextCycle(content))
            setIterationCount(prev => prev + 1)
            console.timeEnd("Iterating board!!")
        }
    }

    const initializeBoard = (rows: number, cols: number, random=false) => {
        setContent(createBoard(rows, cols, random))
        setIterationCount(0)
    }

    const resetBoard = (random=false) => {
        initializeBoard(rowCount, colCount, random)
    }

    const togglePlaying = () => {
        setIsPlaying(old => !old)
    }

    useEffect(() => {
        initializeBoard(rowCount, colCount)
    }, [rowCount, colCount])

    useInterval(() => {
        iterateOnce()
    }, isPlaying ? (1000 / speed) : null)

    return (
        <ToggleCellState.Provider value={toggleState} >

            <PageContainer>
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
                />
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
