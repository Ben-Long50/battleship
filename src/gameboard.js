import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }),
    );
    this.horizontal = true;
  }

  toggleOrientation() {
    this.horizontal === true
      ? (this.horizontal = false)
      : (this.horizontal = true);
  }

  placeShip(length, row, column) {
    const ship = new Ship(length);
    if (this.horizontal === true) {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][column + i] = 'X';
      }
    } else if (this.horizontal === false) {
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][column] = 'X';
      }
    }
  }

  receiveAttack(row, column) {
    this.grid[row][column] === 'X'
      ? (this.grid[row][column] = 'hit')
      : (this.grid[row][column] = 'miss');
    return this.grid[row][column];
  }
}
