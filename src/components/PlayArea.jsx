import React from 'react';

import BorderTopLeftImage from '../images/borders/topleft.png';
import BorderTopImage from '../images/borders/top.png';
import BorderLeftImage from '../images/borders/left.png';
import BorderBottomLeftImage from '../images/borders/bottomleft.png';
import BorderBottomImage from '../images/borders/bottom.png';
import BorderTopRightImage from '../images/borders/topright.png';
import BorderBottomRightImage from '../images/borders/bottomright.png';
import BorderRightImage from '../images/borders/right.png';

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

const playbackgroundrect = {
  width: '920px',
  height: '622px',
  fill: 'rgb(85,107,47)',
};

const PlayArea = () => (
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
  </div>
);

export default PlayArea;
