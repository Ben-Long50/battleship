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

test.only('place ship', () => {
  const grid = new Gameboard();
  expect(grid.placeShip(2, 8, 7)).toBe('ship placed');
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

test('place ship out of bounds horizontally', () => {
  const grid = new Gameboard();
  expect(grid.placeShip(5, 5, 5)).toBe(
    'You are trying to place the ship out of bounds',
  );
});

test('place ship out of bounds vertically', () => {
  const grid = new Gameboard();
  grid.toggleOrientation();
  expect(grid.placeShip(5, 5, 5)).toBe(
    'You are trying to place the ship out of bounds',
  );
});

test('place ship on an occupied space', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  expect(grid.placeShip(3, 3, 1)).toBe(
    'You are trying to place the ship on an occupied coordinate',
  );
});

test('enemy attack registers hit correctly', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  grid.receiveAttack(3, 2);
  expect(grid.grid[3][2]).toBe('hit');
  expect(grid.shipList[0].hits).toBe(1);
});

test('last hit on a ship sinks it', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  grid.receiveAttack(3, 1);
  grid.receiveAttack(3, 2);
  grid.receiveAttack(3, 3);
  expect(grid.shipList[0].sunk).toBe(true);
});

test('enemy attack registers miss correctly', () => {
  const grid = new Gameboard();
  grid.placeShip(3, 3, 1);
  grid.receiveAttack(4, 2);
  expect(grid.grid[4][2]).toBe('miss');
});
