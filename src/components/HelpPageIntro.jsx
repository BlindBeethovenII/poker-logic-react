import React from 'react';

const HelpPageIntro = () => {
  const divstyle = {
  };

  return (
    <div style={divstyle}>
      <h3>Introduction</h3>
      <p>
        Poker Logic is a logic puzzle along the lines of the fantasic puzzles applications created by Everett Kaser (see
        {' '}
        <a href="https://www.kaser.com/home.html" target="_blank" rel="noreferrer noopener">Everett Kaser Software</a>
      </p>
      <p>I have always wanted to develop such a logic puzzle and this is my first attempt.</p>
      <p>The aim of the logic puzzle is to determine the poker hand for each of the four players.</p>
      <p>These four players are currently show as 1, 2, 3 and 4 and their hands are ranked.</p>
      <p>Player 1&apos;s hand always beats player 2&apos;s, player 2&apos;s hand always beats player 3&apos;s, and player 3&apos;s hand always beats player 4&apos;s.</p>
      <p>The ranking of the hands is hard-coded into each Poker Logic puzzle and so you will need to use this information to solve each puzzle.</p>
      <h4>Note: This is an early release of Poker Logic, which is fully functional but I recognise that the UI is pretty poor.  Most of the coding work has been in the logic of the puzzle.</h4>
    </div>
  );
};

export default HelpPageIntro;
