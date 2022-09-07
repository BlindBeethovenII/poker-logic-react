import React, { useContext } from 'react';

import TickBoxEmpty from '../images/orts/tickbox_empty.png';
import TickBoxCrossed from '../images/orts/tickbox_crossed.png';
import TickBoxTicked from '../images/orts/tickbox_ticked.png';

import { colToLeft, rowToTop } from '../shared/card-functions';

import { solutionOptionsValid, isSolutionOptionsComplete } from '../shared/solution-functions';

import GameStateContext from '../contexts/GameStateContext';

const CompleteIncorrectMark = () => {
  const { solutionOptions, solutionHands, cardsAvailable } = useContext(GameStateContext);

  const left = colToLeft(6) + 4;
  const top = rowToTop(0);

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
    width: '26px',
    height: '26px',
  };

  const tickBoxEmpty = <img src={TickBoxEmpty} alt="tickboxempty" style={cardbasestyle} />;
  const tickBoxCrossed = <img src={TickBoxCrossed} alt="tickboxcrossed" style={cardbasestyle} />;
  const tickBoxTicked = <img src={TickBoxTicked} alt="tickboxticked" style={cardbasestyle} />;

  const inPlaceDivStyle = {
    position: 'absolute',
    zIndex: 0,
    left,
    top,
  };

  // what to show
  let tickBox = tickBoxEmpty;
  if (!solutionOptionsValid(solutionOptions, solutionHands)) {
    tickBox = tickBoxCrossed;
  } else if (isSolutionOptionsComplete(cardsAvailable, solutionOptions)) {
    tickBox = tickBoxTicked;
  }

  return (
    <div
      style={inPlaceDivStyle}
    >
      {tickBox}
    </div>
  );
};

export default CompleteIncorrectMark;
