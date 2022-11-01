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
  countNumbersInCardOptions,
  getNumberOptionsValueInCardOptions,
} from '../shared/solution-functions';

import { getHints } from '../shared/get-hints-functions';

import {
  applyNextHintsToSolutionOptions,
  applyAllHintsToSolutionOptions,
} from '../shared/apply-hints-functions';

import {
  createCluesForSolutionHands,
  addInDeducedClues,
  createInitialShowClues,
  sortCluesShowing,
} from '../shared/clue-functions';

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
} from '../shared/test-hands';

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

  // show or hide the solution
  const [showSolution, setShowSolution] = useState(false);

  // the next hard coded solution for the new solution button
  const [nextHardCodedSolution, setNextHardCodedSolution] = useState(2);

  // which solution we are looking at
  const [currentSolutionLabel, setCurrentSolutionLabel] = useState('Hard-coded Solution 1');

  // show the spinkit circle
  const [showSpinKitCircle, setShowSpinKitCircle] = useState(false);

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

  // toggle the given number to all cards in this hand for any cards for which their number is not placed yet
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

  // ------------------------------------- //
  // solution and solution options setters //
  // ------------------------------------- //

  // reset solution options - now needs to take missingNumber - so doesn't need to use useCallback
  const resetSolutionOptions = useCallback((theSolution, theCardsAvailable, theClues) => {
    setSolutionOptions(createSolutionOptions(theSolution.missingNumber), theSolution.solutionHands, theCardsAvailable);
    setShowClues(createInitialShowClues(theClues));
  }, []);

  // get a new solution
  const newSolution = useCallback((newSolutionIndex) => {
    // a new solution
    let nextNewSolution = null;
    let nextClues = null;
    if (newSolutionIndex === 1) {
      nextNewSolution = solution1;
      nextClues = clues1;
      setCurrentSolutionLabel('Hard-coded Solution 1');
      setNextHardCodedSolution(2);
    } else if (newSolutionIndex === 2) {
      nextNewSolution = solution2;
      nextClues = clues2;
      setCurrentSolutionLabel('Hard-coded Solution 2');
      setNextHardCodedSolution(3);
    } else if (newSolutionIndex === 3) {
      nextNewSolution = solution3;
      nextClues = clues3;
      setCurrentSolutionLabel('Hard-coded Solution 3');
      setNextHardCodedSolution(4);
    } else if (newSolutionIndex === 4) {
      nextNewSolution = solution4;
      nextClues = clues4;
      setCurrentSolutionLabel('Hard-coded Solution 4');
      setNextHardCodedSolution(5);
    } else if (newSolutionIndex === 5) {
      nextNewSolution = solution5;
      nextClues = clues5;
      setCurrentSolutionLabel('Hard-coded Solution 5');
      setNextHardCodedSolution(1);
    } else {
      nextNewSolution = createSolution();
      nextClues = createCluesForSolutionHands(nextNewSolution);
      setCurrentSolutionLabel('Random Solution');
    }
    setSolution(nextNewSolution);
    const nextCluesPlusDeduced = addInDeducedClues(nextClues);
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
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // find and apply the next hint
  const findAndApplyNextHint = useCallback(() => {
    const newSolutionOptions = applyNextHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable, false);
    if (newSolutionOptions) {
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
    }
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // find and apply all hints
  const findAndApplyAllHints = useCallback(() => {
    const newSolutionOptions = applyAllHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
    if (newSolutionOptions) {
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
    }
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // ------------ //
  // reduce clues //
  // ------------ //

  // see if any clues can be removed and the puzzle can still be solved
  const reduceClues = useCallback((keepHandTypes) => {
    // creating my own objects here
    const theCardsAvailable = getCardsAvailable(solution.solutionHands);

    // first check that the puzzle can be solved with the current clues
    const firstCheckSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution.missingNumber), solution, clues, theCardsAvailable);
    if (!isSolutionOptionsComplete(theCardsAvailable, firstCheckSolutionOptions)) {
      console.error('reduceClues: initial clues do not solve the puzzle');
      return;
    }

    // need to remember if we remove any clues
    let removedAnyClues = false;

    // sort the clues into the defined order for reducing
    // Note: no longer using this approach, as it always removes the same sorts of clues - will make this a user option eventually
    // let finalClues = sortCluesReducing(clues);

    let finalClues = shuffle(clues);

    // work through the clues, removing one at a time, to see if still can solve without that clue
    let nextIndex = 0;
    while (nextIndex < finalClues.length) {
      const clue = finalClues[nextIndex];
      const { clueType } = clue;

      // need to remember if we removed this clue
      let thisClueRemoved = false;

      // only consider 'HAND OF TYPE' clues if not instructed to keep them
      if (clueType !== CLUE_HAND_OF_TYPE || !keepHandTypes) {
        // the new clues without that one
        const newClues = [...finalClues.slice(0, nextIndex), ...finalClues.slice(nextIndex + 1)];
        // remember to add in the deduced clues (which applies if we've removed a HAND_TYPE clue that can now be deduced)
        const newSolutionOptions = applyAllHintsToSolutionOptions(createSolutionOptions(solution.missingNumber), solution, addInDeducedClues(newClues), theCardsAvailable);
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
      // save the new clues, first sorting for showing
      // remember to add in the deduced clues
      setCluesAndShowClues(sortCluesShowing(addInDeducedClues(finalClues)));
    } else {
      logIfDevEnv('reduceClues: could not find a clue to remove');
    }
  }, [clues, solution]);

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

    // showClues stuff
    showClues,
    toggleShowClue,

    // spinKitCircle stuff
    showSpinKitCircle,
    setShowSpinKitCircle,
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
    showSpinKitCircle,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
