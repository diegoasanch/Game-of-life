import { Collapse, Icon } from '@blueprintjs/core'
import React, { useState } from 'react'
import styled from 'styled-components'

const StyledSectionTitle = styled.div`
    display: flex;
    align-items: center;
`

export type SidebarSectionProps = {
    name: string
    startOpen: boolean
    Component: React.ReactNode
}

export const SidebarSection = ({ name, startOpen, Component }: SidebarSectionProps) => {
    const [isOpen, setIsOpen] = useState(startOpen)

    const toggleOpen = () => {
        setIsOpen(prev => !prev)
    }

    return (
        <section onClick={toggleOpen}>
            <StyledSectionTitle>
                <h3>
                    <Icon icon={isOpen ? 'chevron-down' : 'chevron-right'} />
                    <code>{name}</code>
                </h3>
            </StyledSectionTitle>
            <Collapse isOpen={isOpen}>
                { Component }
            </Collapse>
        </section>
    )
}
