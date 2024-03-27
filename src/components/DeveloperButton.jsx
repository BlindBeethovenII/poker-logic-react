import React, { useContext } from 'react';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const Button = styled.button`
  background: grey;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 3px solid black;
  border-radius: 8px;
`;

const DeveloperButton = () => {
  const { runDeveloperCode, setShowSpinKitCircle, showSolution } = useContext(GameStateContext);

  // don't show if the solution is showing, as the solution uses the same space
  if (showSolution) {
    return null;
  }

  // don't show if in production - this button is only used when I'm developing
  if (process.env.NODE_ENV === 'production') {
    return null;
  }

  const left = colToLeft(11.7);
  const top = rowToTop(7) + 4;

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const runDeveloperCodeWithSpinner2 = () => {
    runDeveloperCode();
    setShowSpinKitCircle(false);
  };

  const runDeveloperCodeWithSpinner = () => {
    setShowSpinKitCircle(true);
    setTimeout(runDeveloperCodeWithSpinner2, 500);
  };

  return (
    <div style={divstyle}>
      <Button onClick={runDeveloperCodeWithSpinner}>Run Dev Code</Button>
    </div>
  );
};

export default DeveloperButton;
