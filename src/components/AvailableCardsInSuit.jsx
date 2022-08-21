import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

import { createCard } from '../shared/card-functions';

import { cardInSolutionHands, cardSelectedInSolutionOptions, convertSuitToSuitOptionsIndex } from '../shared/solution-functions';

import { NUMBERS } from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const AvailableCardsInSuit = (props) => {
  const {
    suit,
  } = props;

  const { solutionHands, solutionOptions } = useContext(GameStateContext);

  // convert suit to row, which is the same as the suit options index
  const row = convertSuitToSuitOptionsIndex(suit);

  const cards = [];
  NUMBERS.forEach((number, i) => {
    const card = createCard(suit, number);
    if (cardInSolutionHands(card, solutionHands)) {
      cards.push(<Card key={card.id} col={11 - i + 0.65} row={row - 0.15} card={card} small faded={cardSelectedInSolutionOptions(card, solutionOptions)} />);
    }
  });

  return cards;
};

AvailableCardsInSuit.propTypes = {
  suit: PropTypes.string.isRequired,
};

export default AvailableCardsInSuit;
