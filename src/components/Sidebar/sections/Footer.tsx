import { H4, H6 } from '@blueprintjs/core'
import React from 'react'
import styled from 'styled-components'
import { useGameContext } from '../../../context/game'
import { dark } from '../../../styles/colors'
import { StyledDivider } from '../../../styles/sharedStyledComponents'

const Count = styled.span`
    color: ${dark.header};
`

const Shoutout = styled(H6)`
    font-size: .9em !important;

    a &:not(:hover) {
        color: inherit;
    }
`

const Stats = styled.footer`
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

export const Footer = () => {
    const { iterationCount } = useGameContext()
    return (
        <Stats>
            <StyledDivider className="divider" />

            <H4>Iteration count: <Count>{iterationCount}</Count></H4>
            <Shoutout className="bp3-text-muted">
                Made with 💖 by&nbsp;
                <a href="https://github.com/diegoasanch" target="_blank" rel="noopener noreferrer">
                    Diego.
                </a>
            </Shoutout>

        </Stats>
    )
}
