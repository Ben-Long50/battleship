import Ship from '../ship';
import Gameboard from '../gameboard';

test('first and last gameboard space exist', () => {
  const grid = new Gameboard();
  expect(grid.grid[0][0]).toBe(undefined);
  expect(grid.grid[9][9]).toBe(undefined);
});

test('place ship on gameboard horizontally', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  expect(grid.grid[3][0]).toBe(undefined);
  expect(grid.grid[3][1]).toBe('X');
  expect(grid.grid[3][2]).toBe('X');
  expect(grid.grid[3][3]).toBe('X');
  expect(grid.grid[3][4]).toBe(undefined);
});

test('place ship on gameboard vertically', () => {
  const grid = new Gameboard();
  grid.toggleOrientation();
  grid.placeShip(3, 3, 1);
  expect(grid.grid[2][1]).toBe(undefined);
  expect(grid.grid[3][1]).toBe('X');
  expect(grid.grid[4][1]).toBe('X');
  expect(grid.grid[5][1]).toBe('X');
  expect(grid.grid[6][1]).toBe(undefined);
});

test('enemy attack registers hit correctly', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  expect(grid.receiveAttack(3, 2)).toBe('hit');
  expect(grid.grid[3][2]).toBe('hit');
});

test('enemy attack registers miss correctly', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  expect(grid.receiveAttack(4, 2)).toBe('miss');
  expect(grid.grid[4][2]).toBe('miss');
});
