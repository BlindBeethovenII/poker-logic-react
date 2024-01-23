import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop, cardNumberToString } from '../shared/card-functions';

import {
  clueToString,
  suitToTextSingular,
  numbersToAlternativeString,
  suitsToAlternativeString,
} from '../shared/to-text-functions';

import {
  HINT_CLUE_NOT_NUMBER,
  HINT_CLUE_SUIT_AND_NUMBER,
  HINT_NUMBER_NOT_USED,
  HINT_THREE_OF_A_KIND_NUMBERS,
  HINT_ALL_NUMBERS_OF_SUIT_NOT_POSSIBLE,
  HINT_THREE_OF_A_KIND_SUITS,
  HINT_PAIR_NUMBERS,
  HINT_PAIR_SUITS,
  HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_NUMBER,
  HINT_ALL_OF_NUMBER_PLACED,
  HINT_NO_STRAIGHT_FLUSH_IN_SUIT,
  HINT_ALL_SUITS_OF_NUMBER_NOT_POSSIBLE,
  HINT_NO_STRAIGHT_FLUSH_IN_NUMBER,
  HINT_SORT_RULE_NUMBERS,
  HINT_FLUSH_POSSIBLE_SUITS,
  HINT_ALL_OF_SUIT_PLACED,
  HINT_ALL_SUIT_PLACED_ONLY_PLACE_FOR_NUMBER,
  HINT_SAME_COUNT_LEFT_NUMBER,
  HINT_CLUE_SUIT,
  HINT_CLUE_NUMBER,
  HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL,
  HINT_FOUR_OF_A_KIND_SUIT,
  HINT_FOUR_OF_A_KIND_NUMBERS,
  HINT_CLUE_BLACK_SUIT,
  HINT_NO_STRAIGHT_IN_NUMBER,
  HINT_STRAIGHT_NUMBER_KNOWN,
  HINT_CLUE_CARDS_SAME_SUIT,
  HINT_CLUE_CARDS_NOT_SAME_SUIT,
  HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE,
  HINT_CLUE_CARD_EVEN,
  HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE,
  HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE,
  HINT_FLUSH_SUIT,
  HINT_SAME_COUNT_LEFT_SUIT,
  HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE,
  HINT_CLUE_CARDS_NOT_SAME_NUMBER,
  HINT_CLUE_NOT_SUIT,
} from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(8.2);
const top = rowToTop(2.2);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '340px',
  height: '260px',
  textAlign: 'centre',
  zIndex: 0,
  overflow: 'auto',
};

const WhiteLabel = styled.h2`
  background: rgb(85,107,47);
  color: white;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0.2em 1em 0.2em 0.2em;
  pointer-events: none;
`;

const BlackLabel = styled.h2`
  background: rgb(85,107,47);
  color: black;
  font-size: 0.8em;
  margin: 0.4em;
  padding: 0em 1em 0em 1em;
  pointer-events: none;
`;

// helper function to convert array of values to a key
const arrayToKey = (array) => {
  // start with the first one, and add "-<v>" for each additional one

  // check we have something
  if (!array || !array.length) {
    return '';
  }

  let result = array[0];

  for (let i = 1; i < array.length; i += 1) {
    result = `${result}-${array[i]}`;
  }

  return result;
};

const ShowNextHint = () => {
  const { nextHint, showSolution } = useContext(GameStateContext);

  // don't show if the solution is showing, as the solution uses the same space
  if (showSolution) {
    return null;
  }

  // don't show if there are no hints to show
  if (nextHint === undefined) {
    return null;
  }

  // if the puzzle is solved, then there will be no hints available
  if (nextHint.length === 0) {
    return (
      <div style={divstyle}>
        <WhiteLabel>No Hints Available</WhiteLabel>
      </div>
    );
  }

  // I'm assuming that the array of hints contains hints all of the same hintType
  // This is a check - by this point there is at least one hint in the array
  const firstHintType = nextHint[0].hintType;
  const headingText = `Next Hint: ${firstHintType}`;
  for (let i = 1; i < nextHint.length; i += 1) {
    const nextHintType = nextHint[i].hintType;
    if (nextHintType !== firstHintType) {
      const errorMsg = `ERROR: nextHint array contains different hint types ${firstHintType} and ${nextHintType}`;
      return (
        <div style={divstyle}>
          <WhiteLabel>{errorMsg}</WhiteLabel>
        </div>
      );
    }
  }

  const blackLabels = [];

  // Having a switch to grouped together hints that take the use the same info and if it is positive (keep) or negative (delete) the values
  // each case converts each hint to a black label
  switch (firstHintType) {
    case HINT_CLUE_BLACK_SUIT:
    case HINT_CLUE_CARD_EVEN:
      // clue
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_CLUE_SUIT_AND_NUMBER:
      // suit, number, clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suit,
          number,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${suit}-${number}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is the ${cardNumberToString(number)} ${suitToTextSingular(suit)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_ALL_NUMBERS_OF_SUIT_NOT_POSSIBLE:
    case HINT_ALL_OF_SUIT_PLACED:
      // suit, no clue, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suit,
          solutionOptionsIndex,
          handOptionsIndex,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${suit}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not a ${suitToTextSingular(suit)}`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_SAME_COUNT_LEFT_SUIT:
      // suit, no clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suit,
          solutionOptionsIndex,
          handOptionsIndex,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${suit}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is a ${suitToTextSingular(suit)}`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_NO_STRAIGHT_FLUSH_IN_SUIT:
    case HINT_CLUE_CARDS_SAME_SUIT:
    case HINT_CLUE_CARDS_NOT_SAME_SUIT:
    case HINT_CLUE_CARDS_SAME_SUIT_TWO_NOT_AVAILABLE:
    case HINT_CLUE_NOT_SUIT:
      // suit, clue, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suit,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${suit}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not a ${suitToTextSingular(suit)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_CLUE_SUIT:
    case HINT_FOUR_OF_A_KIND_SUIT:
    case HINT_FLUSH_SUIT:
      // suit, clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suit,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${suit}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is a ${suitToTextSingular(suit)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_CLUE_CARDS_SAME_SUIT_SIX_NOT_AVAILABLE:
    case HINT_CLUE_CARDS_SAME_SUIT_THREE_NOT_AVAILABLE:
      // suit, clue1, clue2, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suit,
          solutionOptionsIndex,
          handOptionsIndex,
          clue1,
          clue2,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${suit}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not the ${suitToTextSingular(suit)} (Clue 1: ${clueToString(clue1)}, Clue 2: ${clueToString(clue2)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_THREE_OF_A_KIND_SUITS:
    case HINT_PAIR_SUITS:
    case HINT_FLUSH_POSSIBLE_SUITS:
      // suits, clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          suits,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${arrayToKey(suits)}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} can only be a ${suitsToAlternativeString(suits)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_NUMBER_NOT_USED:
    case HINT_ALL_OF_NUMBER_PLACED:
    case HINT_ALL_SUITS_OF_NUMBER_NOT_POSSIBLE:
      // number, no clue, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          number,
          solutionOptionsIndex,
          handOptionsIndex,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${number}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not the ${cardNumberToString(number)}`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_ALL_SUIT_PLACED_ONLY_PLACE_FOR_NUMBER:
    case HINT_SAME_COUNT_LEFT_NUMBER:
      // number, no clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          number,
          solutionOptionsIndex,
          handOptionsIndex,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${number}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is the ${cardNumberToString(number)}`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_CLUE_NOT_NUMBER:
    case HINT_CLUE_CARDS_SAME_NUMBER_TWO_NOT_AVAILABLE:
    case HINT_CLUE_CARDS_SAME_NUMBER:
    case HINT_NO_STRAIGHT_FLUSH_IN_NUMBER:
    case HINT_PAIR_NUMBERS_NUMBER_NOT_IN_ALL:
    case HINT_NO_STRAIGHT_IN_NUMBER:
    case HINT_CLUE_CARDS_NOT_SAME_NUMBER:
      // number, clue, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          number,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${number}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not the ${cardNumberToString(number)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_CLUE_NUMBER:
    case HINT_STRAIGHT_NUMBER_KNOWN:
      // number, clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          number,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${number}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is the ${cardNumberToString(number)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_CLUE_CARDS_SAME_NUMBER_THREE_NOT_AVAILABLE:
    case HINT_CLUE_CARDS_SAME_NUMBER_FOUR_NOT_AVAILABLE:
      // number, clue1, clue2, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          number,
          solutionOptionsIndex,
          handOptionsIndex,
          clue1,
          clue2,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${number}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} is not the ${cardNumberToString(number)} (Clue 1: ${clueToString(clue1)}, Clue 2: ${clueToString(clue2)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_SORT_RULE_NUMBERS:
      // numbers, clue, negative
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          numbers,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${arrayToKey(numbers)}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} can not be a ${numbersToAlternativeString(numbers)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    case HINT_THREE_OF_A_KIND_NUMBERS:
    case HINT_PAIR_NUMBERS:
    case HINT_FOUR_OF_A_KIND_NUMBERS:
      // numbers, clue, positive
      for (let i = 0; i < nextHint.length; i += 1) {
        const {
          numbers,
          solutionOptionsIndex,
          handOptionsIndex,
          clue,
        } = nextHint[i];
        const key = `hint-${solutionOptionsIndex}-${handOptionsIndex}-${arrayToKey(numbers)}`;
        const hintText = `Hand ${solutionOptionsIndex + 1} Card ${handOptionsIndex + 1} can only be a ${numbersToAlternativeString(numbers)} (Clue: ${clueToString(clue)})`;
        blackLabels.push(<BlackLabel key={key}>{hintText}</BlackLabel>);
      }
      break;

    default:
      blackLabels.push(<BlackLabel key="hint-todo">TODO</BlackLabel>);
      break;
  }

  return (
    <div style={divstyle}>
      <WhiteLabel>{headingText}</WhiteLabel>
      {blackLabels}
    </div>
  );
};

export default ShowNextHint;
