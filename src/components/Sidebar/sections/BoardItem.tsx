import { Card, ButtonGroup, Button, Position, EditableText, Icon } from '@blueprintjs/core';
import { Tooltip2 } from '@blueprintjs/popover2';
import { useState } from 'react';
import { useDebounce } from 'react-use';
import styled from "styled-components"
import { useGameContext } from '../../../context/game';
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

    .bp3-button-group {
        opacity: .4;
    }

    .editIcon {
        opacity: 0;
        margin-left: .5em;
    }

    &:hover .bp3-button-group {
        opacity: 1;
    }
    &:hover .editIcon {
        opacity: 1;
    }
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

const Row = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: baseline;
`

const StyledEditableText = styled(EditableText)`
    width: ${props => Math.max(props.value?.length ?? 0, 5) + 'ch'};
`

export const BoardItem = ({ name, cols, rows, board_content }: ISavedBoard) => {
    const { goToSaved, deleteBoard, renameBoard } = useSavedBoardsContext()
    const { getShareableLink } = useGameContext()
    const [localName, setLocalName] = useState(name)

    const openBoard = () => {
        goToSaved(name)
    }

    const handleDeleteBoard = () => {
        deleteBoard(name)
    }

    const handleShareBoard = () => {
        getShareableLink(board_content)
    }

    const handleNameChange = (newValue: string) => {
        setLocalName(newValue)
    }

    useDebounce(() => {
        if (localName !== name)
            renameBoard(name, localName)
    }, 500, [localName, renameBoard])

    return (
        <StyledCard interactive>
            <StyledName>
                <Row>
                    <StyledEditableText
                        value={localName}
                        onChange={handleNameChange}
                        maxLength={15}
                        placeholder="name"
                        selectAllOnFocus
                    />
                    <Icon icon="edit" intent="primary" className="editIcon" iconSize={13} />
                </Row>
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
