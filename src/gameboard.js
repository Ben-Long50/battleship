/* eslint-disable no-unused-expressions */
import Ship from './ship';
import { gameFlow } from './gameFlow';

export default class Gameboard {
  constructor() {
    this.rows = 10;
    this.columns = 10;
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }),
    );
    this.shipList = [];
    this.sunkShips = [];
    this.token = 'O';
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
      if (column + length > this.columns) {
        return 'You are trying to place the ship out of bounds';
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][column + i] = this.token;
        ship.coordinates.push([row, column + i]);
      }
    } else if (this.horizontal === false) {
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row + i][column] !== undefined) {
          return 'You are trying to place the ship on an occupied coordinate';
        }
      }
      if (row + length > this.rows) {
        return 'You are trying to place the ship out of bounds';
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][column] = this.token;
        ship.coordinates.push([row + i, column]);
      }
    }
    this.shipList.push(ship);
    return 'ship placed';
  }

  receiveAttack(row, column) {
    let message = 'You missed';
    this.grid[row][column] === this.token
      ? (this.grid[row][column] = 'hit')
      : (this.grid[row][column] = 'miss');
    this.shipList.forEach((ship) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const coord of ship.coordinates) {
        if (coord[0] === row && coord[1] === column) {
          ship.hit();
          message = `${gameFlow.activePlayer.name} got a hit`;
        }
      }
      if (ship.hits === ship.length) {
        ship.isSunk();
        message = 'You sunk a ship';
      }
    });
    return message;
  }

  checkSunk() {
    this.shipList.forEach((ship, index) => {
      if (ship.sunk === true) {
        const sunkShip = this.shipList.splice(index, 1);
        this.sunkShips.push(sunkShip);
      }
    });
  }

  checkFleet() {}
}
