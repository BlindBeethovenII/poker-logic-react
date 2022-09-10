import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

import { isCardPlacedInSolutionOptions, convertSuitToSuitOptionsIndex } from '../shared/solution-functions';

import { NUMBER_A } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const AvailableCardsInSuit = (props) => {
  const {
    suit,
  } = props;

  const { solutionOptions, cardsAvailable } = useContext(GameStateContext);

  // convert suit to row, which is the same as the suit options index and cards available index
  const row = convertSuitToSuitOptionsIndex(suit);

  const suitCardsAvailable = cardsAvailable[row];

  const cards = [];
  suitCardsAvailable.forEach((cardAvailable) => {
    const { number } = cardAvailable;
    // putting A at the front now
    const colIndex = number === NUMBER_A ? -1 : 13 - number;
    cards.push(
      <Card
        key={cardAvailable.id}
        col={colIndex + 0.65}
        row={row - 0.15}
        card={cardAvailable}
        small
        cardPlaced={isCardPlacedInSolutionOptions(cardAvailable, solutionOptions)}
      />,
    );
  });

  return cards;
};

AvailableCardsInSuit.propTypes = {
  suit: PropTypes.string.isRequired,
};

export default AvailableCardsInSuit;
