import { action, computed, makeObservable, observable } from "mobx";
import type { TCard, TCardType } from "../types/card";

// foundation is the mobx store, where we will store the cards that are placed in the foundation
// each pile will contains cards from Ace to King, in order
// user must place the Ace first, then 2, 3, 4, 5, 6, 7, 8, 9, 10, Jack, Queen, and King
// once all cards are placed in the foundation, the game is won
export class FoundationStore {
  // card here is a stack, which mean whatever we add in, will push to the bottom of the stack, then we can also only remove the last
  type: TCardType;
  cards: TCard[] = [];

  constructor(type: TCardType) {
    makeObservable(this, {
      cards: observable,
      topCard: computed,
      placeCard: action,
      pickTopCard: action,
      clear: action,
    });
    this.type = type;
    this.cards = [];
  }

  get topCard() {
    return this.cards?.[this.cards.length - 1] ?? null;
  }

  placeCard(card: TCard) {
    if (card.type !== this.type) {
      throw new Error(`[${this.type}] Invalid card type: ${card.type}`);
    }
    if (
      this.topCard &&
      this.topCard.value !== 13 &&
      this.topCard.value + 1 !== card.value
    ) {
      throw new Error(`[${this.type}] Invalid card value: ${card.value}`);
    }
    if (!this.topCard && card.value !== 1) {
      throw new Error(`[${this.type}] Invalid card value: ${card.value}`);
    }
    this.cards.push(card);
  }

  pickTopCard() {
    return this.cards.pop();
  }

  clear() {
    this.cards = [];
  }
}
