import React, { useContext } from 'react'
import styled from 'styled-components'
import { cellContent } from '../../types/cells'
import { ToggleCellState } from '../../context/game'
import { useThemeContext } from '../../hooks/useTheme'

type StyledCellProps = {
    cellColor: string
}

const StyledCell = styled.div<StyledCellProps>`
    height: 20px;
    width: 20px;
    background-color: ${props => props.cellColor };
    border: solid 1px ${props => props.theme.cellBorder};
`

type CellProps = {
    cellData: cellContent,
    highlightNew: boolean,
}

const Cell = ({ cellData, highlightNew }: CellProps ) => {
    const toggleCell = useContext(ToggleCellState)
    const { theme } = useThemeContext()

    const handleClick = () => {
        toggleCell(cellData.column, cellData.row)
    }

    const getCellColor = () : string => {
        let color : string = theme.cellDead

        if (cellData.alive) {
            if (cellData.age === 1 && highlightNew)
                color = theme.header
            else
                color = theme.cellAlive
        }
        return color
    }

    return (
        <StyledCell
            cellColor={getCellColor()}
            onClick={handleClick}
        />
    )
}

export default Cell
