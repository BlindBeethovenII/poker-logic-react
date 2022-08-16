import React, { useState, useMemo, useCallback } from 'react';

import PropTypes from 'prop-types';

import { createSolution } from '../shared/card-functions';

const GameStateContext = React.createContext({});

export const GameStateContextProvider = ({ children }) => {
  // show a win
  const [showWin] = useState(false);

  // a solution - which is an object with {solutionHands, missingNumber}
  // TODO - include people in the solution
  const [solution] = useState(createSolution());

  // TODO - cardOptions
  const [cardOptions, setCardOptions] = useState({
    // the suit options - S, H, D, C - true means visible - if only one true then that is the selected number
    suitOptions: [true, true, true, true],

    // the number options - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number (ignoring the missingNumber entry, which is always true)
    numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
  });

  // setting functions for the card options

  // set the given suit options index as the only selected suit option
  const setSuitOptionOnly = useCallback((suitOptionsIndex) => {
    const { numberOptions } = cardOptions;
    const newSuitOptions = [false, false, false, false];
    newSuitOptions[suitOptionsIndex] = true;
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    setCardOptions(newCardOptions);
  }, [cardOptions]);

  // toggle the given suit option index
  const toggleSuitOption = useCallback((suitOptionsIndex) => {
    const { suitOptions, numberOptions } = cardOptions;
    const newSuitOptions = [...suitOptions];
    newSuitOptions[suitOptionsIndex] = !suitOptions[suitOptionsIndex];
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    setCardOptions(newCardOptions);
  }, [cardOptions]);

  // reset all the suit options
  const resetSuitOptions = useCallback(() => {
    const { numberOptions } = cardOptions;
    const newSuitOptions = [true, true, true, true];
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    setCardOptions(newCardOptions);
  }, [cardOptions]);

  // set the given number options index as the only selected number option
  const setNumberOptionOnly = useCallback((numberOptionsIndex) => {
    const { suitOptions } = cardOptions;
    const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    newNumberOptions[numberOptionsIndex] = true;
    // and the missing number entry is always true as well (which we assume in 'only one number selected' count)
    newNumberOptions[solution.missingNumber - 1] = true;
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    setCardOptions(newCardOptions);
  }, [cardOptions, solution]);

  // toggle the given number option index
  const toggleNumberOption = useCallback((numberOptionsIndex) => {
    const { suitOptions, numberOptions } = cardOptions;
    const newNumberOptions = [...numberOptions];
    newNumberOptions[numberOptionsIndex] = !numberOptions[numberOptionsIndex];
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    setCardOptions(newCardOptions);
  }, [cardOptions]);

  // reset all the number options
  const resetNumberOptions = useCallback(() => {
    const { suitOptions } = cardOptions;
    const newNumberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    setCardOptions(newCardOptions);
  }, [cardOptions]);

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // have we just won
    showWin,

    // the missing number
    missingNumber: solution.missingNumber,

    // the hands of the solution
    solutionHands: solution.solutionHands,

    // the cardOptions and setting functions
    cardOptions,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    resetNumberOptions,
  }), [
    showWin,
    solution,
    cardOptions,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    resetNumberOptions,
  ]);

  return <GameStateContext.Provider value={context}>{children}</GameStateContext.Provider>;
};

GameStateContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default GameStateContext;
