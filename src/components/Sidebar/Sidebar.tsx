import React from 'react'
import styled from 'styled-components'
import { dark } from '../../styles/colors'
import SizeInput from '../SizeInput'
import { Label, Button, ButtonGroup, Position, H1, H3, Divider } from "@blueprintjs/core";
import { Tooltip2 } from "@blueprintjs/popover2";
import { numInputCallback, SetNumValue } from '../../types/inputs'
import SpeedInput from '../SpeedInput'

const Container = styled.div`
    min-width: 250px;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: ${dark.sidebar};
    padding: 10px;
    align-items: center;
    justify-content: space-around;

    > * {
        margin: 1em 0;
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
    resetBoard: (random: boolean | undefined) => void,
    togglePlaying: () => void,
}

const Stats = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-self: flex-end;
`

const Count = styled.span`
    color: ${dark.header};
`



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
    iterationCount,
}: Iprops) => {
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        iterateOnce()
    }

    return (
        <Container>
            <H1>Game of Life</H1>
            <Divider />
            <Label>
                Columns
                <SizeInput
                    value={cols}
                    maxValue={50}
                    placeholder="Column count"
                    handleInput={setCols}
                />
            </Label>
            <Label>
                Rows
                <SizeInput
                    value={rows}
                    maxValue={50}
                    placeholder="Row count"
                    handleInput={setRows}
                />
            </Label>
            <Label>
                Speed
                <span className="bp3-text-muted"> (Hz)</span>
                <SpeedInput
                    value={speed}
                    setValue={setSpeed}
                />
            </Label>
            <ButtonGroup>
                <Tooltip2 content="Reset board" position={Position.TOP}>
                    <Button
                        // text="reset"
                        onClick={() => resetBoard(false)}
                        icon="reset"
                        intent="danger"
                        />
                </Tooltip2>
                <Tooltip2 content="Randomize cells" position={Position.TOP}>
                    <Button
                        // text="reset"
                        onClick={() => resetBoard(true)}
                        icon="random"
                    />
                </Tooltip2>
                <Tooltip2 content="Start iterating" position={Position.TOP}>
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
                        // intent="success"
                        onClick={handleClick}
                    />
                </Tooltip2>

            </ButtonGroup>
            <Stats>
                <H3>Iteration count: <Count>{iterationCount}</Count></H3>
            </Stats>
        </Container>
    )
}

export default Sidebar
