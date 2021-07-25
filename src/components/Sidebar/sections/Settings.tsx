import { Alignment, Button, ButtonGroup, Label, Position, Switch } from "@blueprintjs/core"
import { Tooltip2 } from "@blueprintjs/popover2"
import styled from "styled-components"
import { useGameContext } from "../../../context/game"
import { numInputCallback, SetNumValue } from "../../../types/inputs"
import SizeInput from "../../SizeInput"
import SpeedInput from "../../SpeedInput"

const SettingsContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;

    > * {
        margin: .5em 0;
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

export const Settings = () => {
    const {
        rowCount,
        colCount,
        setRowCount,
        setColCount,
        iterateOnce,
        speed,
        setSpeed,
        isPlaying,
        togglePlaying,
        resetBoard,
        randomizeBoard,
        clearBoard,
        highlightNew,
        toggleHighlightNew,
    } = useGameContext()

    const handleColInput: numInputCallback = (valueAsNumber, valueAsString, innputElement) => {
        setColCount(valueAsNumber)
    }
    const handleRowInput: numInputCallback = (valueAsNumber, valueAsString, innputElement) => {
        setRowCount(valueAsNumber)
    }
    const handleSpeed: SetNumValue = (value) => {
        setSpeed(value)
    }
    const handleClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
        iterateOnce()
    }

    return (
        <SettingsContainer>
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
                            value={rowCount}
                            maxValue={250}
                            placeholder="Row count"
                            handleInput={handleRowInput}
                        />
                    </Label>
                    <Label>
                        Columns
                        <SizeInput
                            value={colCount}
                            maxValue={250}
                            placeholder="Column count"
                            handleInput={handleColInput}
                        />
                    </Label>
                </SizeInputRow>
                <Label>
                    Iteration Speed
                    <span className="bp3-text-muted"> (Hz)</span>
                    <SpeedInput
                        value={speed}
                        setValue={handleSpeed}
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
            </SettingsContainer>
    )
}
