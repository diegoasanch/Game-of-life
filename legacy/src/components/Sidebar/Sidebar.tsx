import React from 'react'
import styled from 'styled-components'
import { Header } from './sections/Header';
import { Footer } from './sections/Footer';
import { StyledDivider } from '../../styles/sharedStyledComponents';
import { SectionsContainer } from './sections/SectionsContainer';

const Container = styled.div`
    position: relative;
    height: 100vh;
    width: 100%;
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
            <StyledDivider />
            <Footer />
        </Container>
    )
}

export default Sidebar
