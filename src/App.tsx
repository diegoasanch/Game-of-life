import React from 'react';
import { dark, light } from './styles/colors'
import { CurrentTheme } from './context/theme'
import Game from './pages/Game'
import styled from 'styled-components'
import { FocusStyleManager, HotkeysProvider } from "@blueprintjs/core";
import { useLocalStorage } from 'react-use'

FocusStyleManager.onlyShowFocusOnTabs();

const Page = styled.div`
  height: 100vh;
  width: 100vw;
`

function App() {
  const [isDark, setIsDark] = useLocalStorage('isDark', true)

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <HotkeysProvider>
      <CurrentTheme.Provider value={isDark ? dark : light}>
        <Page className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>
          <Game isDark={isDark ?? false} toggleTheme={toggleTheme} />
        </Page>
      </CurrentTheme.Provider>
    </HotkeysProvider>
  );
}

export default App;
