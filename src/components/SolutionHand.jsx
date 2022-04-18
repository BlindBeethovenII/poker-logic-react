import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

import GameStateContext from '../contexts/GameStateContext';

const SolutionHand = (props) => {
  const {
    solutionHandIndex,
  } = props;

  const { solutionHands } = useContext(GameStateContext);

  // get our solution hand
  const solutionHand = solutionHands[solutionHandIndex];

  if (!solutionHand?.length) {
    // if there are no cards then nothing to show
    return null;
  }

  const cards = [];
  solutionHand.forEach((card, i) => {
    cards.push(<Card key={card.id} col={i + 1} row={solutionHandIndex} card={card} />);
  });

  return cards;
};

SolutionHand.propTypes = {
  solutionHandIndex: PropTypes.number.isRequired,
};

export default SolutionHand;
