import React, { useContext } from 'react';

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
  // get our stuff from the game state context
  const {
    missingNumber,
    cardOptions,
    setSuitOptionOnly,
    toggleSuitOption,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    resetNumberOptions,
  } = useContext(GameStateContext);

  // TODO
  const id = 'test';

  // extract the suit and number options
  const { suitOptions, numberOptions } = cardOptions;

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

  const blankDivId = `${id}-blank`;

  const blankDiv = (
    <div
      key={blankDivId}
      id={blankDivId}
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
  for (let suitOptionsIndex = 0; suitOptionsIndex < 4; suitOptionsIndex += 1) {
    const suit = cardSuitIndexToSuit(suitOptionsIndex);
    const faded = !suitOptions[suitOptionsIndex];

    // is this the single suit option?
    const isSingleSuitOption = (suitOptionsCount === 1 && suitOptions[suitOptionsIndex]);

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
      setSuitOptionOnly(suitOptionsIndex);
    };

    // toggle the selected value of the suit
    const suitToggleOption = (e) => {
      logIfDevEnv(`suitToggleOption ${suit}`);

      // stop the context menu appearing
      e.preventDefault();

      // if this is the single suit option, then toggle means make all options available again
      if (isSingleSuitOption) {
        resetSuitOptions();
      } else {
        // toggle corresponding suit index
        toggleSuitOption(suitOptionsIndex);
      }
    };

    const suitDivId = `${id}-${suit}`;

    const suitDiv = (
      // eslint-disable-next-line jsx-a11y/interactive-supports-focus
      <div
        key={suitDivId}
        id={suitDivId}
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
  for (let numberOptionsIndex = 0; numberOptionsIndex < 13; numberOptionsIndex += 1) {
    const number = numberOptionsIndex + 1;
    if (number !== missingNumber) {
      const faded = !numberOptions[numberOptionsIndex];

      // is this the single number option? remember the missing number option is always true
      const isSingleNumberOption = (numberOptionsCount === 2 && numberOptions[numberOptionsIndex]);

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

        setNumberOptionOnly(numberOptionsIndex);
      };

      const numberToggleOption = (e) => {
        logIfDevEnv(`numberToggleOption ${number}`);

        // stop the context menu appearing
        e.preventDefault();

        // if this is the single number option, then toggle means make all options available again
        if (isSingleNumberOption) {
          resetNumberOptions();
        } else {
          // toggle corresponding number index
          toggleNumberOption(numberOptionsIndex);
        }
      };

      const numberDivId = `${id}-${number}`;

      const numberDiv = (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <div
          key={numberDivId}
          id={numberDivId}
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
