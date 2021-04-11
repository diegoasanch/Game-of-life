import React from 'react'
import { Menu, MenuItem, MenuDivider, Icon, InputGroup, H3, H4, FormGroup, Button } from "@blueprintjs/core";
import styled from 'styled-components';

const StyledForm = styled(FormGroup)`
    padding: 0 0 5px 5px;
    width: calc(100% - 10px);
    margin: 0;

    .save-btn {
        margin-top: 5px;
    }
`

interface Iprops {
    iterateOnce: () => void,
    isPlaying: boolean,
    togglePlaying: () => void,
    resetBoard: (random: boolean | undefined, heart: boolean | undefined) => void,
    name: string,
    setName: (name: string) => void,
    saveBoard: () => void,
    share: () => void,
}

const BoardMenu = ({
    iterateOnce,
    isPlaying,
    togglePlaying,
    resetBoard,
    name,
    setName,
    saveBoard,
    share,
}: Iprops) => {

    const handleNameChange = (event: React.FormEvent<HTMLElement>) => {
        // console.log({changed_name})
        setName((event.target as HTMLInputElement).value)
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
                    onClick={saveBoard}
                    fill
                />

            </StyledForm>
            <MenuItem
                text="Share"
                icon="share"
                onClick={share}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />H
                    </span>
                }
            />

            <MenuDivider />

            <MenuItem
                text="Randomize cells"
                icon="random"
                onClick={() => resetBoard(true, false)}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />N
                    </span>
                }
            />
            <MenuItem
                text="Clear board"
                icon="eraser"
                onClick={() => resetBoard(false, false)}
                labelElement={
                    <span className="bp3-text-muted">
                        <Icon icon="key-shift" />C
                    </span>
                }
            />
            <MenuItem
                text="Reset board"
                icon="reset"
                onClick={() => resetBoard(false, true)}
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
