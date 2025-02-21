import { makeAutoObservable } from "mobx";
import { FoundationStore } from "./foundation";
import { TCard } from "../types/card";
import _cloneDeep from "lodash/cloneDeep";
import _shuffle from "lodash/shuffle";

const CARD_POOL: TCard[] = [
  ...Array.from({ length: 13 }, (_, i) => ({ type: "hearts", value: i + 1 })),
  ...Array.from({ length: 13 }, (_, i) => ({ type: "diamonds", value: i + 1 })),
  ...Array.from({ length: 13 }, (_, i) => ({ type: "clubs", value: i + 1 })),
  ...Array.from({ length: 13 }, (_, i) => ({ type: "spades", value: i + 1 })),
] as TCard[];

const POINTS = {
  FOUNDATION: 15, // each time move a card to the foundation, get 15 points
  REVEAL: 5, // each time open a card in the tableau, get 5 points
};

export class GameStore {
  timer: number = 0;
  score: number = 0;
  moves: number = 0;
  isGameWon: boolean = false;

  // there are four foundation piles, one for each suit, Hearts, Diamonds, Clubs, and Spades
  heartFoundation: FoundationStore;
  diamondFoundation: FoundationStore;
  clubFoundation: FoundationStore;
  spadeFoundation: FoundationStore;

  // all the cards of the game
  cards: TCard[] = [];
  // init cards for 7 colums, with column #1 having 1 card, column #2 having 2 cards, etc.
  tableuColumns: TCard[][] = [];

  constructor() {
    makeAutoObservable(this);

    this.heartFoundation = new FoundationStore("hearts");
    this.diamondFoundation = new FoundationStore("diamonds");
    this.clubFoundation = new FoundationStore("clubs");
    this.spadeFoundation = new FoundationStore("spades");

    this.shuffleCards();
    this.startTimer();
  }

  get cardsInPlay() {
    return this.tableuColumns.flat();
  }

  get cardInStock() {
    return this.cards.find((card) => {
      return (
        !this.heartFoundation.cards.includes(card) &&
        !this.diamondFoundation.cards.includes(card) &&
        !this.clubFoundation.cards.includes(card) &&
        !this.spadeFoundation.cards.includes(card) &&
        !this.cardsInPlay.includes(card)
      );
    });
  }

  // game actions
  initNewGame() {
    this.timer = 0;
    this.score = 0;
    this.moves = 0;
    this.isGameWon = false;

    this.heartFoundation.clear();
    this.diamondFoundation.clear();
    this.clubFoundation.clear();
    this.spadeFoundation.clear();

    this.shuffleCards();

    this.startTimer();
  }
  startTimer() {
    setInterval(() => {
      this.timer++;
    }, 1000);
  }
  shuffleCards() {
    this.cards = _shuffle(CARD_POOL);
    // generate 7 columns, with column #1 having 1 card, column #2 having 2 cards, etc.
    let columnIndex = 0;
    this.tableuColumns = this.cards.slice(0, 28).reduce((acc, card) => {
      if (!acc[columnIndex]) {
        acc[columnIndex] = [];
      }
      acc[columnIndex].push(card);
      if (acc[columnIndex].length - 1 === columnIndex) {
        columnIndex++;
      }
      return acc;
    }, [] as TCard[][]);
  }
  undoLastMove() {
    // undo the last move
    // TODO: implement this with a history list
    this.decrementMoves();
  }
  moveCardToFoundation(card: TCard) {
    try {
      switch (card.type) {
        case "hearts":
          this.heartFoundation.placeCard(card);
          break;
        case "diamonds":
          this.diamondFoundation.placeCard(card);
          break;
        case "clubs":
          this.clubFoundation.placeCard(card);
          break;
        case "spades":
          this.spadeFoundation.placeCard(card);
          break;
      }
      // move card from the column in tableu to the foundation
      const colIndex = this.tableuColumns.findIndex((col) =>
        col.includes(card)
      );
      const cardIndex = this.tableuColumns[colIndex].findIndex(
        (c) => c === card
      );
      this.tableuColumns[colIndex].splice(cardIndex, 1);
      this.incrementMoves();
      this.addScore(POINTS.FOUNDATION);
    } catch (e: any) {
      console.error(e.message);
    }
  }

  // manipulate the scores
  addScore(points: number) {
    this.score += points;
  }
  removeScore(points: number) {
    this.score -= points;
  }

  // manipulate the moves
  incrementMoves() {
    this.moves++;
  }
  decrementMoves() {
    this.moves--;
  }
}
