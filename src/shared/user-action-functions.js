// the user action functions

import {
  USER_ACTION_APPLY_NEXT_HINT,
  USER_ACTION_TOGGLE_SHOW_CLUE,
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
