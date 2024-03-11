import React from 'react';
import Slider from 'react-slick';

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
      <Slider dots infinite speed={500} slidesToShow={1} slidesToScroll={1}>
        <div>
          <h3>Help Page 1</h3>
        </div>
        <div>
          <h3>Help Page 2</h3>
        </div>
        <div>
          <h3>Help Page 3</h3>
        </div>
        <div>
          <h3>Help Page 4</h3>
        </div>
        <div>
          <h3>Help Page 5</h3>
        </div>
        <div>
          <h3>Help Page 6</h3>
        </div>
      </Slider>
    </div>
  );
};

export default HelpPageSlider;
