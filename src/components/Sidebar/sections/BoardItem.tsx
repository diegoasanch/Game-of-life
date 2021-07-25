import { Card, H6, ButtonGroup, Button } from '@blueprintjs/core';
import styled from "styled-components"
import { useSavedBoardsContext } from '../../../context/savedBoards';
import { ISavedBoard } from "../../../types/cells"

const StyledCard = styled(Card)`
    width: 100%;
    padding: .5em;
    padding-left: .8em;
    margin: .3em 0;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
`

const StyledName = styled.div`
    display: flex;
    flex-direction: column;

    h6 {
        margin: .2em 0;
    }
    small {
        color: ${props => props.theme};
        font-size: .8em;
    }
`

export const BoardItem = ({ name, cols, rows }: ISavedBoard) => {
    const { goToSaved, deleteBoard } = useSavedBoardsContext()

    const openBoard = () => {
        goToSaved(name)
    }

    const handleDeleteBoard = () => {
        deleteBoard(name)
    }

    return (
        <StyledCard interactive>
            <StyledName>
                <H6>{name}</H6>
                <small className="bp3-text-muted">
                    {rows} x { cols}
                </small>
            </StyledName>
            <ButtonGroup minimal>
                <Button icon="document-open" onClick={openBoard} />
                <Button icon="trash" intent="danger" onClick={handleDeleteBoard} />
            </ButtonGroup>
        </StyledCard>
    )
}
