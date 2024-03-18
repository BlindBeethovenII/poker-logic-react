import React, { useContext } from 'react';
import Slider from 'react-slick';

import HelpPageIntro from './HelpPageIntro';
import HelpPageCardsAvailable from './HelpPageCardsAvailable';
import HelpPageHandSorting from './HelpPageHandSorting';
import HelpPageClues from './HelpPageClues';
import HelpPageClueTypes from './HelpPageClueTypes';
import HelpPageCardOptions from './HelpPageCardOptions';
import HelpPageHints from './HelpPageHints';
import HelpPageGeneratingPuzzles from './HelpPageGeneratingPuzzles';

import GameStateContext from '../contexts/GameStateContext';

const HelpPageSlider = () => {
  const { currentHelpPage, setCurrentHelpPage } = useContext(GameStateContext);

  const divstyle = {
    position: 'absolute',
    top: '4px',
    left: '40px',
    width: '850px',
    height: '622px',
  };

  const afterChangeFunc = (current) => setCurrentHelpPage(current);

  return (
    <div style={divstyle}>
      <Slider dots infinite={false} speed={500} slidesToShow={1} slidesToScroll={1} initialSlide={currentHelpPage} afterChange={afterChangeFunc}>
        <HelpPageIntro />
        <HelpPageCardsAvailable />
        <HelpPageHandSorting />
        <HelpPageClues />
        <HelpPageClueTypes />
        <HelpPageCardOptions />
        <HelpPageHints />
        <HelpPageGeneratingPuzzles />
      </Slider>
    </div>
  );
};

export default HelpPageSlider;
