import React from 'react';

const HelpPageClueTypes = () => {
  const centerstyle = {
    textAlign: 'center',
  };

  return (
    <div>
      <h3 style={centerstyle}>Clue Types</h3>
      <p>There are 32 different types of clues.</p>
      <p>Some are very simple and can be used immediately without deductions.</p>
      <p>For example: the clue &quot;Hand 4 Card 1 is the Q Spade&quot; means that you can immediately set the first card in hand 4 to be the Queen of Spades.</p>
      <p>Whereas other clues need more thought and might not be immediately usable.</p>
      <p>For example: the clue &quot;Hand 1 has the 5 Club&quot; does not say where in Hand 1 the 5 of Clubs appears.  But, note that you can deduce that Hands 2, 3 and 4 do not have that card!</p>
      <p>A hard part of the puzzle comes when you need to combine multiple clues, sometimes combining three or more clues.</p>
      <p>
        For example: the clue &quot;Hand 1 Card 1 has the same number as Hand 2 Card 2&quot;
        combined with the clue &quot;Hand 1 Card 1 has the same number as Hand 3 Card 3&quot;
        means that you need three available cards of the same number.
        You can use this deduction to reduce the numbers that remain possible for each of the three cards mentioned.
      </p>
      <p>
        Some of the clues use the number value assigned to a card.
        For example, &quot;Hand 1 has all even numbers&quot;.
        For these types of clues, an Ace is taken as 14 (hence even), a King 13 (hence odd), a Queen 12 (also even) and a Jack as 11 (also odd).
        All other cards are assigned their face value.
      </p>
    </div>
  );
};

export default HelpPageClueTypes;
