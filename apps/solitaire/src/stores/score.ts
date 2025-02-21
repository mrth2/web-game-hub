import { action, makeObservable, observable } from "mobx";

class Score {
  currentScore: number = 0;

  constructor() {
    makeObservable(this, {
      currentScore: observable,
      increaseScore: action,
    });
  }

  increaseScore() {
    this.currentScore++;
  }
}

export default Score;
