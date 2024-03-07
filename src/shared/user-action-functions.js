// the user action functions

import {
  USER_ACTION_APPLY_NEXT_HINT,
  USER_ACTION_TOGGLE_SHOW_CLUE,
  USER_ACTION_SET_SUIT_OPTION_ONLY,
  USER_ACTION_SET_SUIT_OPTION_ONLY_TO_CARDS_IN_HAND,
  USER_ACTION_RESET_SUIT_OPTIONS,
  USER_ACTION_TURN_OFF_SUIT_IN_HAND_IF_ON_AND_NOT_PLACED,
  USER_ACTION_TOGGLE_SUIT_OPTION,
  USER_ACTION_SET_NUMBER_OPTION_ONLY,
  USER_ACTION_RESET_NUMBER_OPTIONS,
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

// create USER_ACTION_RESET_SUIT_OPTIONS
export const createUserActionResetSuitOptions = (solutionOptionsIndex, handOptionsIndex) => ({
  userActionType: USER_ACTION_RESET_SUIT_OPTIONS,
  solutionOptionsIndex,
  handOptionsIndex,
});

// create USER_ACTION_TURN_OFF_SUIT_IN_HAND_IF_ON_AND_NOT_PLACED
export const createUserActionTurnOffSuitInHandIfOnAndNotPlaced = (suitOptionsIndex, solutionOptionsIndex) => ({
  userActionType: USER_ACTION_TURN_OFF_SUIT_IN_HAND_IF_ON_AND_NOT_PLACED,
  suitOptionsIndex,
  solutionOptionsIndex,
});

// create USER_ACTION_TOGGLE_SUIT_OPTION
export const createUserActionToggleSuitOption = (suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => ({
  userActionType: USER_ACTION_TOGGLE_SUIT_OPTION,
  suitOptionsIndex,
  solutionOptionsIndex,
  handOptionsIndex,
});

// create USER_ACTION_SET_NUMBER_OPTION_ONLY
export const createUserActionSetNumberOptionOnly = (number, solutionOptionsIndex, handOptionsIndex) => ({
  userActionType: USER_ACTION_SET_NUMBER_OPTION_ONLY,
  number,
  solutionOptionsIndex,
  handOptionsIndex,
});

// create USER_ACTION_RESET_NUMBER_OPTIONS
export const createUserActionResetNumberOptions = (solutionOptionsIndex, handOptionsIndex) => ({
  userActionType: USER_ACTION_RESET_NUMBER_OPTIONS,
  solutionOptionsIndex,
  handOptionsIndex,
});
