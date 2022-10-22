import React, { useContext } from 'react';

import { Circle } from 'styled-spinkit';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const left = colToLeft(6) + 24;
const top = rowToTop(2);

const divstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '80px',
  height: '80px',
};

const ApplyBasicCluesButton = () => {
  const { showSpinKitCircle } = useContext(GameStateContext);

  if (!showSpinKitCircle) {
    return null;
  }

  return (
    <div style={divstyle}>
      <Circle color="white" size={80} />
    </div>
  );
};

export default ApplyBasicCluesButton;
