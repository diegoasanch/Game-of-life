import React from 'react'
import styled from 'styled-components'
import { Alignment, H1, Icon, Position, Switch } from '@blueprintjs/core'
import packageJson from '../../../../package.json'
import { Tooltip2 } from '@blueprintjs/popover2'
import { useThemeContext } from '../../../context/theme'

const StyledHeader = styled(H1)`
    font-size: 3.5em !important;
    line-height: .9em !important;
    font-weight: bold;
    align-self: flex-start;
`
const HeaderContainer = styled.header`
    position: relative;
    width: 100%;
`
const StyledSwitch = styled(Switch)`
    position: absolute;
    bottom: 0;
    right: 0;
`
const InlineIcon = styled(Icon)`
    display: inline-block;
    vertical-align: super;
    margin-left: .2em;
`

export const Header = () => {
    const { isDark, toggleTheme } = useThemeContext()
    return (
        <HeaderContainer>
            <Tooltip2 content={HeaderTooltip} position={Position.RIGHT}>
                <StyledHeader>
                    Game <br/>
                    of <br/>
                    Life
                    <InlineIcon icon="info-sign" intent="primary"/>
                </StyledHeader>
            </Tooltip2>
            <StyledSwitch
                alignIndicator={Alignment.RIGHT}
                checked={isDark}
                onChange={toggleTheme}
                innerLabel="🌞"
                innerLabelChecked="🌚"
                large
            />
        </HeaderContainer>
    )
}

const TooltipContent = styled.div`
    width: 40vw;
    max-width: 1000px;
    min-width: 500px;
    padding: 1em;
`
const HeaderTooltip = (
    <TooltipContent>
        <h1>Conway's Game of Life <span className="bp3-text-muted"> - v{packageJson.version}</span></h1>
        <p>
            &emsp; Is a <strong>cellular automaton</strong> devised by the
            British mathematician John
            Horton Conway in 1970. It is a zero-player game, meaning that its
            evolution is determined by its initial state, requiring no further
            input.<br/>
            &emsp; One interacts with the Game of Life by creating an initial
            configuration and observing how it evolves.

        </p>
        <h2>How to play?</h2>
        <p>
            &emsp; Click on a cell to change its state. Change as many cells as you want and
            press <strong><Icon icon="play"/> Play</strong>!
            <br/>
            &emsp; Alternatively, click the <strong><Icon icon="step-forward"/> Step by step </strong>
            button to evolve the board one cycle at a time.
        </p>
        <h2>Rules</h2>
        <ul>
            <li>Any live cell with fewer than two live neighbours dies, as if by underpopulation.</li>
            <li>Any live cell with two or three live neighbours lives on to the next generation.</li>
            <li>Any live cell with more than three live neighbours dies, as if by overpopulation.</li>
            <li>Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.</li>
        </ul>
    </TooltipContent>
)
