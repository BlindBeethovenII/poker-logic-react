import React, { useContext, useState } from 'react';

// import PropTypes from 'prop-types';

import CardBlankImage from '../images/cards/cardblank.png';

import {
  colToLeft,
  rowToTop,
  cardNumberToString,
  cardSuitToImage,
  cardSuitToFillColour,
  cardSuitIndexToSuit,
} from '../shared/card-functions';

import {
  SUIT_SPADES,
  SUIT_CLUBS,
  NUMBER_10,
  NUMBER_J,
  NUMBER_Q,
  NUMBER_K,
} from '../shared/constants';

import logIfDevEnv from '../shared/logIfDevEnv';

import GameStateContext from '../contexts/GameStateContext';

const CardOptions = () => {
  // we need to know the missing number
  const { missingNumber } = useContext(GameStateContext);

  // TODO - get options from context

  // TODO
  const id = 'test';

  // the number options - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number
  const [numberOptions, setNumberOptions] = useState([true, true, true, true, true, true, true, true, true, true, true, true, true]);

  // the suit options - S, H, D, C - true means visible - if only one true then that is the selected number
  const [suitOptions, setSuitOptions] = useState([true, true, true, true]);

  // unselect the missing number - TODO - do this at creation - OR? do we need to understand the missingNumber so other way?
  // numberOptions[missingNumber - 1] = false;

  // draw these
  const left = colToLeft(1);
  const top = rowToTop(1);

  // internal column and row sizes
  const colInternalSize = 15;
  const rowInternalSize = 20;

  // the components to draw
  const components = [];

  // hoping to hold it all inside a full size blank card
  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
    width: '63px',
    height: '81px',
    opacity: 1,
  };

  const cardblank = <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />;

  const blankDivStyle = {
    position: 'absolute',
    zIndex: 0,
    left,
    top,
  };

  const blankDiv = (
    <div
      key={`${id}-blank`}
      id={`${id}-blank`}
      style={blankDivStyle}
    >
      {cardblank}
    </div>
  );

  components.push(blankDiv);

  // now work through the suits and draw each, drawing faded if not selected
  let internalCol = 0;
  let internalRow = 0;
  for (let suitIndex = 0; suitIndex < 4; suitIndex += 1) {
    const suit = cardSuitIndexToSuit(suitIndex);
    const faded = !suitOptions[suitIndex];

    let height = '21px';
    if (suit === SUIT_SPADES) {
      height = '19px';
    } else if (suit === SUIT_CLUBS) {
      height = '20px';
    }

    const cardsuitstyle = {
      position: 'absolute',
      left: '0px',
      top: suit === SUIT_SPADES ? '2px' : '0px',
      width: '20px',
      height,
      opacity: faded ? 0.2 : 1,
    };

    const cardsuit = <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />;

    const suitDivStyle = {
      position: 'absolute',
      zIndex: 0,
      left: left + (internalCol * colInternalSize),
      top: top + (internalRow * rowInternalSize),
    };

    // toggle the selected value of the suit
    const suitToggleSelected = () => {
      logIfDevEnv(`suitToggleSelected ${suit}`);

      // toggle corresponding suit index
      const newSuitOptions = [...suitOptions];
      newSuitOptions[suitIndex] = !suitOptions[suitIndex];
      setSuitOptions(newSuitOptions);
    };

    // set this suit as the only selected suit
    const suitSelectThisOnly = () => {
      logIfDevEnv(`suitSelectThisOnly ${suit}`);

      const newSuitOptions = [false, false, false, false];
      newSuitOptions[suitIndex] = true;
      setSuitOptions(newSuitOptions);
    };

    const suitDiv = (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        key={`${id}-${suit}`}
        id={`${id}-${suit}`}
        style={suitDivStyle}
        role="button"
        onClick={suitToggleSelected}
        onKeyDown={suitToggleSelected}
        onDoubleClick={suitSelectThisOnly}
      >
        {cardsuit}
      </div>
    );

    components.push(suitDiv);

    // move to the next position
    internalCol += 1;
    if (internalCol > 3) {
      internalCol = 0;
      internalRow += 1;
    }
  }

  // work through the numbers and draw each, remembering to skip the missing number, drawing faded if not selected
  for (let numberIndex = 0; numberIndex < 13; numberIndex += 1) {
    const number = numberIndex + 1;
    if (number !== missingNumber) {
      const faded = !numberOptions[numberIndex];

      const cardnumberstyle = {
        position: 'absolute',
        left: '0px',
        top: '0px',
        width: '20px',
        height: '20px',
        fontWeight: 'bold',
        fontSize: '18px',
        letterSpacing: '-0.1em',
        userSelect: 'none',
        MozUserSelect: 'none',
        WebkitUserSelect: 'none',
        msUserSelect: 'none',
        opacity: faded ? 0.2 : 1,
      };

      let textX = 5;
      if (number === NUMBER_10) {
        textX = 2;
      }
      if (number === NUMBER_J) {
        textX = 7;
      }
      if (number === NUMBER_Q && missingNumber !== NUMBER_J) {
        textX = 3;
      }
      if (number === NUMBER_K) {
        textX = 4;
      }
      const cardnumber = (
        <div style={cardnumberstyle}>
          <svg width="60px" height="40px">
            <text x={textX} y={15} fill={cardSuitToFillColour(SUIT_SPADES)}>
              {cardNumberToString(number)}
            </text>
          </svg>
        </div>
      );

      const numberDivStyle = {
        position: 'absolute',
        zIndex: 0,
        left: left + (internalCol * colInternalSize) - 2,
        top: top + (internalRow * rowInternalSize),
      };

      const numberToggleSelected = () => {
        logIfDevEnv(`numberToggleSelected ${number}`);

        // toggle corresponding number index
        const newNumberOptions = [...numberOptions];
        newNumberOptions[numberIndex] = !numberOptions[numberIndex];
        setNumberOptions(newNumberOptions);
      };

      // set this number as the only selected number
      const numberSelectThisOnly = () => {
        logIfDevEnv(`numberSelectThisOnly ${number}`);

        const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
        newNumberOptions[numberIndex] = true;
        setNumberOptions(newNumberOptions);
      };

      const numberDiv = (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <div
          key={`${id}-${number}`}
          id={`${id}-${number}`}
          style={numberDivStyle}
          role="button"
          onClick={numberToggleSelected}
          onKeyDown={numberToggleSelected}
          onDoubleClick={numberSelectThisOnly}
        >
          {cardnumber}
        </div>
      );

      components.push(numberDiv);

      // move to the next position
      internalCol += 1;
      if (internalCol > 3) {
        internalCol = 0;
        internalRow += 1;
      }
    }
  }

  return components;
};

CardOptions.propTypes = {
};

CardOptions.defaultProps = {
};

export default CardOptions;
