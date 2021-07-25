import { Collapse, Icon } from '@blueprintjs/core'
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSectionTitle = styled.div`
    display: flex;
    align-items: center;
    height: 3em;
    cursor: pointer;
`

export type SidebarSectionProps = {
    name: string
    startOpen: boolean
    Component: React.ReactNode
}

const StyledCollapse = styled(Collapse)`
    padding-left: .5em;
`

const StyledSection = styled.section`
    width: 100%;
`

export const SidebarSection = ({ name, startOpen, Component }: SidebarSectionProps) => {
    const [isOpen, setIsOpen] = useState(startOpen)

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <StyledSection>
            <StyledSectionTitle onClick={toggleOpen}>
                <h3>
                    <Icon icon={isOpen ? 'chevron-down' : 'chevron-right'} />
                    <code>{name}</code>
                </h3>
            </StyledSectionTitle>
            <StyledCollapse isOpen={isOpen}>
                { Component }
            </StyledCollapse>
        </StyledSection>
    )
}
