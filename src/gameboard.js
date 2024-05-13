/* eslint-disable no-unused-expressions */
import Ship from './ship';
import { gameFlow } from './gameFlow';
import { domElements } from './renderDom';

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

  placeShip(name, length, row, column) {
    const ship = new Ship(name, length);
    if (this.horizontal === true) {
      if (column + length > this.columns) {
        return ' You cannot place the ship out of bounds';
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row][column + i] !== undefined) {
          return ' You cannot place the ship on an occupied coordinate';
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[row][column + i] = this.token;
        ship.coordinates.push([row, column + i]);
      }
    } else if (this.horizontal === false) {
      if (row + length > this.rows) {
        return ' You cannot place the ship out of bounds';
      }
      for (let i = 0; i < ship.length; i++) {
        if (this.grid[row + i][column] !== undefined) {
          return ' You cannot place the ship on an occupied coordinate';
        }
      }
      for (let i = 0; i < ship.length; i++) {
        this.grid[row + i][column] = this.token;
        ship.coordinates.push([row + i, column]);
      }
    }
    this.shipList.push(ship);
    return ` ${ship.name} placed`;
  }

  receiveAttack(row, column) {
    let message = `${gameFlow.activePlayer.name} missed`;
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
        message = ` ${gameFlow.activePlayer.name} sunk the ${ship.name}`;
      }
    });
    return message;
  }

  checkSunk() {
    this.shipList.forEach((ship, index) => {
      if (ship.sunk === true) {
        const sunkShip = this.shipList.splice(index, 1);
        console.log(sunkShip);
        domElements.renderSunkShip(
          gameFlow.activeList,
          sunkShip[0].name,
          sunkShip[0].length,
        );
        this.sunkShips.push(sunkShip);
      }
    });
  }

  checkFleet() {
    if (this.shipList.length === 0) {
      return true;
    }
  }
}
