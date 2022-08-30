import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

import { isCardPlacedInSolutionOptions, convertSuitToSuitOptionsIndex } from '../shared/solution-functions';

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
    cards.push(
      <Card
        key={cardAvailable.id}
        col={12 - number + 0.65}
        row={row - 0.15}
        card={cardAvailable}
        small
        faded={isCardPlacedInSolutionOptions(cardAvailable, solutionOptions)}
      />,
    );
  });

  return cards;
};

AvailableCardsInSuit.propTypes = {
  suit: PropTypes.string.isRequired,
};

export default AvailableCardsInSuit;
