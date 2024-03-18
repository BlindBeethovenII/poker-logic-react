import React from 'react';

const HelpPageGeneratingPuzzles = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Generating Puzzles</h3>
      <p>There are a number of hard-coded puzzles. These have been selected to include each type of clue is used. You may wish to start by solving these hard-coded puzzles first.</p>
      <p>After that, you can generate a new random puzzle by using the New Random Puzzle button.</p>
      <p>Currently there is no difficulty setting, so some random puzzles are much harder to solve than others.</p>
      <p>
        Note that these random puzzles are really random and not related to a &quot;seed&quot; so I have no way of generating the same puzzle myself.
        If you wish to discuss a particular random puzzle with me (for example, if you think you have found a bug)
        please restart the puzzle, select the Show Solution button, and send me a screenshot (making sure all clues are visible as well).
        I should then be able to code the same puzzle myself locally, and continue the discussion with you.
      </p>
    </div>
  );
};

export default HelpPageGeneratingPuzzles;
