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

  // helper function to say if a card is in the solution hands
  const cardInSolutionHands = (card) => {
    let result = false;
    // could do this more elegantly
    solutionHands.forEach((solutionHand) => {
      solutionHand.forEach((solutionHandCard) => {
        if (solutionHandCard.suit === card.suit && solutionHandCard.number === card.number) {
          result = true;
        }
      });
    });
    return result;
  };

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
    if (cardInSolutionHands(card)) {
      cards.push(<Card key={card.id} col={11 - i + 0.65} row={row - 0.15} card={card} small faded={false} />);
    }
  });

  return cards;
};

AvailableCardsInSuit.propTypes = {
  suit: PropTypes.string.isRequired,
};

export default AvailableCardsInSuit;
