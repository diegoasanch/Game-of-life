import React from 'react';
import type { AppProps } from 'next/app';
// ... import other necessary components and contexts ...

import styled, { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { FocusStyleManager, HotkeysProvider } from '@blueprintjs/core';
import { ThemeProvider, useThemeContext } from '../src/context/theme';
import { SavedBoardsProvider } from '../src/context/savedBoards';
import { GameContextProvider } from '../src/context/game';

// Initialize focus styles
FocusStyleManager.onlyShowFocusOnTabs();

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <HotkeysProvider>
      <ThemeProvider>
        <StyledComponentsThemeProvider>
          <ThemedPageContainer>
            <Component {...pageProps} />
          </ThemedPageContainer>
        </StyledComponentsThemeProvider>
      </ThemeProvider>
    </HotkeysProvider>
  );
}

export default MyApp;

// ... existing StyledComponentsThemeProvider and ThemedPageContainer components ...
