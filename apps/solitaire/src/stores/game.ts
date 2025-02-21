import { makeAutoObservable } from "mobx";
import { FoundationStore } from "./foundation";
import { TCard } from "../types/card";
import _cloneDeep from "lodash/cloneDeep";
import _shuffle from "lodash/shuffle";

const CARD_POOL = [
  ...Array.from({ length: 13 }, (_, i) => ({ type: "hearts", value: i + 1 })),
  ...Array.from({ length: 13 }, (_, i) => ({ type: "diamonds", value: i + 1 })),
  ...Array.from({ length: 13 }, (_, i) => ({ type: "clubs", value: i + 1 })),
  ...Array.from({ length: 13 }, (_, i) => ({ type: "spades", value: i + 1 })),
] as Omit<TCard, "color" | "revealed">[];

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
    this.cards = _shuffle(CARD_POOL).map((card) => ({
      ...card,
      color:
        card.type === "hearts" || card.type === "diamonds" ? "red" : "black",
      revealed: false, // by default, all cards are facing down
    }));
    // generate 7 columns, with column #1 having 1 card, column #2 having 2 cards, etc.
    let columnIndex = 0;
    this.tableuColumns = this.cards.slice(0, 28).reduce((acc, card) => {
      if (!acc[columnIndex]) {
        acc[columnIndex] = [];
      }
      acc[columnIndex].push(card);
      if (acc[columnIndex].length - 1 === columnIndex) {
        acc[columnIndex][acc[columnIndex].length - 1].revealed = true; // auto reveal the last card in the column
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
      return true; // successfully moved the card to the foundation
    } catch (e: any) {
      console.error(e.message);
      return false; // can't move the card to the foundation
    }
  }
  // given a card, try to find any column with last card:
  // - having different color
  // - having the value one less than the card
  // if found, move the card to the new column
  autoMoveCardInTableu(card: TCard) {
    const colIndex = this.tableuColumns.findIndex((cards) =>
      cards.some((c) => c.color === card.color && c.value === card.value + 1)
    );
    if (colIndex !== -1) {
      // move the card to the new column
      this.tableuColumns[colIndex].push(card);
      // remove the card from the old column
      const cardIndex = this.tableuColumns.findIndex((cards) =>
        cards.includes(card)
      );
      this.tableuColumns[cardIndex].splice(cardIndex, 1);
      this.incrementMoves();
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
