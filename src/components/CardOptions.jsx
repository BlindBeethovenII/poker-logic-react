import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import { isMobile } from 'react-device-detect';

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
  NUMBERS_SORTED,
} from '../shared/constants';

import {
  createUserActionSetSuitOptionOnly,
  createUserActionSetSuitOptionOnlyToCardsInHand,
  createUserActionResetSuitOptions,
  createUserActionTurnOffSuitInHandIfOnAndNotPlaced,
  createUserActionToggleSuitOption,
  createUserActionSetNumberOptionOnly,
  createUserActionResetNumberOptions,
  createUserActionToggleNumberOption,
  createUserActionTurnOffNumberInHandIfOnAndNotPlaced,
} from '../shared/user-action-functions';

import logIfDevEnv from '../shared/logIfDevEnv';

import GameStateContext from '../contexts/GameStateContext';

const CardOptions = (props) => {
  const { solutionOptionsIndex, handOptionsIndex } = props;

  // get our stuff from the game state context
  const {
    missingNumber,
    solutionOptions,
    setSuitOptionOnly,
    setSuitOptionOnlyToCardsInHand,
    toggleSuitOption,
    turnOffSuitInHandIfOnAndNotPlaced,
    resetSuitOptions,
    setNumberOptionOnly,
    toggleNumberOption,
    turnOffNumberInHandIfOnAndNotPlaced,
    resetNumberOptions,
    addUserAction,
  } = useContext(GameStateContext);

  // form our id based on our hand option index
  const id = `card-options-${solutionOptionsIndex}-${handOptionsIndex}`;

  // extract our suit and number options
  const { suitOptions, numberOptions } = solutionOptions[solutionOptionsIndex][handOptionsIndex];

  // draw the suit and number options, within a blank card, at this col/row position
  const left = colToLeft(handOptionsIndex + 1);
  const top = rowToTop(solutionOptionsIndex);

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

    // also care if we are the single suit option when there is only one number option left (remember missingNumber option always false)
    const isSingleSuitAndNumberOption = isSingleSuitOption && numberOptionsCount === 1;

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
      opacity: faded ? 0 : 1,
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
    const suitSelectThisOptionOnly = (e) => {
      logIfDevEnv(`suitSelectThisOptionOnly ${suit}`);

      // if this suit is already selected, then do nothing
      if (isSingleSuitOption) {
        logIfDevEnv(`suitSelectThisOptionOnly ${suit} already selected, doing nothing`);
        return;
      }
      // if the shift key is down, then set for all cards in this hand
      if (e.shiftKey || e.ctrlKey) {
        setSuitOptionOnlyToCardsInHand(suitOptionsIndex, solutionOptionsIndex);

        // remember this userAction
        addUserAction(createUserActionSetSuitOptionOnlyToCardsInHand(suitOptionsIndex, solutionOptionsIndex));
      } else {
        // just set for this card
        setSuitOptionOnly(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex);

        // remember this userAction
        addUserAction(createUserActionSetSuitOptionOnly(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex));
      }
    };

    // toggle the selected value of the suit
    const suitToggleOption = (e) => {
      logIfDevEnv(`suitToggleOption ${suit}`);

      // stop the context menu appearing
      e.preventDefault();

      // if this is the single suit option, then toggle means make all options available again
      if (isSingleSuitOption) {
        resetSuitOptions(solutionOptionsIndex, handOptionsIndex);

        // remember this userAction
        addUserAction(createUserActionResetSuitOptions(solutionOptionsIndex, handOptionsIndex));
      } else if (e.shiftKey || e.ctrlKey) {
        // the shift key is down turn off suit in each card in this hand for which the suit is on an not placed
        turnOffSuitInHandIfOnAndNotPlaced(suitOptionsIndex, solutionOptionsIndex);

        // remember this userAction
        addUserAction(createUserActionTurnOffSuitInHandIfOnAndNotPlaced(suitOptionsIndex, solutionOptionsIndex));
      } else {
        // toggle corresponding suit index
        toggleSuitOption(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex);

        // remember this userAction
        addUserAction(createUserActionToggleSuitOption(suitOptionsIndex, solutionOptionsIndex, handOptionsIndex));
      }
    };

    const suitDivId = `${id}-suit-${suit}`;

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

  // work through the numbers and draw each, remembering to skip the missingNumber, drawing faded if not selected
  // we now go through the numbers in the order we want to draw them in CardOptions, which is A,K,Q,J, ... 5,4,3,2, which is NUMBERS_SORTED
  NUMBERS_SORTED.forEach((number) => {
    if (number !== missingNumber) {
      const faded = !numberOptions[number - 1];

      // is this the single number option? remember the missingNumber option is always false
      const isSingleNumberOption = (numberOptionsCount === 1 && numberOptions[number - 1]);

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
        opacity: faded ? 0 : 1,
      };

      let textX = 5;
      if (number === NUMBER_10 && missingNumber === NUMBER_J) {
        textX = 0;
      }
      if (number === NUMBER_10 && missingNumber !== NUMBER_J) {
        textX = 2;
      }
      if (number === NUMBER_J) {
        textX = 7;
      }
      if (number === NUMBER_Q && missingNumber !== NUMBER_J) {
        textX = 3;
      }
      if (number === NUMBER_Q && missingNumber === NUMBER_J) {
        textX = 2;
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
      // note: no use for selecting this number of all cards in this hand - there is no such poker hand
      const numberSelectThisOptionOnly = () => {
        logIfDevEnv(`numberSelectThisOptionOnly ${number}`);

        setNumberOptionOnly(number, solutionOptionsIndex, handOptionsIndex);

        // remember this userAction
        addUserAction(createUserActionSetNumberOptionOnly(number, solutionOptionsIndex, handOptionsIndex));
      };

      // toggle the number option if the right button is selected
      const onMouseDownNumber = (e) => {
        if (e.buttons === 2) {
          logIfDevEnv(`onMouseDownNumber: right button on for number ${number}`);

          // stop the context menu appearing
          e.preventDefault();

          // if this is the single number option, then toggle means make all options available again
          if (isSingleNumberOption) {
            resetNumberOptions(solutionOptionsIndex, handOptionsIndex);

            // remember this userAction
            addUserAction(createUserActionResetNumberOptions(solutionOptionsIndex, handOptionsIndex));
          } else if (e.shiftKey || e.ctrlKey) {
            // the shift key is down so turn off this number for all cards in this hand that are on and not yet placed
            turnOffNumberInHandIfOnAndNotPlaced(number, solutionOptionsIndex);

            // remember this userAction
            addUserAction(createUserActionTurnOffNumberInHandIfOnAndNotPlaced(number, solutionOptionsIndex));
          } else {
            // toggle just this card's number
            logIfDevEnv(`onMouseDownNumber ${number} calling toggleNumberOption`);
            toggleNumberOption(number, solutionOptionsIndex, handOptionsIndex);

            // remember this userAction
            addUserAction(createUserActionToggleNumberOption(number, solutionOptionsIndex, handOptionsIndex));
          }
        }
      };

      // if we enter a number with right button and we are a non-single number option that is selected - then toggle off
      const onMouseEnterNumber = (e) => {
        if (e.buttons === 2) {
          logIfDevEnv(`onMouseEnterNumber: right button on for number ${number}`);

          if (!isSingleNumberOption && !faded) {
            if (e.shiftKey || e.ctrlKey) {
              // the shift key is down so turn off this number for all cards in this hand that are on and not yet placed
              turnOffNumberInHandIfOnAndNotPlaced(number, solutionOptionsIndex);

              // remember this userAction
              addUserAction(createUserActionTurnOffNumberInHandIfOnAndNotPlaced(number, solutionOptionsIndex));
            } else {
              // toggle just this card's number
              logIfDevEnv(`onMouseEnterNumber ${number} calling toggleNumberOption`);
              toggleNumberOption(number, solutionOptionsIndex, handOptionsIndex);

              // remember this userAction
              addUserAction(createUserActionToggleNumberOption(number, solutionOptionsIndex, handOptionsIndex));
            }
          }
        }
      };

      // the context menu for a number - only used on a mobile
      const onContextMenuNumber = (e) => {
        logIfDevEnv(`onContextMenuNumber: for number ${number} isMobile=${isMobile}`);

        e.preventDefault();

        // if we are on a mobile, then we come in this way to toggle the selected number option
        // note: shift/ctrl key won't be involved, so we don't have "else if (e.shiftKey || e.ctrlKey)"
        if (isMobile) {
          // if this is the single number option, then toggle means make all options available again
          if (isSingleNumberOption) {
            resetNumberOptions(solutionOptionsIndex, handOptionsIndex);

            // remember this userAction
            addUserAction(createUserActionResetNumberOptions(solutionOptionsIndex, handOptionsIndex));
          } else {
            // toggle just this card's number
            logIfDevEnv(`onContextMenuNumber ${number} calling toggleNumberOption`);
            toggleNumberOption(number, solutionOptionsIndex, handOptionsIndex);

            // remember this userAction
            addUserAction(createUserActionToggleNumberOption(number, solutionOptionsIndex, handOptionsIndex));
          }
        }
      };

      const numberDivId = `${id}-num-${number}`;

      const numberDiv = (
        // eslint-disable-next-line jsx-a11y/interactive-supports-focus
        <div
          key={numberDivId}
          id={numberDivId}
          style={numberDivStyle}
          role="button"
          onClick={numberSelectThisOptionOnly}
          onKeyDown={numberSelectThisOptionOnly}
          onMouseDown={onMouseDownNumber}
          onMouseEnter={onMouseEnterNumber}
          onContextMenu={onContextMenuNumber}
        >
          {cardnumber}
        </div>
      );

      // only keep a component if more than one option (remembering missingNumber option is always false), or this is the single number option
      if (numberOptionsCount > 1 || isSingleNumberOption) {
        components.push(numberDiv);
      }

      // move to the next position
      internalCol += 1;
      if (internalCol > 3) {
        internalCol = 0;
        internalRow += 1;
      }
    }
  });

  return components;
};

CardOptions.propTypes = {
  solutionOptionsIndex: PropTypes.number.isRequired,
  handOptionsIndex: PropTypes.number.isRequired,
};

export default CardOptions;
