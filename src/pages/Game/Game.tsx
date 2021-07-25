import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import CellGrid from '../../components/CellGrid'
import { ISavedBoard } from '../../types/cells'
import { ToggleCellState, useGameContext, useGameHotkeysConfig } from '../../context/game';
import { useInterval } from 'react-use';
import { IthemeProp } from '../../types/styles'
import { ContextMenu2 } from "@blueprintjs/popover2";
import BoardMenu from '../../components/BoardMenu'
import { useHotkeys } from "@blueprintjs/core";

const PageContainer = styled.div<IthemeProp>`
    width: 100%;
    height: 100%;
    background-color: ${props => props.theme.background};
    color: ${props => props.theme.text};
    display: flex;
    flex-direction: row;
`
const SideContainer = styled.div`
    width: 20vw;
    max-width: 330px;
`
const MainContainer = styled.div`
    /* width: calc(100% - 20vw); */
    display: flex;
    flex-direction: column;
    align-items: center;
    height: calc(100% - 2px);
    flex: 1 1;
    border: 1px solid ${props => props.theme.background};

    &:hover {
        border: 1px solid ${props => props.theme.cellHover  + props.theme.highlightTransparency};
    }
`
const ResizedContextMenu = styled(ContextMenu2)`
    height: 100vh;
    width: 100vw;
`

type GameProps = {
    loadedBoard?: ISavedBoard,
    isLoading?: boolean,
}

const Game = ({ loadedBoard, isLoading }: GameProps) => {
    const {
        speed,
        isPlaying,
        toggleState,
        iterateOnce,
        setLoadedBoard
    } = useGameContext()

    useEffect(() => {
        setLoadedBoard(loadedBoard)
    }, [loadedBoard, setLoadedBoard])

    useInterval(() => {
        iterateOnce()
    }, isPlaying ? (1000 / speed) : null)

    const { hotkeysConfig } = useGameHotkeysConfig()
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotkeysConfig)

    return (
        <div onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
            <ToggleCellState.Provider value={toggleState} >
                <ResizedContextMenu content={
                    <BoardMenu />
                }>
                    <PageContainer>

                        <SideContainer>
                            <Sidebar />
                        </SideContainer>

                        <MainContainer>
                            <CellGrid isLoading={!!isLoading} />
                        </MainContainer>

                    </PageContainer>
                </ResizedContextMenu>
            </ToggleCellState.Provider>
        </div>
    )
}

export default Game
