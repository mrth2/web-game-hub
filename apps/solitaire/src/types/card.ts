export type TCardType = "hearts" | "diamonds" | "clubs" | "spades";
export type TCard = {
  type: TCardType;
  color: "red" | "black";
  value: number; // 1 - 13, 1 is Ace, 11 is Jack, 12 is Queen, 13 is King
  revealed: boolean; // true if the card is facing up
};
export type Deck = TCard[];
export type Tableau = TCard[][];
export type Foundation = TCard[];
export type Waste = TCard[];
export type Stock = TCard[];