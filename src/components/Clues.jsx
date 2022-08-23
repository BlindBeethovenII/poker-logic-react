import React, { useContext } from 'react';

import Clue from './Clue';

import { clueToText } from '../shared/clue-functions';

import GameStateContext from '../contexts/GameStateContext';

const Clues = () => {
  const { clues } = useContext(GameStateContext);

  // to get round key array restriction
  const genKey = (i) => `clue_${i}`;

  const cluesResult = [];
  clues.forEach((clue, i) => {
    // don't show deduced clues - the use has to work those out for themselves
    if (!clue.deduced) {
      cluesResult.push(<Clue key={genKey(i)} clueText={clueToText(clue, i)} clueIndex={i} />);
    }
  });

  return cluesResult;
};

export default Clues;
