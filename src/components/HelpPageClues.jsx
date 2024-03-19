import React from 'react';

const HelpPageClues = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Clues</h3>
      <p>In order to solve each puzzle you are given a number of clues as to how the cards are placed in the four poker hands.</p>
      <p>These clues are shown in the bottom left of the screen.</p>
      <p>
        As with most Everett Kaser puzzles, the clues are held in two lists.
        The list you see on the screen, and another list that is not seen.
        If you right click on a clue that clue is moved to the list that is not seen.
        This is a way to &apos;hide&apos; the clues that you have already used and that you don&apos;t need to see anymore.
      </p>
      <p>When you have moved one or more clues to the other list, then an Other Clues button appears so you can toggle which list of clues is seen.</p>
      <h4>Note: The clues UI is not perfect.  Sometimes a long clue will overlap with a button; and sometimes the list of clues goes beyond the play area. I intend to improve how clues are shown.</h4>
    </div>
  );
};

export default HelpPageClues;
