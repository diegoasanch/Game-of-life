import React from 'react'
import { Tag } from "@blueprintjs/core"
import styled from "styled-components"
import { Settings } from "./Settings"
import { SidebarSection, SidebarSectionProps } from "./SidebarSection"
import { BORDER_RADIUS } from '../../../styles/constants'

const StyledSectionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    overflow-y: scroll;
    padding-right: 2px;

    &::-webkit-scrollbar {
        background-color: ${props => props.theme.sidebar};
        width: 7px;
        border-radius: ${BORDER_RADIUS};
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarBg};
        border-radius: ${BORDER_RADIUS};
    }
    &:hover::-webkit-scrollbar {
        background-color: ${props => props.theme.scrollBarBg};
    }
    &:hover::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarThumb};
    }
`

const sidebarSections: SidebarSectionProps[] = [
    {
        name: 'Settings',
        startOpen: true,
        Component: <Settings />,
    },
    {
        name: 'Saved Boards',
        startOpen: true,
        Component: <Tag large minimal>Coming soon...</Tag>,
    },
]

export const SectionsContainer = () => {
    return (
        <StyledSectionsContainer>
            { sidebarSections.map(section => (
                <SidebarSection {...section} />
            ))}
        </StyledSectionsContainer>
    )
}
