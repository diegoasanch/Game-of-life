import React from 'react'
import styled from 'styled-components'
import { H1, Spinner } from '@blueprintjs/core'
import Cell from '../Cell'
import { useGameContext } from '../../context/game'
import { BORDER_RADIUS } from '../../styles/constants'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    height: 100%;
    width: 100%;
    /* width: max-content; */
    justify-content: center;

    padding: 2em 1em 1em;

    &::-webkit-scrollbar {
        background-color: ${props => props.theme.backgroundColor};
        width: 10px;
        height: 10px;
        border-radius: ${BORDER_RADIUS};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarBg};
        border-radius: ${BORDER_RADIUS};
    }
    &:hover::-webkit-scrollbar {
        background-color: ${props => props.theme.scrollBarBg};
        width: 10px;
        height: 10px;
    }
    &:hover::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarThumbHover};
    }
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
`

interface Iprops {
    isLoading: boolean
}

const CellGrid = ({ isLoading }: Iprops) => {
    const {
        content: rows,
        highlightNew,
        setIsClickOnBoard
    } = useGameContext()

    const handleClick = () => {
        setIsClickOnBoard(true)
    }

    const handleClickLeave = () => {
        setIsClickOnBoard(false)
    }

    return (
        <Container
            onMouseDown={handleClick}
            onMouseUp={handleClickLeave}
        >
            { isLoading &&
                <>
                    <H1>Loading...</H1>
                    <br />
                    <Spinner size={80} intent="primary"/>
                </>
            }
            { !isLoading && rows?.length && rows[0].length ?
                ( rows.map((row, index) => (
                    <Row key={`row_${index}`}>
                        { row.map( cell => (
                            <Cell
                                key={`cell_${cell.row}_${cell.column}`}
                                cellData={cell}
                                highlightNew={highlightNew}
                            />
                        ))}
                    </Row>
                )))
                :
                <H1>Not enough cells to display 😢</H1>
            }
        </Container>
    )
}

export default CellGrid
