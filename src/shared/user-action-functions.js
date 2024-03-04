// the user action functions

import {
  USER_ACTION_APPLY_NEXT_HINT,
  USER_ACTION_TOGGLE_SHOW_CLUE,
  USER_ACTION_SET_SUIT_OPTION_ONLY,
  USER_ACTION_SET_SUIT_OPTION_ONLY_TO_CARDS_IN_HAND,
} from './constants';

// create USER_ACTION_APPLY_NEXT_HINT
export const createUserActionApplyNextHint = () => ({
  userActionType: USER_ACTION_APPLY_NEXT_HINT,
});

// create USER_ACTION_TOGGLE_CLUE
export const createUserActionToggleShowClue = (clueIndex) => ({
  userActionType: USER_ACTION_TOGGLE_SHOW_CLUE,
  clueIndex,
});

// create USER_ACTION_SET_SUIT_OPTION_ONLY
export const createUserActionSetSuitOptionOnly = (suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => ({
  userActionType: USER_ACTION_SET_SUIT_OPTION_ONLY,
  suitOptionsIndex,
  solutionOptionsIndex,
  handOptionsIndex,
});

// create USER_ACTION_SET_SUIT_OPTION_ONLY_TO_CARDS_IN_HAND
export const createUserActionSetSuitOptionOnlyToCardsInHand = (suitOptionsIndex, solutionOptionsIndex) => ({
  userActionType: USER_ACTION_SET_SUIT_OPTION_ONLY_TO_CARDS_IN_HAND,
  suitOptionsIndex,
  solutionOptionsIndex,
});
