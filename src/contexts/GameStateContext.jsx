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
  convertSuitToSuitOptionsIndex,
  getSuitOptionsValue,
  getNumberOptionsValue,
  solutionOptionsValid,
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
} from '../shared/clue-functions';

import { clueToText } from '../shared/to-text-functions';

import {
  solution1,
  clues1,
  solution2,
  clues2,
  solution3,
  clues3,
} from '../shared/test-hands';

import {
  CLUE_SUIT_AND_NUMBER,
  CLUE_SUIT,
  CLUE_NUMBER,
  CLUE_NOT_SUIT,
  CLUE_NOT_NUMBER,
  CLUE_RED_SUIT,
  CLUE_BLACK_SUIT,
  SOLUTION_OPTIONS_STATE_OK,
  SOLUTION_OPTIONS_STATE_INVALID,
  SOLUTION_OPTIONS_STATE_DONE,
  INDEX_SUIT_SPADES,
  INDEX_SUIT_CLUBS,
  INDEX_SUIT_HEARTS,
  INDEX_SUIT_DIAMONDS,
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

  // toggle the given suit option index
  const toggleSuitOption = useCallback((suitOptionsIndex, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // reset all the suit options
  const resetSuitOptions = useCallback((solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = resetSuitOptionsInSolutionOptions(solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // set the given number options index as the only selected number option
  const setNumberOptionOnly = useCallback((number, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = setNumberOptionOnlyInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
  }, [solutionOptions, solution, cardsAvailable]);

  // toggle the given number option index
  const toggleNumberOption = useCallback((number, solutionOptionsIndex, handOptionsIndex) => {
    const newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionOptionsIndex, handOptionsIndex, solutionOptions);
    setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);
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
    const hints = getHints(solutionOptions, solution, clues, cardsAvailable);
    logIfDevEnv(`getHints returns ${JSON.stringify(hints)}`);
  }, [solutionOptions, solution, clues, cardsAvailable]);

  // find and apply the next hint
  const findAndApplyNextHint = useCallback(() => {
    const newSolutionOptions = applyNextHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
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
  const reduceClues = useCallback(() => {
    // first check that the puzzle can be solved with the current clues
    const newSolutionOptions = applyAllHintsToSolutionOptions(solutionOptions, solution, clues, cardsAvailable);
    if (!isSolutionOptionsComplete(cardsAvailable, newSolutionOptions)) {
      console.error('reduceClues: initial clues do not solve the puzzle');
      return;
    }

    // need to remember if we remove any clues
    let removedAnyClues = false;

    // TODO: order the clues, bringing the those to the front that we prefer to lose if possible??
    // for now trying shuffling the clues
    let finalClues = shuffle(clues);

    // keep removing while possible
    let lookForMore = true;
    while (lookForMore) {
      let indexToRemove = -1;
      for (let i = 0; i < finalClues.length && indexToRemove === -1; i += 1) {
        const clue = finalClues[i];

        // the new clues without that one
        const newClues = [...finalClues.slice(0, i), ...finalClues.slice(i + 1)];
        const newSolutionOptions1 = applyAllHintsToSolutionOptions(solutionOptions, solution, newClues, cardsAvailable);
        if (isSolutionOptionsComplete(cardsAvailable, newSolutionOptions1)) {
          logIfDevEnv(`reduceClues: can remove clue ${clueToText(clue, i)}`);
          indexToRemove = i;
        }
      }
      if (indexToRemove === -1) {
        // didn't find any to remove, so give up here
        lookForMore = false;
      } else {
        // found one to remove
        finalClues = [...finalClues.slice(0, indexToRemove), ...finalClues.slice(indexToRemove + 1)];
        removedAnyClues = true;
      }
    }

    if (removedAnyClues) {
      // save the new clues
      setCluesAndShowClues(finalClues);
    } else {
      logIfDevEnv('reduceClues: could not find a clue to remove');
    }
  }, [cardsAvailable, clues, solution, solutionOptions]);

  // --------------------- //
  // apply the basic clues //
  // --------------------- //

  // apply the basic clues and hide those clues
  const applyBasicClues = useCallback(() => {
    // this will update the solutionOptions if a change was made
    let cluesApplied = false;
    let newSolutionOptions = solutionOptions;
    const newShowClues = [...showClues];

    // look for each basic clue and apply it
    for (let i = 0; i < clues.length; i += 1) {
      const clue = clues[i];
      const { clueType } = clue;

      if (clueType === CLUE_SUIT_AND_NUMBER) {
        const {
          suit,
          number,
          solutionHandsIndex,
          handOptionsIndex,
        } = clue;

        newSolutionOptions = setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        newSolutionOptions = setNumberOptionOnlyInSolutionOptions(number, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        newShowClues[i] = false;
        cluesApplied = true;
      } else if (clueType === CLUE_SUIT) {
        const { suit, solutionHandsIndex, handOptionsIndex } = clue;
        newSolutionOptions = setSuitOptionOnlyInSolutionOptions(convertSuitToSuitOptionsIndex(suit), solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        newShowClues[i] = false;
        cluesApplied = true;
      } else if (clueType === CLUE_NUMBER) {
        const { number, solutionHandsIndex, handOptionsIndex } = clue;
        newSolutionOptions = setNumberOptionOnlyInSolutionOptions(number, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        newShowClues[i] = false;
        cluesApplied = true;
      } else if (clueType === CLUE_NOT_SUIT) {
        const { suit, solutionHandsIndex, handOptionsIndex } = clue;
        const suitOptionsIndex = convertSuitToSuitOptionsIndex(suit);
        if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, handOptionsIndex, suitOptionsIndex)) {
          newSolutionOptions = toggleSuitOptionInSolutionOptions(suitOptionsIndex, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        }
        newShowClues[i] = false;
        cluesApplied = true;
      } else if (clueType === CLUE_NOT_NUMBER) {
        const { number, solutionHandsIndex, handOptionsIndex } = clue;
        if (getNumberOptionsValue(solutionOptions, solutionHandsIndex, handOptionsIndex, number)) {
          newSolutionOptions = toggleNumberOptionInSolutionOptions(number, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        }
        newShowClues[i] = false;
        cluesApplied = true;
      } else if (clueType === CLUE_RED_SUIT) {
        const { solutionHandsIndex, handOptionsIndex } = clue;
        if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, handOptionsIndex, INDEX_SUIT_SPADES)) {
          newSolutionOptions = toggleSuitOptionInSolutionOptions(INDEX_SUIT_SPADES, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        }
        if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, handOptionsIndex, INDEX_SUIT_CLUBS)) {
          newSolutionOptions = toggleSuitOptionInSolutionOptions(INDEX_SUIT_CLUBS, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        }
        newShowClues[i] = false;
        cluesApplied = true;
      } else if (clueType === CLUE_BLACK_SUIT) {
        const { solutionHandsIndex, handOptionsIndex } = clue;
        if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, handOptionsIndex, INDEX_SUIT_HEARTS)) {
          newSolutionOptions = toggleSuitOptionInSolutionOptions(INDEX_SUIT_HEARTS, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        }
        if (getSuitOptionsValue(solutionOptions, solutionHandsIndex, handOptionsIndex, INDEX_SUIT_DIAMONDS)) {
          newSolutionOptions = toggleSuitOptionInSolutionOptions(INDEX_SUIT_DIAMONDS, solutionHandsIndex, handOptionsIndex, newSolutionOptions);
        }
        newShowClues[i] = false;
        cluesApplied = true;
      }
    }

    if (cluesApplied) {
      // the solution options have change, so save them
      setSolutionOptions(newSolutionOptions, solution.solutionHands, cardsAvailable);

      // and we have hidden those clues
      setShowClues(newShowClues);
    }
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
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
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
  }), [
    showWin,
    solution,
    solutionOptions,
    solutionOptionsState,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
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
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
