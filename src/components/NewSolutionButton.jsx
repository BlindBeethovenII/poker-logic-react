import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import GameStateContext from '../contexts/GameStateContext';

const Button = styled.button`
  background: #761d38;
  color: white;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid #761d38;
  border-radius: 3px;
`;

const NewSolutionButton = (props) => {
  const { hardCoded } = props;

  const { newSolution, nextHardCodedSolution } = useContext(GameStateContext);

  const offset = hardCoded ? 3 : 0;

  const left = colToLeft(1.7 + offset);
  const top = rowToTop(4);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    width: '40px',
    height: '40px',
  };

  const buttonText = hardCoded ? `Use Solution ${nextHardCodedSolution}` : 'New Random Solution';

  const callNewSolution = () => {
    if (hardCoded) {
      newSolution(nextHardCodedSolution);
    } else {
      newSolution();
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
