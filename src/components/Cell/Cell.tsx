import React, { useContext } from 'react'
import styled from 'styled-components'
import { cellContent } from '../../types/cells'
import { ToggleCellState } from '../../context/game'
import { CurrentTheme } from '../../context/theme'
import { IthemeProp } from '../../types/styles'

const StyledCell = styled.div<cellContent & IthemeProp>`
    height: 20px;
    width: 20px;
    background-color: ${props => props.alive ? props.theme.cellAlive : props.theme.cellDead};
    border: solid 1px ${props => props.theme.cellBorder};
`

type Iprops = {
    cellData: cellContent
}

const Cell = ({ cellData }: Iprops ) => {
    const toggleCell = useContext(ToggleCellState)
    const theme = useContext(CurrentTheme)

    const handleClick = () => {
        toggleCell(cellData.column, cellData.row)
    }

    return (
        <StyledCell
            {...cellData}
            onClick={handleClick}
            theme={theme}
        />
    )
}

export default Cell
