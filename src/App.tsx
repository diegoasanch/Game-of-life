import React from 'react';
import { dark, light } from './styles/colors'
import { CurrentTheme, ThemeContext } from './context/theme'
import Game from './pages/Game'
import styled from 'styled-components'
import { FocusStyleManager, HotkeysProvider } from "@blueprintjs/core"
import { useLocalStorage } from 'react-use'
import  {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import SavedGame from './pages/SavedGame';
import SharedGame from './pages/SharedGame';

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
        <ThemeContext.Provider value={
            {
              isDark: !!isDark,
              toggleTheme,
            }
        }>
          <Page className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>

            <Router basename="/">
              <Switch>

                <Route exact path="/saved/:name">
                  <SavedGame />
                </Route>

                <Route exact path="/shared/:dimensions/:content">
                  <SharedGame />
                </Route>

                <Route path="/" exact>
                  <Game fromStorage={false} />
                </Route>

              </Switch>
            </Router>

          </Page>
        </ThemeContext.Provider>
      </CurrentTheme.Provider>
    </HotkeysProvider>
  );
}

export default App;
