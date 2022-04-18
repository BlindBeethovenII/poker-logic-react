import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

import { createCard } from '../shared/card-functions';

import {
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  NUMBERS,
} from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const AvailableCardsInSuit = (props) => {
  const {
    suit,
  } = props;

  const { solutionHands } = useContext(GameStateContext);

  // TODO
  const solutionHand = solutionHands[0];
  if (!solutionHand?.length) {
    // if there are no cards then nothing to show
    return null;
  }

  // convert suit to row
  let row = 0;
  if (suit === SUIT_HEARTS) {
    row = 1;
  } else if (suit === SUIT_DIAMONDS) {
    row = 2;
  } else if (suit === SUIT_CLUBS) {
    row = 3;
  }

  const cards = [];
  NUMBERS.forEach((number, i) => {
    const card = createCard(suit, number);
    cards.push(<Card key={card.id} col={i - 1} row={row} card={card} small />);
  });

  return cards;
};

AvailableCardsInSuit.propTypes = {
  suit: PropTypes.string.isRequired,
};

export default AvailableCardsInSuit;
