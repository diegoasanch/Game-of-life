import React, { useContext } from 'react'
import styled from 'styled-components'
import { dark } from '../../styles/colors'
import { cellContent } from '../../types/cells'
import { ToggleCellState } from '../../context/game'

const StyledCell = styled.div<cellContent>`
    height: 20px;
    width: 20px;
    background-color: ${props => props.alive ? dark.cellAlive : dark.cellDead};
    border: solid 1px #000;
`

type Iprops = {
    cellData: cellContent
}

const Cell = ({ cellData }: Iprops ) => {
    const toggleCell = useContext(ToggleCellState)

    const handleClick = () => {
        toggleCell(cellData.column, cellData.row)
    }

    return (
        <StyledCell
            {...cellData}
            onClick={handleClick}
        />
    )
}

export default Cell
