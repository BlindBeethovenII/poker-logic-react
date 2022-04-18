import React from 'react';

import PropTypes from 'prop-types';

import CardBlankImage from '../images/cards/cardblank.png';

import {
  colToLeft,
  rowToTop,
  colToLeftSmall,
  rowToTopSmall,
  cardNumberToString,
  cardSuitToImage,
  cardSuitToFillColour,
} from '../shared/card-functions';

import {
  SUIT_SPADES,
  SUIT_CLUBS,
  NUMBER_10,
} from '../shared/constants';

const Card = (props) => {
  // we are given the card and the col/row it is to be shown at
  const {
    col,
    row,
    card,
    small,
  } = props;

  // there are the card details - including where it was showing before
  const {
    id,
    suit,
    number,
  } = card;

  // convert the cols and rows into left/top
  const left = small ? colToLeftSmall(col) : colToLeft(col);
  const top = small ? rowToTopSmall(row) : rowToTop(row);

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
    width: small ? '31px' : '63px',
    height: small ? '40px' : '81px',
  };

  const cardnumberstyle = {
    position: 'absolute',
    left: '0px',
    top: small ? '20px' : '40px',
    width: small ? '20px' : '40px',
    height: small ? '20px' : '40px',
    fontWeight: 'bold',
    fontSize: small ? '18px' : '36px',
    letterSpacing: '-0.1em',
    userSelect: 'none',
    MozUserSelect: 'none',
    WebkitUserSelect: 'none',
    msUserSelect: 'none',
  };

  let height = small ? '21px' : '42px';
  if (suit === SUIT_SPADES) {
    height = small ? '19px' : '38px';
  } else if (suit === SUIT_CLUBS) {
    height = small ? '20px' : '40px';
  }

  const cardsuitstyle = {
    position: 'absolute',
    left: small ? '11px' : '22px',
    top: suit === SUIT_SPADES ? '2px' : '0px',
    width: small ? '20px' : '40px',
    height,
  };

  // the inside of the motion.div or div is the same regardless of if we animate the card into position
  const cardblank = <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />;
  let textX = small ? 5 : 10;
  if (number === NUMBER_10) {
    textX = small ? 2 : 4;
  }
  const cardnumber = (
    <div style={cardnumberstyle}>
      <svg width="60px" height="40px">
        <text x={textX} y={small ? 15 : 30} fill={cardSuitToFillColour(suit)}>
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
  small: PropTypes.bool,
};

Card.defaultProps = {
  small: false,
};

export default Card;
