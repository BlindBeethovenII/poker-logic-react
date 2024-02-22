import React, { useContext } from 'react';

import PropTypes from 'prop-types';

import styled from 'styled-components';

import { colToLeft, rowToTop } from '../shared/card-functions';

import { createUserActionToggleShowClue } from '../shared/user-action-functions';

import GameStateContext from '../contexts/GameStateContext';

const Button = styled.button`
  background: rgb(85,107,47);
  color: black;
  font-size: 0.8em;
  font-weight: bold;
  margin: 0.4em;
  padding: 0.2em 1em 0.2em 0.2em;
  border: 1px solid #761d38;
  border-radius: 2px;
`;

const Clue = (props) => {
  const { clueText, clueIndex, clueShowIndex } = props;

  const { toggleShowClue, addUserAction } = useContext(GameStateContext);

  const left = colToLeft(0.9);
  const top = rowToTop(4 + clueShowIndex * 0.3);

  const divstyle = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    height: '16px',
    textAlign: 'left',
    zIndex: 0,
  };

  const preventDefaultAndToggle = (e) => {
    // stop the context menu appearing
    e.preventDefault();

    toggleShowClue(clueIndex);

    // remember this userAction
    addUserAction(createUserActionToggleShowClue(clueIndex));
  };

  return (
    <div style={divstyle}>
      <Button
        onClick={preventDefaultAndToggle}
        onKeyDown={preventDefaultAndToggle}
        onContextMenu={preventDefaultAndToggle}
      >
        {clueText}
      </Button>
    </div>
  );
};

Clue.propTypes = {
  clueText: PropTypes.string.isRequired,
  clueIndex: PropTypes.number.isRequired,
  clueShowIndex: PropTypes.number.isRequired,
};

export default Clue;
