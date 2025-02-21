import { action, computed, makeObservable, observable } from "mobx";
import { FoundationStore } from "./foundation";

export class GameStore {
  score: number = 0;
  moves: number = 0;
  isGameWon: boolean = false;

  // there are four foundation piles, one for each suit, Hearts, Diamonds, Clubs, and Spades
  heartFoundation: FoundationStore;
  diamondFoundation: FoundationStore;
  clubFoundation: FoundationStore;
  spadeFoundation: FoundationStore;

  constructor() {
    makeObservable(this, {
      score: observable,
      moves: observable,
      isGameWon: observable,
      heartFoundation: observable,
      diamondFoundation: observable,
      clubFoundation: observable,
      spadeFoundation: observable,
      initNewGame: action,
      undoLastMove: action,
      addScore: action,
      removeScore: action,
      incrementMoves: action,
      decrementMoves: action,
      hearts: computed,
    });

    this.heartFoundation = new FoundationStore("hearts");
    this.diamondFoundation = new FoundationStore("diamonds");
    this.clubFoundation = new FoundationStore("clubs");
    this.spadeFoundation = new FoundationStore("spades");
  }

  get hearts() {
    return this.heartFoundation.cards;
  }

  // game actions
  initNewGame() {
    this.score = 0;
    this.moves = 0;
    this.isGameWon = false;

    this.heartFoundation.clear();
    this.diamondFoundation.clear();
    this.clubFoundation.clear();
    this.spadeFoundation.clear();
  }
  undoLastMove() {
    // undo the last move
    // TODO: implement this with a history list
    this.decrementMoves();
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
