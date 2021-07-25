import React from 'react';
import Game from './pages/Game'
import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components'
import { FocusStyleManager, HotkeysProvider } from "@blueprintjs/core"
import SavedGame from './pages/SavedGame'
import SharedGame from './pages/SharedGame'
import  {
  HashRouter as Router,
  Switch,
  Route,
} from 'react-router-dom'
import { ThemeProvider, useThemeContext } from './hooks/useTheme';

FocusStyleManager.onlyShowFocusOnTabs();

const Page = styled.div`
  height: 100vh;
  width: 100vw;
`

function App() {

  return (
    <HotkeysProvider>
      <ThemeProvider>
        <StyledComponentsThemeProvider>
          <ThemedPageContainer>

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

          </ThemedPageContainer>
        </StyledComponentsThemeProvider>
      </ThemeProvider>
    </HotkeysProvider>
  );
}

export default App;

const StyledComponentsThemeProvider = ({ children }: any) => {
  const { theme, isDark, toggleTheme } = useThemeContext()

  return (
    <StyledThemeProvider theme={{ ...theme, isDark, toggleTheme }}>
      {children}
    </StyledThemeProvider>
  )
}

const ThemedPageContainer = ({ children }: any) => {
  const { isDark } = useThemeContext()

  return (
    <Page className={`.bp3-ui-text ${isDark ? 'bp3-dark' : ''}`}>
      {children}
    </Page>
  )

}
