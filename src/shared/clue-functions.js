// useful clue functions

import { CLUE_HAND_OF_TYPE } from './constants';

// create CLUE_HAND_OF_TYPE
export const createClueHandOfType = (handType, solutionHandIndex) => ({
  clueType: CLUE_HAND_OF_TYPE,
  handType,
  solutionHandIndex,
});

export const todoRemove = (hint) => {
  const { handOptionsIndex } = hint;
  return handOptionsIndex;
};
