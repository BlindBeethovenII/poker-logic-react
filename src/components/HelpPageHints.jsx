import React from 'react';

const HelpPageHints = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Hints</h3>
      <p>If you are stuck then you can use the Get Next Hint button.</p>
      <p>Currently there are 51 different types of hints coded.</p>
      <p>
        The way a hint is shown to the user is pretty basic at the moment.
        The type of hint is shown in white, then there is a list of cards that the hint applies to, indicating if a suit or number can be set or removed from that card.
        Each entry in that list might also indicate a deduction that was made in order to arrive at the hint.
      </p>
      <p>When a hint is showing, you can remove it with the Clear Next Hint button, or you can apply the hint by using the Apply Next Hint button.</p>
      <p>
        Every puzzle can be solved by repeatedly applying the next hint.
        In fact, this is how the clues of the puzzle were determined in the first place.
        Four random poker hands are generated, along with a long list of clues that valid for those poker hands.
        These clues are then whittled down to the fewest number of clues that can still solve the puzzle by using the hint system.
        Even then, sometimes you, as a human, can solve the puzzle without using all the clues. If that happens, you are using deductions not coded into the application.
      </p>
    </div>
  );
};

export default HelpPageHints;