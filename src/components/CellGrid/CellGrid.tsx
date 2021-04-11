import React, { useContext } from 'react'
import styled from 'styled-components'
import { CurrentTheme } from '../../context/theme'
import { cellContent } from '../../types/cells'
import { IthemeProp } from '../../types/styles'
import { H1, Spinner } from '@blueprintjs/core'
import Cell from '../Cell'

const Container = styled.div<IthemeProp>`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
    height: 100%;
    width: 100%;
    justify-content: center;

    &::-webkit-scrollbar {
        background-color: ${props => props.theme.scrollBarBg};
        width: 10px;
        height: 10px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarThumb};
    }
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
`

interface Iprops {
    rows: cellContent[][] | undefined,
    highlightNew: boolean,
    isLoading: boolean
}

const CellGrid = ({ rows, highlightNew, isLoading }: Iprops) => {
    const theme = useContext(CurrentTheme)

    return (
        <Container theme={theme}>
            { isLoading ?
                <>
                    <H1>Loading...</H1>
                    <br />
                    <Spinner size={80} intent="primary"/>
                </>
            :
                (
                (rows?.length && rows[0].length) ?
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
                    )
                ))
                :
                <H1>Not enough cells to display 😢</H1>
            )
            }
        </Container>
    )
}

export default CellGrid
