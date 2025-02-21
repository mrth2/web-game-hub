import { Card, Foundation, Stock, Tableau, Waste } from "./card";

export type Game = {
  tableau: Tableau;
  foundation: Foundation;
  waste: Waste;
  stock: Stock;
};
export type Move = {
  from: "tableau" | "waste" | "stock";
  to: "tableau" | "foundation" | "waste" | "stock";
  card: Card;
};
export type GameState = "playing" | "won" | "lost";
