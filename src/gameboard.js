import Ship from './ship';

export default class Gameboard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }),
    );
    this.shipList = [];
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
        if (this.grid[row][column + i] !== undefined) {
          return 'You are trying to place the ship on an occupied coordinate';
        }
      }
      if (row + length >= this.rows) {
        return 'You are trying to place the ship out of bounds';
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][column + i] = 'X';
        ship.coordinates.push([row, column + i]);
      }
    } else if (this.horizontal === false) {
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row + i][column] !== undefined) {
          return 'You are trying to place the ship on an occupied coordinate';
        }
      }
      if (column + length >= this.columns) {
        return 'You are trying to place the ship out of bounds';
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][column] = 'X';
        ship.coordinates.push([row + i, column]);
      }
    }
    this.shipList.push(ship);
  }

  receiveAttack(row, column) {
    this.grid[row][column] === 'X'
      ? (this.grid[row][column] = 'hit')
      : (this.grid[row][column] = 'miss');
    this.shipList.forEach((ship) => {
      for (const coord of ship.coordinates) {
        if (coord[0] === row && coord[1] === column) {
          ship.hit();
        }
      }
      if (ship.hits === ship.length) {
        ship.isSunk();
      }
    });
  }

  checkFleet() {
    shipsSunk = this.shipList.map((ship) => ship.sunk);
    if (shipsSunk.includes(false)) {
      return;
    }
    return 'Game over! Your fleet has been sunk';
  }
}
