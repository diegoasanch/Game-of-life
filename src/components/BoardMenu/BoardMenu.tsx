import React from 'react'
import { Menu, MenuItem, MenuDivider, Icon } from "@blueprintjs/core";

interface Iprops {
    iterateOnce: () => void,
    isPlaying: boolean,
    togglePlaying: () => void,
    resetBoard: (random: boolean | undefined, heart: boolean | undefined) => void,
}

const BoardMenu = ({
    iterateOnce,
    isPlaying,
    togglePlaying,
    resetBoard,
}: Iprops) => {
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
