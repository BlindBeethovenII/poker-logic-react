import React from 'react';

const HelpPageIntro = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Introduction</h3>
      <p>
        Poker Logic is a logic puzzle along the lines of the fantasic puzzle applications created by Everett Kaser (see
        {' '}
        <a href="https://www.kaser.com/home.html" target="_blank" rel="noreferrer noopener">Everett Kaser Software</a>
        )
      </p>
      <p>I have always wanted to develop such a logic puzzle and this is my first attempt.</p>
      <p>The aim of Poker Logic is to work out the poker hand for each of the four players. When you have correctly done this the play area will turn gold.</p>
      <p>
        These four players are currently just named as 1, 2, 3 and 4 and their hands are ordered.
        Player 1&apos;s hand always beats player 2&apos;s; player 2&apos;s hand always beats player 3&apos;s; and player 3&apos;s hand always beats player 4&apos;s.
      </p>
      <p>The ordering of the player&apos;s hands is hard-coded into each Poker Logic puzzle and so you will need to use this information to solve each puzzle.</p>
      <p>The ordering of the hand types is shown on the right part of the play area.</p>
      <p>Furthermore, no player can have the same type of hand as another player.  For example, if you have worked out that player 1 has a Straight then none of the other players will also have a Straight.</p>
      <h4>Note: This is an early release of Poker Logic, which is fully functional but I recognise that the UI is pretty poor.  Most of the coding work has been in the logic of the puzzle.</h4>
    </div>
  );
};

export default HelpPageIntro;
