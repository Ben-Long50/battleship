/* eslint-disable max-classes-per-file */
import Gameboard from './gameboard';

class Player {
  constructor() {
    this.gameboard = new Gameboard();
  }
}

export class Human extends Player {
  constructor(name) {
    super();
    this.name = name;
  }
}
export class Computer extends Player {
  constructor() {
    super();
  }
}
