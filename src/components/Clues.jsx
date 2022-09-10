import React, { useContext } from 'react';

import Clue from './Clue';

import { clueExists } from '../shared/clue-functions';

import { clueToString } from '../shared/to-text-functions';

import GameStateContext from '../contexts/GameStateContext';

// support function to decide if a clue is to be shown
// a clue is always shown if it is not deduced from another/other clues
// a clue with deduced defined is shown to the user if any of its deduced clues is no longer still in clues
//   - that it, either of those clues was removed by reduceClues() and now they are not available to the user to deduce the deduced clue
// otherwise the deduced clue is not shown
const showClue = (clue, clues) => {
  const { deduced } = clue;
  if (deduced === undefined) {
    return true;
  }

  // the clue is deduced, we need to show it it any of its deduces clues is no longer still in clues
  for (let i = 0; i < deduced.length; i += 1) {
    if (!clueExists(deduced[i], clues)) {
      return true;
    }
  }

  // otherwise the deduced clue is not show
  return false;
};

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
