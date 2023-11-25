import React, { useState } from 'react'
import { useSavedBoardsContext } from '../../../context/savedBoards';
import { SidebarItemContainer } from './styles';
import styled from 'styled-components';
import { BoardItem } from './BoardItem';
import { Icon, InputGroup, FormGroup, Button, Card, Callout, H4, Position } from "@blueprintjs/core";
import { useGameContext } from '../../../context/game';
import { Board } from '../../Models/game';
import { SidebarSection } from './SidebarSection';
import { Tooltip2 } from '@blueprintjs/popover2';

const StyledSidebarItemContainer = styled(SidebarItemContainer)`
    align-items: flex-start;
`

export const SavedBoards = () => {
    return (
        <>
            <StyledSidebarItemContainer>
                <SavedBoardsInner />
            </StyledSidebarItemContainer>
        </>
    )
}

const StyledForm = styled(FormGroup)`
    padding: 0 0 5px 5px;
    width: calc(100% - 10px);
    margin: 0;
    margin-bottom: 1em;

    .save-btn {
        margin-top: 5px;
    }
`

const StyledCard = styled(Card)`
    padding: 7px;
    width: 100%;

    .bp3-form-group {
        margin: 0;
    }
`

export const SavedBoardsInner = () => {
    const { boards, saveBoard } = useSavedBoardsContext()
    const { name, content, setName } = useGameContext()
    const [isNameInputFocused, setIsNameInputFocused] = useState(false)


    const handleSave = () => {
        saveBoard(new Board(null, content, name))
    }

    const handleNameChange = (event: React.FormEvent<HTMLElement>) => {
        setName((event.target as HTMLInputElement).value)
    }

    const handleFormSubmit = (event: any) => {
        event.preventDefault()
        handleSave()
    }

    const handleInputFocus = () => {
        console.log('Name input focus')
        setIsNameInputFocused(true)
    }

    const handleInputBlur = () => {
        console.log('Name input blur')
        setIsNameInputFocused(false)
    }

    return (
        <>
            <StyledCard>
                <StyledForm
                    label="Save current board"
                    labelFor="name-input"
                    labelInfo={
                        <>
                            { isNameInputFocused ?
                                <span>
                                    enter<Icon icon="key-enter" />
                                </span>
                            :
                                <span>
                                    <Icon icon="key-shift" />shift + S
                                </span>
                            }
                        </>
                    }
                >
                    <form onSubmit={handleFormSubmit}>
                        <InputGroup
                            onChange={handleNameChange}
                            onFocus={handleInputFocus}
                            onBlur={handleInputBlur}
                            value={name}
                            placeholder="untitled_board"
                            id="name-input"
                        />
                    </form>
                    <Tooltip2
                        position={Position.TOP}
                        content={
                            <span>
                                <Icon icon="key-shift" />shift + S
                            </span>
                        }
                    >
                        <Button
                            className="save-btn"
                            text={"Save"}
                            icon="floppy-disk"
                            onClick={handleSave}
                            fill
                        />
                    </Tooltip2>

                </StyledForm>
            </StyledCard>
            <SidebarSection
                name="Saved Boards"
                startOpen
                Component={
                    <>
                        { boards.length > 0 && boards.map(board => (
                            <BoardItem
                                isActive={board.name === name}
                                key={"saved_board_" + board.name}
                                {...board}
                            />
                        ))}
                        { !boards.length && (
                            <Callout intent="primary">
                                <H4>No saved boards...</H4>
                                Save a board and it will apear here.
                            </Callout>
                        )}
                    </>
                }
            />

        </>
    )
}
