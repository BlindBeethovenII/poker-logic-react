import React, { useContext } from 'react';

import Clue from './Clue';

import { showDeducedClue } from '../shared/clue-functions';

import { clueToString } from '../shared/to-text-functions';

import GameStateContext from '../contexts/GameStateContext';

const Clues = () => {
  const { clues, showClues, showHiddenClues } = useContext(GameStateContext);

  // to get round key array restriction
  const genKey = (i) => `clue_${i}`;

  const cluesToShow = [];

  // we now keep track of the index in the final list of cluesToShow, for showing on the screen with no gaps
  let clueShowIndex = 0;

  clues.forEach((clue, i) => {
    // decide if a deduced clue should be shown - in most situations we don't show a deduced clue as the use has to work those out for themselves
    if (showDeducedClue(clue, clues)) {
      // we now use showHiddenClues to decide which clues are currently showing
      if (showHiddenClues !== showClues[i]) {
        cluesToShow.push(<Clue key={genKey(i)} clueText={clueToString(clue, true)} clueIndex={i} clueShowIndex={clueShowIndex} />);
        clueShowIndex += 1;
      }
    }
  });

  return cluesToShow;
};

export default Clues;
