import React from 'react';

const HelpPageCardsAvailable = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Cards Available</h3>
      <p>As each poker hand consists of 5 cards and as there are 4 players, there are 20 available playing cards in each Poker Logic puzzle.</p>
      <p>These 20 cards are shown in the top right of the play area.</p>
      <p>As each card in placed into a player&apos;s hand, it is removed from this list of available cards.</p>
      <p>An important part of the puzzle is deducing the type of poker hands each player can have, based on the remaining cards available.</p>
      <p>Here is a simple example of this sort of deduction: if the available cards do not include 4 cards of the same number, then clearly no player can have a Four of a Kind type of poker hand.</p>
      <p>Making this example a little more complicated: if there is no Four of a Kind, and a clue says that Hand 2 has a Full House, then you can deduce that Hand 1 is a Straight Flush. </p>
      <p>If you didn&apos;t get that deduction immediately, then you should reconsider the previous help page that explains the ordering of the hands.</p>
    </div>
  );
};

export default HelpPageCardsAvailable;
