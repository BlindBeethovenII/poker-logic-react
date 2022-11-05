import React, { useContext } from 'react';

import Clue from './Clue';

import { showClue } from '../shared/clue-functions';

import { clueToString } from '../shared/to-text-functions';

import GameStateContext from '../contexts/GameStateContext';

const Clues = () => {
  const { clues } = useContext(GameStateContext);

  // to get round key array restriction
  const genKey = (i) => `clue_${i}`;

  const cluesResult = [];
  clues.forEach((clue, i) => {
    // decide if a clue - in most situations we don't show a deduced clue as the use has to work those out for themselves
    if (showClue(clue, clues)) {
      cluesResult.push(<Clue key={genKey(i)} clueText={clueToString(clue, true)} clueIndex={i} />);
    }
  });

  return cluesResult;
};

export default Clues;
