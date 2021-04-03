import React from 'react'
import styled from 'styled-components'
import { cellContent } from '../../types/cells'
import Cell from '../Cell'

const Container = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;
`
const Row = styled.div`
    display: flex;
    flex-direction: row;
    margin: 0;
`

interface Iprops {
    rows: cellContent[][] | undefined
}

const CellGrid = ({ rows }: Iprops) => {
    return (
        <>
            { (rows?.length && rows[0].length) ?
                <Container>
                    { rows.map((row, index) => (
                        <Row key={`row_${index}`}>
                            { row.map( cell => (
                                <Cell
                                    key={`cell_${cell.row}_${cell.column}`}
                                    cellData={cell}

                                />
                            ))}
                        </Row>
                    ))}
                </Container>
                :
                <h1>Empty cells</h1>
            }
        </>
    )
}

export default CellGrid
