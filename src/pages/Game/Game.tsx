import React, { useEffect } from 'react'
import styled from 'styled-components'
import Sidebar from '../../components/Sidebar'
import CellGrid from '../../components/CellGrid'
import { boardData, ISavedBoard } from '../../types/cells'
import { GameContextProvider, ToggleCellState, useGameContext, useGameHotkeysConfig } from '../../context/game';
import { useInterval } from 'react-use';
import { IthemeProp } from '../../types/styles'
import { createBoard } from './gameFunctions'
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
    width: 17em;
    z-index: 1;
`
const MainContainer = styled.div`
    width: calc(100% - 17em);
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
`
const ResizedContextMenu = styled(ContextMenu2)`
    height: 100vh;
    width: 100vw;
`

type GameProps = {
    fromStorage: boolean,
    loadedBoard?: ISavedBoard,
    isLoading?: boolean,
}

const GameWrapper = (props: GameProps) => {
    return (
        <GameContextProvider>
            <Game {...props} />
        </GameContextProvider>
    )
}

const Game = ({ fromStorage, loadedBoard, isLoading }: GameProps) => {
    const {
        colCount,
        rowCount,
        setContent,
        setResetCheckpoint,
        speed,
        isPlaying,
        setName,
        toggleState,
        iterateOnce,
        initializeBoard
    } = useGameContext()

    useEffect(() => {
        let checkpoint: boardData | undefined;

        if (fromStorage) {
            setContent(loadedBoard?.board_content)
            setName(loadedBoard?.name ?? 'untitled_board')
            checkpoint = loadedBoard?.board_content
        }
        else {
            initializeBoard(rowCount, colCount, false, true)
            checkpoint = createBoard(rowCount, colCount, false, true)
        }
        setResetCheckpoint(checkpoint)
    // eslint-disable-next-line
    }, [fromStorage, loadedBoard?.board_content])

    useInterval(() => {
        iterateOnce()
    }, isPlaying ? (1000 / speed) : null)

    const hotKeysConfig = useGameHotkeysConfig()
    const { handleKeyDown, handleKeyUp } = useHotkeys(hotKeysConfig)

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

export default GameWrapper
