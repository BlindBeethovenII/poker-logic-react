/* eslint-disable import/prefer-default-export */
// the user action functions

import {
  USER_ACTION_APPLY_NEXT_HINT,
} from './constants';

// create USER_ACTION_APPLY_NEXT_HINT
export const createUserActionApplyNextHint = () => ({
  userActionType: USER_ACTION_APPLY_NEXT_HINT,
});
