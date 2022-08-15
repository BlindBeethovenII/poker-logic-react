import React, { useContext, useState } from 'react';

// import PropTypes from 'prop-types';

import CardBlankImage from '../images/cards/cardblank.png';

import {
  colToLeft,
  rowToTop,
  cardNumberToString,
  cardSuitToImage,
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

  // the number options - A, 2, 3, ..., K - true means visible - if only one true then that is the selected number (ignoring the missingNumber entry, which is always true)
  const [numberOptions, setNumberOptions] = useState([true, true, true, true, true, true, true, true, true, true, true, true, true]);

  // the suit options - S, H, D, C - true means visible - if only one true then that is the selected number
  const [suitOptions, setSuitOptions] = useState([true, true, true, true]);

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

  const preventDefault = (e) => {
    e.preventDefault();
  };

  const blankDiv = (
    <div
      key={`${id}-blank`}
      id={`${id}-blank`}
      style={blankDivStyle}
      onContextMenu={preventDefault}
    >
      {cardblank}
    </div>
  );

  components.push(blankDiv);

  // keep track of which internal col/row we are next placing the internal component in
  let internalCol = 0;
  let internalRow = 0;

  // we show different things if there is only one suit option and/or one number option
  // helper function to count
  const countAvailableOptionsReducer = (accumulator, currentValue) => accumulator + (currentValue ? 1 : 0);
  const suitOptionsCount = suitOptions.reduce(countAvailableOptionsReducer);
  const numberOptionsCount = numberOptions.reduce(countAvailableOptionsReducer);
  // console.log(`numberOptionsCount = ${numberOptionsCount}`);

  // now work through the suits and draw each, drawing faded if not selected
  for (let suitIndex = 0; suitIndex < 4; suitIndex += 1) {
    const suit = cardSuitIndexToSuit(suitIndex);
    const faded = !suitOptions[suitIndex];

    // is this the single suit option?
    const isSingleSuitOption = (suitOptionsCount === 1 && suitOptions[suitIndex]);

    // also care if we the single suit option when there is only one number option left (remember missing number option always true)
    const isSingleSuitAndNumberOption = isSingleSuitOption && numberOptionsCount === 2;

    let height = isSingleSuitAndNumberOption ? '42px' : '21px';
    if (suit === SUIT_SPADES) {
      height = isSingleSuitAndNumberOption ? '38px' : '19px';
    } else if (suit === SUIT_CLUBS) {
      height = isSingleSuitAndNumberOption ? '40px' : '20px';
    }

    const cardsuitstyle = {
      position: 'absolute',
      left: isSingleSuitAndNumberOption ? '22px' : '0px',
      top: suit === SUIT_SPADES ? '2px' : '0px',
      width: isSingleSuitAndNumberOption ? '40px' : '20px',
      height,
      opacity: faded ? 0.2 : 1,
    };

    const cardsuit = <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />;

    // left offset depends on if we are the singleSuitOption, with the single suit option always in internal col index 3
    // or if there is just a single suit and numbe option left
    let leftOffset = internalCol * colInternalSize;
    if (isSingleSuitAndNumberOption) {
      leftOffset = 0;
    } else if (isSingleSuitOption) {
      leftOffset = 3 * colInternalSize;
    }

    const suitDivStyle = {
      position: 'absolute',
      zIndex: 0,
      left: left + leftOffset,
      top: top + (internalRow * rowInternalSize),
    };

    // set this suit as the only selected suit
    const suitSelectThisOptionOnly = () => {
      logIfDevEnv(`suitSelectThisOptionOnly ${suit}`);

      const newSuitOptions = [false, false, false, false];
      newSuitOptions[suitIndex] = true;
      setSuitOptions(newSuitOptions);
    };

    // toggle the selected value of the suit
    const suitToggleOption = (e) => {
      logIfDevEnv(`suitToggleOption ${suit}`);

      // stop the context menu appearing
      e.preventDefault();

      // if this is the single suit option, then toggle means make all options available again
      if (isSingleSuitOption) {
        const newSuitOptions = [true, true, true, true];
        setSuitOptions(newSuitOptions);
      } else {
        // toggle corresponding suit index
        const newSuitOptions = [...suitOptions];
        newSuitOptions[suitIndex] = !suitOptions[suitIndex];
        setSuitOptions(newSuitOptions);
      }
    };

    const suitDiv = (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        key={`${id}-${suit}`}
        id={`${id}-${suit}`}
        style={suitDivStyle}
        role="button"
        onClick={suitSelectThisOptionOnly}
        onKeyDown={suitSelectThisOptionOnly}
        onContextMenu={suitToggleOption}
      >
        {cardsuit}
      </div>
    );

    // only keep a component if more than one option, or this is the single suit option
    if (suitOptionsCount > 1 || isSingleSuitOption) {
      components.push(suitDiv);
    }

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

      // is this the single number option? remember the missing number option is always true
      const isSingleNumberOption = (numberOptionsCount === 2 && numberOptions[numberIndex]);

      const cardnumberstyle = {
        position: 'absolute',
        left: '0px',
        top: isSingleNumberOption ? '40px' : '0px',
        width: isSingleNumberOption ? '40px' : '20px',
        height: isSingleNumberOption ? '40px' : '20px',
        fontWeight: 'bold',
        fontSize: isSingleNumberOption ? '36px' : '18px',
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

      // if only number, go back to how the proper card has it
      if (isSingleNumberOption) {
        textX = number === NUMBER_10 ? 4 : 10;
      }

      const cardnumber = (
        <div style={cardnumberstyle}>
          <svg width="60px" height="40px">
            <text x={textX} y={isSingleNumberOption ? 30 : 15}>
              {cardNumberToString(number)}
            </text>
          </svg>
        </div>
      );

      const leftOffset = isSingleNumberOption ? 0 : (internalCol * colInternalSize) - 2;
      const topOffset = isSingleNumberOption ? 0 : (internalRow * rowInternalSize);

      const numberDivStyle = {
        position: 'absolute',
        zIndex: 0,
        left: left + leftOffset,
        top: top + topOffset,
      };

      // set this number as the only selected number
      const numberSelectThisOptionOnly = () => {
        logIfDevEnv(`numberSelectThisOptionOnly ${number}`);

        const newNumberOptions = [false, false, false, false, false, false, false, false, false, false, false, false, false];
        newNumberOptions[numberIndex] = true;
        // and the missing number entry is always true as well (which we assume in 'only one number selected' count)
        newNumberOptions[missingNumber - 1] = true;
        setNumberOptions(newNumberOptions);
      };

      const numberToggleOption = (e) => {
        logIfDevEnv(`numberToggleOption ${number}`);

        // stop the context menu appearing
        e.preventDefault();

        // if this is the single number option, then toggle means make all options available again
        if (isSingleNumberOption) {
          const newNumberOptions = [true, true, true, true, true, true, true, true, true, true, true, true, true];
          setNumberOptions(newNumberOptions);
        } else {
          // toggle corresponding number index
          const newNumberOptions = [...numberOptions];
          newNumberOptions[numberIndex] = !numberOptions[numberIndex];
          setNumberOptions(newNumberOptions);
        }
      };

      const numberDiv = (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <div
          key={`${id}-${number}`}
          id={`${id}-${number}`}
          style={numberDivStyle}
          role="button"
          onClick={numberSelectThisOptionOnly}
          onKeyDown={numberSelectThisOptionOnly}
          onContextMenu={numberToggleOption}
        >
          {cardnumber}
        </div>
      );

      // only keep a component if more than one option (remembering missing number option is always true), or this is the single number option
      if (numberOptionsCount > 2 || isSingleNumberOption) {
        components.push(numberDiv);
      }

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
