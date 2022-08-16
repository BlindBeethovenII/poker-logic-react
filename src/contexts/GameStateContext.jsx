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

  // hand options, being an array of 5 cardOptions where cardOptions is on object of
  //   suitOptions: array of 4 bools - S, H, D, C - true means visible - if only one true then that is the selected number
  //   numberOptions: array of 13 bools - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number (ignoring the missingNumber entry, which is always true)
  const [handOptions, setHandOptions] = useState([
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
    {
      suitOptions: [true, true, true, true],
      numberOptions: [true, true, true, true, true, true, true, true, true, true, true, true, true],
    },
  ]);

  // setting functions for the card options

  // set the given suit options index as the only selected suit option
  const setSuitOptionOnly = useCallback((suitOptionsIndex, handOptionIndex) => {
    const { numberOptions } = handOptions[handOptionIndex];
    const newSuitOptions = [false, false, false, false];
    newSuitOptions[suitOptionsIndex] = true;
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionIndex] = newCardOptions;
    setHandOptions(newHandOptions);
  }, [handOptions]);

  // toggle the given suit option index
  const toggleSuitOption = useCallback((suitOptionsIndex, handOptionIndex) => {
    const { suitOptions, numberOptions } = handOptions[handOptionIndex];
    const newSuitOptions = [...suitOptions];
    newSuitOptions[suitOptionsIndex] = !suitOptions[suitOptionsIndex];
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionIndex] = newCardOptions;
    setHandOptions(newHandOptions);
  }, [handOptions]);

  // reset all the suit options
  const resetSuitOptions = useCallback((handOptionIndex) => {
    const { numberOptions } = handOptions[handOptionIndex];
    const newSuitOptions = [true, true, true, true];
    const newCardOptions = { suitOptions: newSuitOptions, numberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionIndex] = newCardOptions;
    setHandOptions(newHandOptions);
  }, [handOptions]);

  // set the given number options index as the only selected number option
  const setNumberOptionOnly = useCallback((numberOptionsIndex, handOptionIndex) => {
    const { suitOptions } = handOptions[handOptionIndex];
    const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
    newNumberOptions[numberOptionsIndex] = true;
    // and the missing number entry is always true as well (which we assume in 'only one number selected' count)
    newNumberOptions[solution.missingNumber - 1] = true;
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionIndex] = newCardOptions;
    setHandOptions(newHandOptions);
  }, [handOptions, solution]);

  // toggle the given number option index
  const toggleNumberOption = useCallback((numberOptionsIndex, handOptionIndex) => {
    const { suitOptions, numberOptions } = handOptions[handOptionIndex];
    const newNumberOptions = [...numberOptions];
    newNumberOptions[numberOptionsIndex] = !numberOptions[numberOptionsIndex];
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionIndex] = newCardOptions;
    setHandOptions(newHandOptions);
  }, [handOptions]);

  // reset all the number options
  const resetNumberOptions = useCallback((handOptionIndex) => {
    const { suitOptions } = handOptions[handOptionIndex];
    const newNumberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
    const newCardOptions = { suitOptions, numberOptions: newNumberOptions };
    const newHandOptions = [...handOptions];
    newHandOptions[handOptionIndex] = newCardOptions;
    setHandOptions(newHandOptions);
  }, [handOptions]);

  // expose our state and state functions via the context
  // we are encouraged to do this via a useMemo now
  const context = useMemo(() => ({
    // have we just won
    showWin,

    // the missing number
    missingNumber: solution.missingNumber,

    // the hands of the solution
    solutionHands: solution.solutionHands,

    // the handOptions and setting functions
    handOptions,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    resetNumberOptions,
  }), [
    showWin,
    solution,
    handOptions,
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
