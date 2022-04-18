import React from 'react';

import PlayArea from './components/PlayArea';
import GitInfo from './components/GitInfo';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
    <GitInfo />
  </GameStateContextProvider>
);

export default App;
