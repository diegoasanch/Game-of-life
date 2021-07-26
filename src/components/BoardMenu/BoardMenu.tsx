import React from 'react'
import { Menu, MenuItem, MenuDivider, Icon, InputGroup, FormGroup, Button } from "@blueprintjs/core";
import styled from 'styled-components';
import { useGameContext } from '../../context/game';
import { useSavedBoardsContext } from '../../context/savedBoards';
import { Board } from '../Models/game';

const StyledForm = styled(FormGroup)`
    padding: 0 0 5px 5px;
    width: calc(100% - 10px);
    margin: 0;

    .save-btn {
        margin-top: 5px;
    }
`

const BoardMenu = () => {

    const {
        iterateOnce,
        isPlaying,
        togglePlaying,
        resetBoard,
        randomizeBoard,
        clearBoard,
        name,
        content,
        setName,
        getShareableLink
    } = useGameContext()

    const { saveBoard } = useSavedBoardsContext()

    const handleNameChange = (event: React.FormEvent<HTMLElement>) => {
        setName((event.target as HTMLInputElement).value)
    }

    const handleSave = () => {
        saveBoard(new Board(null, content, name))
    }

    const handleShare = () => {
        getShareableLink()
    }

    return (
        <Menu>
            <MenuItem
                text={isPlaying ? "Pause" : "Play"}
                icon={isPlaying ? "pause" : "play"}
                onClick={togglePlaying}
                intent="primary"
                labelElement={
                    <span className="bp3-text-muted">
                        P
                    </span>
                }
            />
            <MenuItem
                text="Iterate once"
                icon="step-forward"
                onClick={iterateOnce}
                disabled={isPlaying}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="arrow-right" />
                    </span>
                }
            />

            <MenuDivider />
            <StyledForm
                label="Save board"
                labelFor="name-input"
                labelInfo={
                    <>
                        (<Icon icon="key-shift" />S)
                    </>
                }
            >
                <InputGroup
                    onChange={handleNameChange}
                    value={name}
                    placeholder="untitled_board"
                    id="name-input"
                    autoFocus
                />
                <Button
                    className="save-btn"
                    text={"Save"}
                    icon="floppy-disk"
                    onClick={handleSave}
                    fill
                />

            </StyledForm>
            <MenuItem
                text="Share"
                icon="share"
                onClick={handleShare}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />D
                    </span>
                }
            />

            <MenuDivider />

            <MenuItem
                text="Randomize cells"
                icon="random"
                onClick={randomizeBoard}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />N
                    </span>
                }
            />
            <MenuItem
                text="Clear"
                icon="eraser"
                onClick={clearBoard}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />C
                    </span>
                }
            />
            <MenuItem
                text="Reset"
                icon="reset"
                onClick={resetBoard}
                intent="danger"
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />R
                    </span>
                }
            />
            <MenuDivider />
            <MenuItem
                text="View on GitHub"
                icon="code"
                labelElement={<Icon icon="arrow-top-right" />}
                href="https://github.com/diegoasanch/Game-of-life"
                target="_blank"
            />
        </Menu>
    )
}

export default BoardMenu
