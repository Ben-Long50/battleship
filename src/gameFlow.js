/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';
import { eventListeners } from './eventListeners';
import { Human } from './player';

export const gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,

  loadGame() {
    domElements.clearText(domElements.message, domElements.messageTimers);
    domElements.clearText(domElements.alert, domElements.alertTimers);
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
    const { inactivePlayer } = this;
    const { inactiveGameboard } = this;

    this.activePlayer = inactivePlayer;
    this.activeGameboard = inactiveGameboard;
    this.inactivePlayer = activePlayer;
    this.inactiveGameboard = activeGameboard;
  },

  displayBoards() {
    if (this.activePlayer.name === 'Computer') {
      const player = this.inactivePlayer;
      const row = Math.floor(Math.random() * 10);
      const column = Math.floor(Math.random() * 10);
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

  endGame() {
    domElements.clearText(domElements.alert);
    domElements.turnButton.classList.remove('switch-button');
    domElements.turnButton.classList.remove('begin-button');
    domElements.turnButton.classList.add('new-game-button');
    domElements.turnButton.textContent = 'Start a New Game';
    return `Game Over! ${this.activePlayer.name} has successfully sunk all of ${this.inactivePlayer.name}'s ships`;
  },
};
