import React, { useContext } from 'react';

import BorderTopLeftImage from '../images/borders/topleft.png';
import BorderTopImage from '../images/borders/top.png';
import BorderLeftImage from '../images/borders/left.png';
import BorderBottomLeftImage from '../images/borders/bottomleft.png';
import BorderBottomImage from '../images/borders/bottom.png';
import BorderTopRightImage from '../images/borders/topright.png';
import BorderBottomRightImage from '../images/borders/bottomright.png';
import BorderRightImage from '../images/borders/right.png';

import SolutionHand from './SolutionHand';
import ShowHandOrdering from './ShowHandOrdering';
import SolutionPerson from './SolutionPerson';
import AvailableCardsInSuit from './AvailableCardsInSuit';
import SolutionOptions from './SolutionOptions';
import RestartButton from './RestartButton';
import NewSolutionButton from './NewSolutionButton';
import CurrentSolutionLabel from './CurrentSolutionLabel';
import HintButton from './HintButton';
import ReduceCluesButton from './ReduceCluesButton';
import HideShowSolutionButton from './HideShowSolutionButton';
import OtherCluesButton from './OtherCluesButton';
// import ApplyBasicCluesButton from './ApplyBasicCluesButton';
import Clues from './Clues';
import CompleteIncorrectMark from './CompleteIncorrectMark';
import SpinKitCircle from './SpinKitCircle';
import ShowNextHint from './ShowNextHint';

import {
  SUIT_SPADES,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  SOLUTION_OPTIONS_STATE_INVALID,
  SOLUTION_OPTIONS_STATE_DONE,
} from '../shared/constants';

import GameStateContext from '../contexts/GameStateContext';

const bordertopleft = {
  position: 'absolute',
  top: '4px',
  left: '8px',
};

const bordertop = {
  position: 'absolute',
  top: '4px',
  left: '14px',
  width: '904px',
  height: '10px',
};

const borderleft = {
  position: 'absolute',
  top: '14px',
  left: '8px',
  width: '10px',
  height: '602px',
};

const borderbottomleft = {
  position: 'absolute',
  top: '616px',
  left: '8px',
};

const borderbottom = {
  position: 'absolute',
  top: '616px',
  left: '14px',
  width: '904px',
  height: '10px',
};

const bordertopright = {
  position: 'absolute',
  top: '4px',
  left: '918px',
};

const borderbottomright = {
  position: 'absolute',
  top: '616px',
  left: '918px',
};

const borderright = {
  position: 'absolute',
  top: '14px',
  left: '918px',
  width: '10px',
  height: '602px',
};

const playbackgroundsvg = {
  position: 'absolute',
  top: '4px',
  left: '8px',
  width: '950px',
  height: '622px',
};

const PlayArea = () => {
  const { solutionOptionsState } = useContext(GameStateContext);

  let fillColour = 'rgb(85,107,47)';
  if (solutionOptionsState === SOLUTION_OPTIONS_STATE_INVALID) {
    fillColour = 'red';
  } else if (solutionOptionsState === SOLUTION_OPTIONS_STATE_DONE) {
    fillColour = 'rgb(248,214,100)';
  }

  const playbackgroundrect = {
    width: '920px',
    height: '622px',
    fill: fillColour,
  };

  return (
    <div>
      <svg style={playbackgroundsvg}>
        <rect style={playbackgroundrect} />
      </svg>
      <img src={BorderTopLeftImage} alt="bordertopleft" style={bordertopleft} />
      <img src={BorderTopImage} alt="bordertop" style={bordertop} />
      <img src={BorderLeftImage} alt="borderleft" style={borderleft} />
      <img src={BorderBottomLeftImage} alt="borderbottomleft" style={borderbottomleft} />
      <img src={BorderBottomImage} alt="borderbottom" style={borderbottom} />
      <img src={BorderTopRightImage} alt="bordertopright" style={bordertopright} />
      <img src={BorderBottomRightImage} alt="borderbottomright" style={borderbottomright} />
      <img src={BorderRightImage} alt="borderright" style={borderright} />
      <SolutionHand solutionHandIndex={0} />
      <SolutionHand solutionHandIndex={1} />
      <SolutionHand solutionHandIndex={2} />
      <SolutionHand solutionHandIndex={3} />
      <ShowHandOrdering />
      <SolutionPerson solutionPersonIndex={0} />
      <SolutionPerson solutionPersonIndex={1} />
      <SolutionPerson solutionPersonIndex={2} />
      <SolutionPerson solutionPersonIndex={3} />
      <AvailableCardsInSuit suit={SUIT_SPADES} />
      <AvailableCardsInSuit suit={SUIT_HEARTS} />
      <AvailableCardsInSuit suit={SUIT_DIAMONDS} />
      <AvailableCardsInSuit suit={SUIT_CLUBS} />
      <SolutionOptions />
      <RestartButton />
      <NewSolutionButton />
      <NewSolutionButton hardCoded />
      <CurrentSolutionLabel />
      <HintButton getHint />
      <HintButton applyOne />
      <HintButton applyAll />
      <ReduceCluesButton />
      <HideShowSolutionButton />
      <OtherCluesButton />
      <Clues />
      <CompleteIncorrectMark />
      <SpinKitCircle />
      <ShowNextHint />
    </div>
  );
};

export default PlayArea;
