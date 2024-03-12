import React from 'react';
import Slider from 'react-slick';

import HelpPageIntro from './HelpPageIntro';
import HelpPageCardOptions from './HelpPageCardOptions';

const HelpPageSlider = () => {
  const divstyle = {
    position: 'absolute',
    top: '4px',
    left: '40px',
    width: '850px',
    height: '622px',
  };

  return (
    <div style={divstyle}>
      <Slider dots infinite={false} speed={500} slidesToShow={1} slidesToScroll={1}>
        <HelpPageIntro />
        <HelpPageCardOptions />
      </Slider>
    </div>
  );
};

export default HelpPageSlider;
