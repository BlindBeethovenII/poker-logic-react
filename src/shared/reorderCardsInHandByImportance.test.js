import { reorderCardsInHandByImportance, createCard } from './card-functions';

import {
  SUIT_SPADES,
  SUIT_HEARTS,
  SUIT_DIAMONDS,
  SUIT_CLUBS,
  NUMBER_6,
  NUMBER_5,
  NUMBER_4,
  NUMBER_3,
  NUMBER_2,
  NUMBER_A,
  NUMBER_J,
  NUMBER_9,
  NUMBER_10,
  NUMBER_Q,
} from './constants';

describe('reorderCardsInHandByImportance', () => {
  it('will not change a straight flush that is not A5432', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_6),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will change a straight flush A5432 to 5432A', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_A),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_SPADES, NUMBER_A),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will change a four of a kind where the single card is higher to put that card last', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_A),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_A),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will not change a four of a kind where the single card is lower', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will change a full house if the pair is higher than the three of a kind', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_HEARTS, NUMBER_4),
      createCard(SUIT_DIAMONDS, NUMBER_4),
      createCard(SUIT_CLUBS, NUMBER_4),
    ];

    const result = [
      createCard(SUIT_HEARTS, NUMBER_4),
      createCard(SUIT_DIAMONDS, NUMBER_4),
      createCard(SUIT_CLUBS, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_HEARTS, NUMBER_5),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will not change a full house if the pair is lower than the three of a kind', () => {
    const hand = [
      createCard(SUIT_HEARTS, NUMBER_4),
      createCard(SUIT_DIAMONDS, NUMBER_4),
      createCard(SUIT_CLUBS, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_3),
      createCard(SUIT_HEARTS, NUMBER_3),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will not change a flush', () => {
    const hand = [
      createCard(SUIT_HEARTS, NUMBER_J),
      createCard(SUIT_HEARTS, NUMBER_9),
      createCard(SUIT_HEARTS, NUMBER_4),
      createCard(SUIT_HEARTS, NUMBER_3),
      createCard(SUIT_HEARTS, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will not change a straight that is not A5432', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_6),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
      createCard(SUIT_CLUBS, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will change a straight A5432 to 5432A', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_A),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
      createCard(SUIT_CLUBS, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    const result = [
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
      createCard(SUIT_CLUBS, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_SPADES, NUMBER_A),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will not change three of a kind if the three of the kind is the highest number', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_6),
      createCard(SUIT_DIAMONDS, NUMBER_6),
      createCard(SUIT_CLUBS, NUMBER_6),
      createCard(SUIT_CLUBS, NUMBER_3),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will change a three of a kind is the three of a kind is the middle three numbers', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will change a three of a kind is the three of a kind is the last three numbers', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_9),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will not change two pair if the two pair are the first four cards', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_6),
      createCard(SUIT_DIAMONDS, NUMBER_6),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will change a two pair if the first two cards and the last two cards are the two pairs', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_J),
      createCard(SUIT_CLUBS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_HEARTS, NUMBER_2),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_2),
      createCard(SUIT_HEARTS, NUMBER_2),
      createCard(SUIT_CLUBS, NUMBER_5),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will change two pair if the first card is the single', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_5),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_J),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will not change a pair if the pair are the first two cards', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_6),
      createCard(SUIT_DIAMONDS, NUMBER_6),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });

  it('will change the pair if pair is the second and third cards', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_5),
      createCard(SUIT_SPADES, NUMBER_4),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will change the pair if pair is the third and fourth cards', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_10),
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_4),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_10),
      createCard(SUIT_SPADES, NUMBER_4),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will change the pair if pair is the last two cards', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_10),
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
    ];

    const result = [
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_CLUBS, NUMBER_9),
      createCard(SUIT_SPADES, NUMBER_Q),
      createCard(SUIT_SPADES, NUMBER_J),
      createCard(SUIT_DIAMONDS, NUMBER_10),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(result);
  });

  it('will not change a high card', () => {
    const hand = [
      createCard(SUIT_SPADES, NUMBER_9),
      createCard(SUIT_DIAMONDS, NUMBER_6),
      createCard(SUIT_HEARTS, NUMBER_5),
      createCard(SUIT_CLUBS, NUMBER_4),
      createCard(SUIT_SPADES, NUMBER_2),
    ];

    expect(reorderCardsInHandByImportance(hand)).toEqual(hand);
  });
});
