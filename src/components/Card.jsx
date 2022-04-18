import React from 'react';

import PropTypes from 'prop-types';

import CardBlankImage from '../images/cards/cardblank.png';

import {
  colToLeft,
  rowToTop,
  cardNumberToString,
  cardSuitToImage,
  cardSuitToFillColour,
} from '../shared/card-functions';

import {
  SUIT_SPADES,
  SUIT_CLUBS,
} from '../shared/constants';

const Card = (props) => {
  // we are given the card and the col/row it is to be shown at
  const {
    col,
    row,
    card,
  } = props;

  // there are the card details - including where it was showing before
  const {
    id,
    suit,
    number,
  } = card;

  // convert the cols and rows into left/top
  const left = colToLeft(col);
  const top = rowToTop(row);

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  const cardnumberstyle = {
    position: 'absolute',
    left: '0px',
    top: '40px',
    width: '40px',
    height: '40px',
    fontWeight: 'bold',
    fontSize: '36px',
    letterSpacing: '-0.1em',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  };

  let height = '42px';
  if (suit === SUIT_SPADES) {
    height = '38px';
  } else if (suit === SUIT_CLUBS) {
    height = '40px';
  }

  const cardsuitstyle = {
    position: 'absolute',
    left: '22px',
    top: suit === SUIT_SPADES ? '2px' : '0px',
    width: '40px',
    height,
  };

  // the inside of the motion.div or div is the same regardless of if we animate the card into position
  const cardblank = <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />;
  const cardnumber = (
    <div style={cardnumberstyle}>
      <svg width="60px" height="40px">
        <text x="10" y="30" fill={cardSuitToFillColour(suit)}>
          {cardNumberToString(number)}
        </text>
      </svg>
    </div>
  );
  const cardsuit = <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />;

  // showCard
  const cardShowing = (
    <>
      {cardblank}
      {cardnumber}
      {cardsuit}
    </>
  );

  const inPlaceDivStyle = {
    position: 'absolute',
    zIndex: 0,
    left,
    top,
  };

  return (
    <div
      id={id}
      style={inPlaceDivStyle}
    >
      {cardShowing}
    </div>
  );
};

Card.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
  }).isRequired,
};

export default Card;
