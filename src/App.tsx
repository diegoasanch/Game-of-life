import React, { useState } from 'react';
import { dark, light } from './styles/colors'
import { CurrentTheme } from './context/theme'
import Game from './pages/Game'
import styled from 'styled-components'
import { FocusStyleManager } from "@blueprintjs/core";

FocusStyleManager.onlyShowFocusOnTabs();

const Page = styled.div`
  height: 100vh;
  width: 100vw;
`

function App() {
  const [isDark, setIsDark] = useState(true)

  const toggleTheme = () => {
    setIsDark(prev => !prev)
  }

  return (
    <CurrentTheme.Provider value={isDark ? dark : light}>
      <Page className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>
        <Game isDark={isDark} toggleTheme={toggleTheme} />
      </Page>
    </CurrentTheme.Provider>
  );
}

export default App;
