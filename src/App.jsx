import React from 'react';

import PlayArea from './components/PlayArea';

import { GameStateContextProvider } from './contexts/GameStateContext';

const App = () => (
  <GameStateContextProvider>
    <PlayArea />
  </GameStateContextProvider>
);

export default App;
