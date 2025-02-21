export type CardType = "hearts" | "diamonds" | "clubs" | "spades";
export type Card = {
  type: CardType;
  value: number; // 1 - 13, 1 is Ace, 11 is Jack, 12 is Queen, 13 is King
};
export type Deck = Card[];
export type Tableau = Card[][];
export type Foundation = Card[];
export type Waste = Card[];
export type Stock = Card[];