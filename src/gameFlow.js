/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';
import { eventListeners } from './eventListeners';
import { Human } from './player';

export const gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  activeList: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,
  inactiveList: undefined,

  loadGame() {
    domElements.clearText(domElements.player1Sunk);
    domElements.clearText(domElements.player2Sunk);
    domElements.clearText(domElements.message);
    domElements.clearText(domElements.alert);
    domElements.startDialog.showModal();
  },

  initPvpMode() {
    domElements.startDialog.close();
    domElements.pvpDialog.showModal();
  },

  initPvcMode() {
    domElements.startDialog.close();
    domElements.pvcDialog.showModal();
  },

  async pvpShipPlacement() {
    const shipLengths = [5, 4, 3, 3, 2];
    const shipNames = [
      'Carrier',
      'Battleship',
      'Cruiser',
      'Submarine',
      'Destroyer',
    ];
    const alert = "Use the middle mouse wheel to change the ship's orientation";
    domElements.animateText(alert, domElements.alert);
    for (let i = 0; i < shipNames.length; i++) {
      domElements.clearText(domElements.message);
      const message = `${this.activePlayer.name}, place your ${shipNames[i].toLowerCase()} on the board`;
      domElements.animateText(message, domElements.message);
      const result = await eventListeners.activatePlacement(
        this.activePlayer,
        this.activeGameboard,
        shipNames[i],
        shipLengths[i],
      );

      if (result === false) {
        i--;
      }
    }
    setTimeout(() => {
      domElements.clearText(domElements.alert);
    }, 2000);
    setTimeout(() => {
      domElements.animateText(alert, domElements.alert);
    }, 2000);
    domElements.renderBlankBoard(this.activeGameboard);
    for (let i = 0; i < shipLengths.length; i++) {
      domElements.clearText(domElements.message);
      const message = `${this.inactivePlayer.name}, place your ${shipNames[i].toLowerCase()} on the board`;
      domElements.animateText(message, domElements.message);
      const result = await eventListeners.activatePlacement(
        this.inactivePlayer,
        this.inactiveGameboard,
        shipNames[i],
        shipLengths[i],
      );
      if (result === false) {
        i--;
      }
    }
    domElements.renderBlankBoard(this.inactiveGameboard);
    domElements.clearText(domElements.message);
    domElements.animateText(
      'Press the button below to begin the game',
      domElements.message,
    );
    domElements.renderTurnButton(undefined, 'Begin Game');
  },

  async pvcShipPlacement() {
    const shipLengths = [5, 4, 3, 3, 2];
    const shipNames = [
      'Carrier',
      'Battleship',
      'Cruiser',
      'Submarine',
      'Destroyer',
    ];
    const alert = "Use the middle mouse wheel to change the ship's orientation";
    domElements.animateText(alert, domElements.alert);
    for (let i = 0; i < shipNames.length; i++) {
      domElements.clearText(domElements.message);
      const message = `${this.activePlayer.name}, place your ${shipNames[i].toLowerCase()} on the board`;
      domElements.animateText(message, domElements.message);
      const result = await eventListeners.activatePlacement(
        this.activePlayer,
        this.activeGameboard,
        shipNames[i],
        shipLengths[i],
      );

      if (result === false) {
        i--;
      }
    }
    domElements.clearText(domElements.message);
    const message = `${this.inactivePlayer.name} has finished placing it's ships`;
    domElements.animateText(message, domElements.message);
    for (let i = 0; i < shipLengths.length; i++) {
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
      const orientation = Math.floor(Math.random() * 10) % 2;
      if (orientation === 0) {
        this.inactivePlayer.gameboard.horizontal = true;
      } else {
        this.inactivePlayer.gameboard.horizontal = false;
      }
      const result = this.inactivePlayer.gameboard.placeShip(
        shipNames[i],
        shipLengths[i],
        row,
        column,
      );

      if (result != ` ${shipNames[i]} placed`) {
        i--;
      }
    }
    domElements.renderBlankBoard(this.inactiveGameboard);
    setTimeout(() => {
      domElements.clearText(domElements.alert);
      domElements.animateText(
        'Press the button below to begin the game',
        domElements.alert,
      );
      domElements.renderTurnButton(undefined, 'Begin Game');
    }, 1000);
  },

  switchActive() {
    const { activePlayer } = this;
    const { activeGameboard } = this;
    const { activeList } = this;
    const { inactivePlayer } = this;
    const { inactiveGameboard } = this;
    const { inactiveList } = this;

    this.activePlayer = inactivePlayer;
    this.activeGameboard = inactiveGameboard;
    this.activeList = inactiveList;
    this.inactivePlayer = activePlayer;
    this.inactiveGameboard = activeGameboard;
    this.inactiveList = activeList;
  },

  displayBoards() {
    if (this.activePlayer.name === 'Computer') {
      this.computerAttack(this.inactivePlayer, this.inactiveGameboard);
    } else {
      domElements.renderOpponent(this.inactivePlayer, this.inactiveGameboard);
      eventListeners.activateCoords(
        this.inactivePlayer,
        this.inactiveGameboard,
      );
      domElements.renderGameboard(this.activePlayer, this.activeGameboard);
    }
  },

  switchScreen() {
    if (
      this.activePlayer.name != 'Computer' &&
      this.inactivePlayer.name != 'Computer'
    ) {
      domElements.renderBlankBoard(this.activeGameboard);
      domElements.renderBlankBoard(this.inactiveGameboard);
    }
    domElements.clearText(domElements.message);
    domElements.clearText(domElements.alert);
    domElements.animateText(
      `${this.activePlayer.name}'s turn`,
      domElements.message,
    );
  },

  computerCoordChoice() {
    const boardCoords = Array.from(
      this.inactiveGameboard.querySelectorAll('.coordinate'),
    );
    const sunkCoords = [];
    this.inactivePlayer.gameboard.sunkShips.forEach((ship) => {
      for (let i = 0; i < ship.length; i++) {
        const coord = ship.coordinates[i].reduce((acc, curr) =>
          acc.toString().concat(curr.toString()),
        );
        sunkCoords.push(parseInt(coord));
      }
    });
    const remainingShipCoords = [];
    this.inactivePlayer.gameboard.shipList.forEach((ship) => {
      for (let i = 0; i < ship.length; i++) {
        const coord = ship.coordinates[i].reduce((acc, curr) =>
          acc.toString().concat(curr.toString()),
        );
        remainingShipCoords.push(parseInt(coord));
      }
    });
    const adjacentToHit = boardCoords.map((element, index) => {
      if (sunkCoords.includes(index) && !remainingShipCoords.includes(index)) {
        return undefined;
      }
      if (element.classList.contains('hit')) {
        return [index - 10, index + 1, index + 10, index - 1];
      }
    });
    const viableOptions = adjacentToHit.map((element) => {
      const options = [];
      if (element !== undefined) {
        for (let i = 0; i < element.length; i++) {
          if (
            element[i] >= 0 &&
            element[i] <= 99 &&
            !boardCoords[element[i]].classList.contains('hit') &&
            !boardCoords[element[i]].classList.contains('miss')
          ) {
            options.push(element[i]);
          }
        }
      }
      return options;
    });
    const optionsArray = viableOptions.reduce(
      (acc, curr) => acc.concat(curr),
      [],
    );
    optionsArray.forEach((option, index) => {
      if (sunkCoords.includes(option)) {
        optionsArray.splice(index, 0);
      }
    });
    const selectedCoord =
      optionsArray[Math.floor(Math.random() * optionsArray.length)];

    if (selectedCoord === 0) {
      return [0, 0];
    }

    const row = selectedCoord
      ? Math.floor(selectedCoord / 10).toString()
      : Math.floor(Math.random() * 10).toString();
    const column = selectedCoord
      ? (selectedCoord % 10).toString()
      : Math.floor(Math.random() * 10).toString();
    const index = parseInt(row + column);

    if (
      !boardCoords[index].classList.contains('hit') &&
      !boardCoords[index].classList.contains('miss')
    ) {
      return [parseInt(row), parseInt(column)];
    }
    return this.computerCoordChoice();
  },

  computerAttack(player) {
    const [row, column] = this.computerCoordChoice();
    let message = player.gameboard.receiveAttack(row, column);
    player.gameboard.checkSunk();
    domElements.clearText(domElements.alert);
    domElements.animateText(message, domElements.alert);
    domElements.renderOpponent(player, this.inactiveGameboard);
    domElements.renderTurnButton('switch-button', 'Switch Turn');
    if (player.gameboard.checkFleet() === true) {
      message = gameFlow.endGame();
      domElements.clearText(domElements.message);
      domElements.animateText(message, domElements.message);
    }
  },

  endGame() {
    domElements.clearText(domElements.alert);
    domElements.turnButton.classList.remove('switch-button');
    domElements.turnButton.classList.remove('begin-button');
    domElements.turnButton.classList.add('new-game-button');
    domElements.turnButton.textContent = 'Start a New Game';
    return `Game Over! ${this.activePlayer.name} has successfully sunk all of ${this.inactivePlayer.name}'s ships`;
  },
};
