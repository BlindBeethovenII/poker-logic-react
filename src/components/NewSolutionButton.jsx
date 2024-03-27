import React, { useContext } from 'react';

import PropTypes from 'prop-types';

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

const NewSolutionButton = (props) => {
  const { hardCoded } = props;

  const { newSolution, nextHardCodedSolution, setShowSpinKitCircle } = useContext(GameStateContext);

  const offset = hardCoded ? 1.8 : 0;

  const left = colToLeft(8 + offset);
  const top = rowToTop(5.95);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const newSolutionWithTurnOffSpinner = () => {
    newSolution();
    setShowSpinKitCircle(false);
  };

  const buttonText = hardCoded ? `Use Puzzle ${nextHardCodedSolution}` : 'New Random Puzzle';

  const callNewSolution = () => {
    if (hardCoded) {
      newSolution(nextHardCodedSolution);
    } else {
      setShowSpinKitCircle(true);
      setTimeout(newSolutionWithTurnOffSpinner, 500);
    }
  };

  return (
    <div style={divstyle}>
      <Button onClick={callNewSolution}>{buttonText}</Button>
    </div>
  );
};

NewSolutionButton.propTypes = {
  hardCoded: PropTypes.bool,
};

NewSolutionButton.defaultProps = {
  hardCoded: false,
};

export default NewSolutionButton;
