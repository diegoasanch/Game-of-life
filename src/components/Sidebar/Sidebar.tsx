import React from 'react'
import styled from 'styled-components'
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { StyledDivider } from '../../styles/sharedStyledComponents';
import { Settings } from './sections/Settings';

const Container = styled.div`
    position: relative;
    height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: ${props => props.theme.sidebar};
    padding: 8px;
    align-items: center;
    justify-content: space-around;
`

const Sidebar = () => {
    return (
        <Container>
            <Header />
            <StyledDivider />
            <SectionsContainer />
            <Footer />
        </Container>
    )
}

const StyledSectionsContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 100%;
    /* outline: 1px solid red; */
    overflow-y: scroll;

    &::-webkit-scrollbar {
        background-color: ${props => props.theme.sidebar};
        width: 7px;
        border-radius: 3px;
    }
    &::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarThumb};
        border-radius: 3px;
    }

    &:hover::-webkit-scrollbar {
        background-color: ${props => props.theme.scrollBarBg};
    }
    &:hover::-webkit-scrollbar-thumb {
        background-color: ${props => props.theme.scrollBarThumb};
    }
`

const SectionsContainer = () => {
    return (
        <StyledSectionsContainer>
            <Settings />
        </StyledSectionsContainer>
    )
}

export default Sidebar
