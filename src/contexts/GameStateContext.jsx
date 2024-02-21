import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import shuffle from 'lodash.shuffle';

import { createSolution } from '../shared/card-functions';

import {
  createSolutionOptions,
  setSuitOptionOnlyInSolutionOptions,
  toggleSuitOptionInSolutionOptions,
  resetSuitOptionsInSolutionOptions,
  setNumberOptionOnlyInSolutionOptions,
  toggleNumberOptionInSolutionOptions,
  resetNumberOptionsInSolutionOptions,
  getCardsAvailable,
  isSolutionOptionsComplete,
  solutionOptionsValid,
  countSuitsInCardOptions,
  countNumbersInCardOptions,
  getSuitOptionsValueInCardOptions,
  getNumberOptionsValueInCardOptions,
} from '../shared/solution-functions';

import { getHints } from '../shared/get-hints-functions';

import {
  applyNextHintsToSolutionOptions,
  applyAllHintsToSolutionOptions,
} from '../shared/apply-hints-functions';

import {
  createCluesForSolutionHands,
  createInitialShowClues,
  sortCluesShowing,
  showDeducedClue,
} from '../shared/clue-functions';

import { addInDeducedClues } from '../shared/get-deduced-clues-functions';

import { createUserActionApplyNextHint } from '../shared/user-action-functions';

import { clueToText } from '../shared/to-text-functions';

import {
  solution1,
  clues1,
  solution2,
  clues2,
  solution3,
  clues3,
  solution4,
  clues4,
  solution5,
  clues5,
  solution6,
  clues6,
  solution7,
  clues7,
  solution8,
  clues8,
  solution9,
  clues9,
  solution10,
  clues10,
  solution11,
  clues11,
  solution12,
  clues12,
  solution13,
  clues13,
  solution14,
  clues14,
  solution15,
  clues15,
} from '../shared/hard-coded-hands';

import {
  SOLUTION_OPTIONS_STATE_OK,
  SOLUTION_OPTIONS_STATE_INVALID,
  SOLUTION_OPTIONS_STATE_DONE,
  CLUE_HAND_OF_TYPE,
  CLUES_BASIC,
} from '../shared/constants';

import logIfDevEnv from '../shared/logIfDevEnv';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // show a win
  const [showWin] = useState(false);

  // a solution - which is an object with {solutionHands, missingNumber}
  // TODO - include people in the solution
  const [solution, setSolution] = useState(solution1);

  // solution options, being an array of 4 hand options
  // hand options, being an array of 5 card options
  // each card options is on object of
  //   suitOptions: array of 4 bools - S, H, D, C - true means visible - if only one true then that is the selected number
  //   numberOptions: array of 13 bools - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number (missingNumber is always set to false)
  const [solutionOptions, _setSolutionOptions] = useState(() => createSolutionOptions(solution.missingNumber));

  // the state of the solution options
  const [solutionOptionsState, setSolutionOptionsState] = useState(SOLUTION_OPTIONS_STATE_OK);

  // cards available are suit sorted cards from the generated solution
  const [cardsAvailable, setCardsAvailable] = useState(() => getCardsAvailable(solution.solutionHands));

  // clues
  const [clues, setClues] = useState(() => addInDeducedClues(clues1));

  // show of hide each clue
  const [showClues, setShowClues] = useState(() => createInitialShowClues(clues));

  // show the hidden clues
  const [showHiddenClues, setShowHiddenClues] = useState(false);

  // show or hide the solution
  const [showSolution, setShowSolution] = useState(false);

  // the next hard coded solution for the new solution button
  const [nextHardCodedSolution, setNextHardCodedSolution] = useState(2);

  // which solution we are looking at
  const [currentSolutionLabel, setCurrentSolutionLabel] = useState('Hard-coded Puzzle 1');

  // show the spinkit circle
  const [showSpinKitCircle, setShowSpinKitCircle] = useState(false);

  // hints
  const [nextHint, setNextHint] = useState(undefined);

  // user actions
  const [userActions, setUserActions] = useState([]);
  const [userActionsIndex, setUserActionsIndex] = useState(-1);

  // --------------------------------------------------------------------- //
  // replacement setSolutionOptions that sets solutionOptionsState as well //
  // --------------------------------------------------------------------- //

  const setSolutionOptions = (newSolutionOptions, solutionHands, theCardsAvailable) => {
    _setSolutionOptions(newSolutionOptions);
    let newSolutionOptionsState = SOLUTION_OPTIONS_STATE_OK;
    if (!solutionOptionsValid(newSolutionOptions, solutionHands)) {
      newSolutionOptionsState = SOLUTION_OPTIONS_STATE_INVALID;
    } else if (isSolutionOptionsComplete(theCardsAvailable, newSolutionOptions)) {
      newSolutionOptionsState = SOLUTION_OPTIONS_STATE_DONE;
    }
    setSolutionOptionsState(newSolutionOptionsState);
  };

  // --------------------- //
  // user action functions //
  // --------------------- //

  const addUserAction = useCallback((userAction) => {
    // we need to keep the userActions up to userActionsIndex and then add this userAction to the end
    setUserActions([...userActions.slice(0, userActionsIndex + 1), userAction]);

    // and increase the index
    setUserActionsIndex(userActionsIndex + 1);
  }, [userActions, userActionsIndex]);

  // undo the user action at the userActionsIndex, moving the userActionsIndex back one
  const undoUserAction = useCallback(() => {
    // first check we have an user action to undo (the UndoButton should have been invisible in this case - but checking anyway)
    if (userActionsIndex < 0) {
      // nothing we can do
      return;
    }

    // destruct the solution
    const { missingNumber, solutionHands } = solution;

    // start with a new solution options
    let newSolutionOptions = createSolutionOptions(missingNumber);

    // TODO - FOR NOW WE ASSUME ALL USER ACTIONS ARE APPLY_NEXT_HINT - NEEDS SERIOUS REWORK
    // do all the actions but not the last one, based on our current user actions index
    for (let i = 0; i < userActionsIndex; i += 1) {
      // apply next hint
      newSolutionOptions = applyNextHintsToSolutionOptions(newSolutionOptions, solution, clues, cardsAvailable, false);

      // this should always provide a solutionOptions
      if (!newSolutionOptions) {
        console.error('undoUserAction: applyNextHintsToSolutionOptions() did not return a valid solutionOptions');
        return;
      }
    }

    setSolutionOptions(newSolutionOptions, solutionHands, cardsAvailable);

    // clear out the hint, it won't apply to the new state
    setNextHint(undefined);

    // and decrease the index
    setUserActionsIndex(userActionsIndex - 1);
  }, [userActionsIndex, solution, cardsAvailable, clues]);

  // -------------------- //
  // card options setters //
  // -------------------- //

  // set the given suit options index as the only selected suit option
  const setSuitOptionOnly = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // set the given suit options index to all cards in this hand
  const setSuitOptionOnlyToCardsInHand = useCallback((suitOptionsIndex, solutionOptionsIndex) => {
    const newSolutionOptions0 = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 0, solutionOptions);
    const newSolutionOptions1 = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 1, newSolutionOptions0);
    const newSolutionOptions2 = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 2, newSolutionOptions1);
    const newSolutionOptions3 = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 3, newSolutionOptions2);
    const newSolutionOptions4 = setSuitOptionOnlyInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 4, newSolutionOptions3);
    setSolutionOptions(newSolutionOptions4, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // toggle the given suit option index
  const toggleSuitOption = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // toggle the given suit option index to all cards in this hand
  const toggleSuitOptionToCardsInHand = useCallback((suitOptionsIndex, solutionOptionsIndex) => {
    const newSolutionOptions0 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 0, solutionOptions);
    const newSolutionOptions1 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 1, newSolutionOptions0);
    const newSolutionOptions2 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 2, newSolutionOptions1);
    const newSolutionOptions3 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 3, newSolutionOptions2);
    const newSolutionOptions4 = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 4, newSolutionOptions3);
    setSolutionOptions(newSolutionOptions4, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // reset all the suit options
  const resetSuitOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = resetSuitOptionsInSolutionOptions(solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // set the given number as the only selected number option
  const setNumberOptionOnly = useCallback((number, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // toggle the given number
  const toggleNumberOption = useCallback((number, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // turn off the given suit to all cards in this hand for any cards for which their suit is on and not placed yet
  const turnOffSuitInHandIfOnAndNotPlaced = useCallback((suitOptionsIndex, solutionOptionsIndex) => {
    let newSolutionOptions = solutionOptions;
    let changeMade = false;

    // card 1
    const cardOptions1 = solutionOptions[solutionOptionsIndex][0];
    if (getSuitOptionsValueInCardOptions(cardOptions1, suitOptionsIndex) && countSuitsInCardOptions(cardOptions1) > 1) {
      newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 0, newSolutionOptions);
      changeMade = true;
    }

    // card 2
    const cardOptions2 = solutionOptions[solutionOptionsIndex][1];
    if (getSuitOptionsValueInCardOptions(cardOptions2, suitOptionsIndex) && countSuitsInCardOptions(cardOptions2) > 1) {
      newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 1, newSolutionOptions);
      changeMade = true;
    }

    // card 3
    const cardOptions3 = solutionOptions[solutionOptionsIndex][2];
    if (getSuitOptionsValueInCardOptions(cardOptions3, suitOptionsIndex) && countSuitsInCardOptions(cardOptions3) > 1) {
      newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 2, newSolutionOptions);
      changeMade = true;
    }

    // card 4
    const cardOptions4 = solutionOptions[solutionOptionsIndex][3];
    if (getSuitOptionsValueInCardOptions(cardOptions4, suitOptionsIndex) && countSuitsInCardOptions(cardOptions4) > 1) {
      newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 3, newSolutionOptions);
      changeMade = true;
    }

    // card 5
    const cardOptions5 = solutionOptions[solutionOptionsIndex][4];
    if (getSuitOptionsValueInCardOptions(cardOptions5, suitOptionsIndex) && countSuitsInCardOptions(cardOptions5) > 1) {
      newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, 4, newSolutionOptions);
      changeMade = true;
    }

    if (changeMade) {
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
    }
  }, [solutionOptions, solution, cardsAvailable]);

  // turn off the given number to all cards in this hand for any cards for which their number is on and not placed yet
  const turnOffNumberInHandIfOnAndNotPlaced = useCallback((number, solutionOptionsIndex) => {
    let newSolutionOptions = solutionOptions;
    let changeMade = false;

    // card 1
    const cardOptions1 = solutionOptions[solutionOptionsIndex][0];
    if (getNumberOptionsValueInCardOptions(cardOptions1, number) && countNumbersInCardOptions(cardOptions1) > 1) {
      newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, 0, newSolutionOptions);
      changeMade = true;
    }

    // card 2
    const cardOptions2 = solutionOptions[solutionOptionsIndex][1];
    if (getNumberOptionsValueInCardOptions(cardOptions2, number) && countNumbersInCardOptions(cardOptions2) > 1) {
      newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, 1, newSolutionOptions);
      changeMade = true;
    }

    // card 3
    const cardOptions3 = solutionOptions[solutionOptionsIndex][2];
    if (getNumberOptionsValueInCardOptions(cardOptions3, number) && countNumbersInCardOptions(cardOptions3) > 1) {
      newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, 2, newSolutionOptions);
      changeMade = true;
    }

    // card 4
    const cardOptions4 = solutionOptions[solutionOptionsIndex][3];
    if (getNumberOptionsValueInCardOptions(cardOptions4, number) && countNumbersInCardOptions(cardOptions4) > 1) {
      newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, 3, newSolutionOptions);
      changeMade = true;
    }

    // card 5
    const cardOptions5 = solutionOptions[solutionOptionsIndex][4];
    if (getNumberOptionsValueInCardOptions(cardOptions5, number) && countNumbersInCardOptions(cardOptions5) > 1) {
      newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, 4, newSolutionOptions);
      changeMade = true;
    }

    if (changeMade) {
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
    }
  }, [solutionOptions, solution, cardsAvailable]);

  // reset all the number options
  const resetNumberOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = resetNumberOptionsInSolutionOptions(solutionOptionsIndex, handOptionsIndex, solutionOptions, solution.missingNumber);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // ---------------------------------------------------------------------- //
  // helper function to set the clues and the showClues corresponding array //
  // ---------------------------------------------------------------------- //

  const setCluesAndShowClues = (newClues) => {
    setClues(newClues);
    setShowClues(createInitialShowClues(newClues));
  };

  // ------------ //
  // reduce clues //
  // ------------ //

  // function to do the work of reduceClues so we don't call a hook from a book
  // this function is given the state vars
  const reduceCluesFunction = (keepHandTypes, cluesArg, solutionArg) => {
    // creating my own objects here
    const theCardsAvailable = getCardsAvailable(solutionArg.solutionHands);

    // first check that the puzzle can be solved with the current clues
    const firstCheckSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solutionArg.missingNumber), solutionArg, cluesArg, theCardsAvailable);
    if (!isSolutionOptionsComplete(theCardsAvailable, firstCheckSolutionOptions)) {
      console.error('reduceClues: initial clues do not solve the puzzle');
      return null;
    }

    // need to remember if we remove any clues
    let removedAnyClues = false;

    // sort the clues into the defined order for reducing
    // Note: no longer using this approach, as it always removes the same sorts of clues - will make this a user option eventually
    // let finalClues = sortCluesReducing(clues);

    let finalClues = shuffle(cluesArg);

    // work through the clues, removing one at a time, to see if still can solve without that clue
    let nextIndex = 0;
    while (nextIndex < finalClues.length) {
      const clue = finalClues[nextIndex];
      const { clueType } = clue;

      // need to remember if we removed this clue
      let thisClueRemoved = false;

      // only consider clues that are shown to the user
      // only consider 'HAND OF TYPE' clues if not instructed to keep them
      if (showDeducedClue(clue, finalClues) && (clueType !== CLUE_HAND_OF_TYPE || !keepHandTypes)) {
        // the new clues without that one
        const newClues = [...finalClues.slice(0, nextIndex), ...finalClues.slice(nextIndex + 1)];
        // remember to add in the deduced clues (which applies if we've removed a HAND_TYPE clue that can now be deduced)
        const newSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solutionArg.missingNumber), solutionArg, addInDeducedClues(newClues), theCardsAvailable);
        if (isSolutionOptionsComplete(theCardsAvailable, newSolutionOptions)) {
          logIfDevEnv(`reduceClues: can remove clue ${clueToText(clue, nextIndex)}`);
          finalClues = newClues;
          thisClueRemoved = true;
          removedAnyClues = true;
        }
      }

      if (!thisClueRemoved) {
        // current clue could not be removed, so move to the next one
        nextIndex += 1;
      }
    }

    if (removedAnyClues) {
      // sort the new clues for showing, remember to add in the deduced clues, and return for caller to set
      return sortCluesShowing(addInDeducedClues(finalClues));
    }

    // if we get to here no we could not find any clues to remove
    logIfDevEnv('reduceClues: could not find a clue to remove');
    return null;
  };

  // see if any clues can be removed and the puzzle can still be solved
  const reduceClues = useCallback((keepHandTypes) => {
    // call the function that does all the work, optionally returning the new clues to set
    const reducedClues = reduceCluesFunction(keepHandTypes, clues, solution);
    if (reducedClues) {
      setCluesAndShowClues(reducedClues);
    }
  }, [clues, solution]);

  // ------------------------------------- //
  // solution and solution options setters //
  // ------------------------------------- //

  // reset solution options
  const resetSolutionOptions = useCallback((theSolution, theCardsAvailable, theClues) => {
    setSolutionOptions(createSolutionOptions(theSolution.missingNumber), theSolution.solutionHands, theCardsAvailable);
    setShowClues(createInitialShowClues(theClues));
    setNextHint(undefined);
    setUserActions([]);
    setUserActionsIndex(-1);
  }, []);

  // get a new solution
  const newSolution = useCallback((newSolutionIndex) => {
    // a new solution
    let nextNewSolution = null;
    let nextClues = null;
    let reduceTheClues = false;
    if (newSolutionIndex === 1) {
      nextNewSolution = solution1;
      nextClues = clues1;
      setCurrentSolutionLabel('Hard-coded Puzzle 1');
      setNextHardCodedSolution(2);
    } else if (newSolutionIndex === 2) {
      nextNewSolution = solution2;
      nextClues = clues2;
      setCurrentSolutionLabel('Hard-coded Puzzle 2');
      setNextHardCodedSolution(3);
    } else if (newSolutionIndex === 3) {
      nextNewSolution = solution3;
      nextClues = clues3;
      setCurrentSolutionLabel('Hard-coded Puzzle 3');
      setNextHardCodedSolution(4);
    } else if (newSolutionIndex === 4) {
      nextNewSolution = solution4;
      nextClues = clues4;
      setCurrentSolutionLabel('Hard-coded Puzzle 4');
      setNextHardCodedSolution(5);
    } else if (newSolutionIndex === 5) {
      nextNewSolution = solution5;
      nextClues = clues5;
      setCurrentSolutionLabel('Hard-coded Puzzle 5');
      setNextHardCodedSolution(6);
    } else if (newSolutionIndex === 6) {
      nextNewSolution = solution6;
      nextClues = clues6;
      setCurrentSolutionLabel('Hard-coded Puzzle 6');
      setNextHardCodedSolution(7);
    } else if (newSolutionIndex === 7) {
      nextNewSolution = solution7;
      nextClues = clues7;
      setCurrentSolutionLabel('Hard-coded Puzzle 7');
      setNextHardCodedSolution(8);
    } else if (newSolutionIndex === 8) {
      nextNewSolution = solution8;
      nextClues = clues8;
      setCurrentSolutionLabel('Hard-coded Puzzle 8');
      setNextHardCodedSolution(9);
    } else if (newSolutionIndex === 9) {
      nextNewSolution = solution9;
      nextClues = clues9;
      setCurrentSolutionLabel('Hard-coded Puzzle 9');
      setNextHardCodedSolution(10);
    } else if (newSolutionIndex === 10) {
      nextNewSolution = solution10;
      nextClues = clues10;
      setCurrentSolutionLabel('Hard-coded Puzzle 10');
      setNextHardCodedSolution(11);
    } else if (newSolutionIndex === 11) {
      nextNewSolution = solution11;
      nextClues = clues11;
      setCurrentSolutionLabel('Hard-coded Puzzle 11');
      setNextHardCodedSolution(12);
    } else if (newSolutionIndex === 12) {
      nextNewSolution = solution12;
      nextClues = clues12;
      setCurrentSolutionLabel('Hard-coded Puzzle 12');
      setNextHardCodedSolution(13);
    } else if (newSolutionIndex === 13) {
      nextNewSolution = solution13;
      nextClues = clues13;
      setCurrentSolutionLabel('Hard-coded Puzzle 13');
      setNextHardCodedSolution(14);
    } else if (newSolutionIndex === 14) {
      nextNewSolution = solution14;
      nextClues = clues14;
      setCurrentSolutionLabel('Hard-coded Puzzle 14');
      setNextHardCodedSolution(15);
    } else if (newSolutionIndex === 15) {
      nextNewSolution = solution15;
      nextClues = clues15;
      setCurrentSolutionLabel('Hard-coded Puzzle 15');
      setNextHardCodedSolution(1);
    } else {
      nextNewSolution = createSolution();
      nextClues = createCluesForSolutionHands(nextNewSolution);
      setCurrentSolutionLabel('Random Puzzle');

      // if we are in production we need to reduce the clues as well
      if (process.env.NODE_ENV === 'production') {
        reduceTheClues = true;
      }
    }
    setSolution(nextNewSolution);
    let nextCluesPlusDeduced = addInDeducedClues(nextClues);

    if (reduceTheClues) {
      // we need to try and reduce the clues
      // keepHandTypes is an old idea
      const keepHandTypes = false;
      const reducedClues = reduceCluesFunction(keepHandTypes, nextCluesPlusDeduced, nextNewSolution);
      if (reducedClues) {
        nextCluesPlusDeduced = reducedClues;
      }
    }

    setCluesAndShowClues(nextCluesPlusDeduced);

    // find and set the cards available for this solution
    const newCardsAvailable = getCardsAvailable(nextNewSolution.solutionHands);
    setCardsAvailable(newCardsAvailable);

    // need to reset the solution options as well
    resetSolutionOptions(nextNewSolution, newCardsAvailable, nextCluesPlusDeduced);
  }, [resetSolutionOptions]);

  // ----------- //
  // hint system //
  // ----------- //

  // find the next hint - just log it for now
  const findNextHint = useCallback(() => {
    const hints = getHints(solutionOptions, solution, clues, cardsAvailable, false);
    logIfDevEnv(`getHints returns ${JSON.stringify(hints)}`);

    setNextHint(hints);
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // find and apply the next hint
  const findAndApplyNextHint = useCallback(() => {
    const newSolutionOptions = applyNextHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable, false);
    if (newSolutionOptions) {
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);

      // remember the user action just done
      addUserAction(createUserActionApplyNextHint());
    }

    setNextHint(undefined);
  }, [solutionOptions, solution, clues, cardsAvailable, addUserAction]);

  // find and apply all hints
  const findAndApplyAllHints = useCallback(() => {
    const newSolutionOptions = applyAllHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
    if (newSolutionOptions) {
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
    }

    setNextHint(undefined);
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // --------------------- //
  // apply the basic clues //
  // --------------------- //

  // apply the basic clues and hide those clues
  // now uses common code with get/apply hints by calling applyNextHintsToSolutionOptions() giving each basic clue
  const applyBasicClues = useCallback(() => {
    let newSolutionOptions = solutionOptions;
    const newShowClues = [...showClues];

    // look for each basic clue and apply it
    for (let i = 0; i < clues.length; i += 1) {
      const clue = clues[i];
      const { clueType } = clue;

      if (CLUES_BASIC.includes(clueType)) {
        newShowClues[i] = false;

        const thisNewSolutionOptions = applyNextHintsToSolutionOptions(newSolutionOptions, solution, [clue], cardsAvailable, true);
        if (thisNewSolutionOptions) {
          newSolutionOptions = thisNewSolutionOptions;
        }
      }
    }

    // the solution options probably will have change, so save them
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);

    // and we have hidden those clues
    setShowClues(newShowClues);
  }, [clues, showClues, solutionOptions, solution, cardsAvailable]);

  // ------------------ //
  // showSolution stuff //
  // ------------------ //

  const toggleShowSolution = useCallback(() => {
    setShowSolution(!showSolution);
  }, [showSolution]);

  // --------------- //
  // showClues stuff //
  // --------------- //

  const toggleShowClue = useCallback((clueIndex) => {
    const newShowClues = [...showClues];
    newShowClues[clueIndex] = !showClues[clueIndex];
    setShowClues(newShowClues);
  }, [showClues]);

  const toggleShowHiddenClues = useCallback(() => {
    setShowHiddenClues(!showHiddenClues);
  }, [showHiddenClues]);

  // -------------- //
  // dev only stuff //
  // -------------- //
  const runDeveloperCode = useCallback(() => {
    for (let i = 0; i < 1000; i += 1) {
      newSolution();
    }
  }, [newSolution]);

  // ----------- //
  // the context //
  // ----------- //

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // have we just won
    showWin,

    // the whole solution, and its parts
    solution,
    missingNumber: solution.missingNumber,
    solutionHands: solution.solutionHands,

    // the solution options and setting functions
    solutionOptions,
    solutionOptionsState,
    setSuitOptionOnly,
    setSuitOptionOnlyToCardsInHand,
    toggleSuitOption,
    toggleSuitOptionToCardsInHand,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    turnOffSuitInHandIfOnAndNotPlaced,
    turnOffNumberInHandIfOnAndNotPlaced,
    resetNumberOptions,
    resetSolutionOptions,

    // cards available
    cardsAvailable,

    // new solution and keep track of next hard-coded solution
    newSolution,
    nextHardCodedSolution,
    currentSolutionLabel,

    // hint stuff
    findNextHint,
    findAndApplyNextHint,
    findAndApplyAllHints,

    // clues stuff
    clues,
    reduceClues,
    applyBasicClues,

    // showSolution stuff
    showSolution,
    toggleShowSolution,
    showHiddenClues,
    toggleShowHiddenClues,

    // showClues stuff
    showClues,
    toggleShowClue,

    // spinKitCircle stuff
    showSpinKitCircle,
    setShowSpinKitCircle,

    // next hint stuff
    nextHint,
    setNextHint,

    // user actions stuff,
    userActions,
    userActionsIndex,
    addUserAction,
    undoUserAction,

    // developer stuff
    runDeveloperCode,
  }), [
    showWin,
    solution,
    solutionOptions,
    solutionOptionsState,
    setSuitOptionOnly,
    setSuitOptionOnlyToCardsInHand,
    toggleSuitOption,
    toggleSuitOptionToCardsInHand,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    turnOffSuitInHandIfOnAndNotPlaced,
    turnOffNumberInHandIfOnAndNotPlaced,
    resetNumberOptions,
    resetSolutionOptions,
    cardsAvailable,
    newSolution,
    nextHardCodedSolution,
    currentSolutionLabel,
    findNextHint,
    findAndApplyNextHint,
    findAndApplyAllHints,
    clues,
    reduceClues,
    applyBasicClues,
    showSolution,
    toggleShowSolution,
    showClues,
    toggleShowClue,
    showHiddenClues,
    toggleShowHiddenClues,
    showSpinKitCircle,
    nextHint,
    userActions,
    userActionsIndex,
    addUserAction,
    undoUserAction,
    runDeveloperCode,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
