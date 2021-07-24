import React, { useContext } from 'react'
import styled from 'styled-components'
import { dark } from '../../styles/colors'
import SizeInput from '../SizeInput'
import { Label, Button, ButtonGroup, Position, H1, H3, H4, Divider, Switch, Alignment, Icon, H6 } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { numInputCallback, SetNumValue } from '../../types/inputs'
import SpeedInput from '../SpeedInput'
import { CurrentTheme } from '../../context/theme'
import { IthemeProp } from '../../types/styles'
import { Header } from './Header';

const Container = styled.div<IthemeProp>`
    position: relative;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.sidebar};
    padding: 8px;
    align-items: center;
    justify-content: stretch;
`
const Stats = styled.footer<IthemeProp>`
    position: absolute;
    bottom: 5px;
    left: 10px;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-self: end;
    margin-top: 10px;
    width: 90%;
    height: 5em;

    background-color: ${props => props.theme.sidebar};
    z-index: 34;

    .divider {
        margin-bottom: 10px;
    }
`

const Count = styled.span`
    color: ${dark.header};
`

const StyledDivider = styled(Divider)`
    width: 100%;
`
const Settings = styled.div<IthemeProp>`
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow-y: auto;
    width: 100%;
    margin-bottom: 4.5em;
    /* margin-right: 5px; */

    > * {
        margin: .5em 0;
    }
    &::-webkit-scrollbar {
        /* display: none; */
        background-color: ${props => props.theme.scrollBarBg};
        width: 5px;
        height: 5px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarThumb};
    }
    /* &:hover {
        margin-right: 0;
        &::-webkit-scrollbar {
            display: contents;
        }
    } */
`

const SectionHeader = styled(H3)`
    align-self: flex-flex-start;
`


const Shoutout = styled(H6)`
    font-size: .9em !important;

    a &:not(:hover) {
        color: inherit;
    }
`
const SizeInputRow = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
    justify-items: center;
    align-items: center;

    > * {
        padding: 0 5%;
    }
`

interface Iprops {
    rows: number,
    cols: number,
    setRows: numInputCallback,
    setCols: numInputCallback,
    speed: number,
    setSpeed: SetNumValue,
    isPlaying: boolean,
    iterationCount: number,
    iterateOnce: () => void,
    resetBoard: () => void,
    randomizeBoard: () => void,
    clearBoard: () => void,
    togglePlaying: () => void,
    readonly isDark: boolean,
    toggleTheme: () => void,
    readonly highlightNew: boolean,
    toggleHighlightNew: () => void,
}



const Sidebar = ({
    rows,
    cols,
    setRows,
    setCols,
    iterateOnce,
    speed,
    setSpeed,
    isPlaying,
    togglePlaying,
    resetBoard,
    randomizeBoard,
    clearBoard,
    iterationCount,
    isDark,
    toggleTheme,
    highlightNew,
    toggleHighlightNew,
}: Iprops) => {

    const theme = useContext(CurrentTheme)

    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        iterateOnce()
    }


    return (
        <Container theme={theme}>

            <Header isDark={isDark} toggleTheme={toggleTheme} />

            <StyledDivider />

            <Settings theme={theme}>

                <SectionHeader>Settings</SectionHeader>

                <Switch
                    alignIndicator={Alignment.RIGHT}
                    checked={highlightNew}
                    onChange={toggleHighlightNew}
                    label="Highlight new cells"
                    // large
                />
                <SizeInputRow>
                    <Label>
                        Rows
                        <SizeInput
                            value={rows}
                            maxValue={250}
                            placeholder="Row count"
                            handleInput={setRows}
                        />
                    </Label>
                    <Label>
                        Columns
                        <SizeInput
                            value={cols}
                            maxValue={250}
                            placeholder="Column count"
                            handleInput={setCols}
                        />
                    </Label>
                </SizeInputRow>
                <Label>
                    Iteration Speed
                    <span className="bp3-text-muted"> (Hz)</span>
                    <SpeedInput
                        value={speed}
                        setValue={setSpeed}
                    />
                </Label>

                <ButtonGroup large>
                    <Tooltip2 content={`${isPlaying ? 'Stop': 'Start'} iterating`} position={Position.TOP}>
                        <Button
                            text={isPlaying ? "Pause" : "Play"}
                            icon={isPlaying ? "pause" : "play"}
                            intent="primary"
                            onClick={togglePlaying}
                        />
                    </Tooltip2>
                    <Tooltip2 content="Step-by-step" position={Position.TOP}>
                        <Button
                            rightIcon="step-forward"
                            onClick={handleClick}
                            disabled={isPlaying}
                        />
                    </Tooltip2>

                </ButtonGroup>
                <ButtonGroup>
                    <Tooltip2 content="Reset board" position={Position.TOP}>
                        <Button
                            onClick={resetBoard}
                            icon="reset"
                            intent="danger"
                        />
                    </Tooltip2>
                    <Tooltip2 content="Clear board" position={Position.TOP}>
                        <Button
                            onClick={clearBoard}
                            icon="eraser"
                        />
                    </Tooltip2>
                    <Tooltip2 content="Randomize cells" position={Position.TOP}>
                        <Button
                            text="Random"
                            onClick={randomizeBoard}
                            icon="random"
                        />
                    </Tooltip2>
                </ButtonGroup>
            </Settings>


            <Stats theme={theme}>
                <StyledDivider className="divider" />

                <H4>Iteration count: <Count>{iterationCount}</Count></H4>
                <Shoutout className="bp3-text-muted">
                    Made with 💖 by&nbsp;
                    <a href="https://github.com/diegoasanch" target="_blank" rel="noopener noreferrer">
                        Diego.
                    </a>
                </Shoutout>

            </Stats>
        </Container>
    )
}

export default Sidebar
