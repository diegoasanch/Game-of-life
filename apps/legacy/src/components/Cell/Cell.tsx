import React, { useContext, useState, useEffect } from 'react'
import styled from 'styled-components'
import { cellContent } from '../../types/cells';
import { ToggleCellState, useGameContext } from '../../context/game'
import { useThemeContext } from '../../context/theme'


type CellColors = {
    background: string
    hoverBorder: string
}

const StyledCell = styled.div<CellColors>`
    height: 20px;
    width: 20px;
    background-color: ${props => props.background };
    border: solid 1px ${props => props.theme.cellBorder};
    cursor: pointer;

    &:hover {
        border: solid 3px ${props => props.hoverBorder };
    }
`

type CellProps = {
    cellData: cellContent,
    highlightNew: boolean,
}

const Cell = ({ cellData, highlightNew }: CellProps ) => {
    const { theme } = useThemeContext()
    const [cellColor, setCellColor] = useState<CellColors>({ background: theme.cellDead, hoverBorder: theme.cellHover })
    const toggleCell = useContext(ToggleCellState)
    const { isClickOnBoard } = useGameContext()
    const [wasClickedBefore, setWasClickedBefore] = useState(false)

    const handleClick = () => {
        toggleCell(cellData.column, cellData.row)
    }

    const handleMouseOver = () => {
        // Only toggle on the first call
        if (isClickOnBoard && !wasClickedBefore) {
            handleClick()
            setWasClickedBefore(true)
        }
    }

    const handleMouseLeave = () => {
        setWasClickedBefore(false)
    }

    useEffect(() => {
        const colors: CellColors = {
            background: theme.cellDead,
            hoverBorder: theme.cellHover
        }
        if (cellData.alive) {
            if (cellData.age === 1 && highlightNew) {
                colors.background = theme.header
                colors.hoverBorder = theme.sidebar
            }
            else {
                colors.background = theme.cellAlive
            }
        }
        setCellColor(colors)
    // eslint-disable-next-line
    }, [cellData, highlightNew, theme])

    return (
        <StyledCell
            onMouseEnter={handleMouseOver}
            onMouseLeave={handleMouseLeave}
            {...cellColor}
            // cellColor={getCellColor()}
            onClick={handleClick}
        />
    )
}

export default Cell
