import { Card, H6, ButtonGroup, Button, Position } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import styled from "styled-components"
import { useGameContext } from '../../../context/game';
import { useSavedBoardsContext } from '../../../context/savedBoards';
import { ISavedBoard } from "../../../types/cells"
import { getGameLink } from '../../../utils/url';

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

export const BoardItem = ({ name, cols, rows, board_content }: ISavedBoard) => {
    const { goToSaved, deleteBoard } = useSavedBoardsContext()
    const { getShareableLink } = useGameContext()

    const openBoard = () => {
        goToSaved(name)
    }

    const handleDeleteBoard = () => {
        deleteBoard(name)
    }

    const handleShareBoard = () => {
        getShareableLink(board_content)
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
                <Tooltip2 content="Open" position={Position.TOP} minimal>
                    <Button icon="document-open" onClick={openBoard} />
                </Tooltip2>

                <Tooltip2 content="Share" position={Position.TOP} minimal>
                    <Button icon="link" onClick={handleShareBoard} />
                </Tooltip2>

                <Tooltip2
                    content="Delete"
                    position={Position.TOP}
                    minimal
                    intent="danger"
                >
                    <Button icon="trash" intent="danger" onClick={handleDeleteBoard} />
                </Tooltip2>
            </ButtonGroup>
        </StyledCard>
    )
}
