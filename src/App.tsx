import React from 'react';
import Game from './pages/Game'

import styled from 'styled-components'
const Page = styled.div`
  height: 100vh;
  width: 100vw;
`

function App() {
  return (
    <Page className="bp3-dark .bp3-ui-text">
      <Game />
    </Page>
  );
}

export default App;
