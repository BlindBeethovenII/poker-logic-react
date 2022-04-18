import React, { useState, useMemo } from 'react';

import PropTypes from 'prop-types';

import { createSolutionHands } from '../shared/card-functions';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // show a win
  const [showWin] = useState(false);

  // the hands of the solution
  const [solutionHands] = useState(createSolutionHands());

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // have we just won
    showWin,

    // the hands of the solution
    solutionHands,
  }), [
    showWin,
    solutionHands,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
