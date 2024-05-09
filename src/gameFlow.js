/* eslint-disable no-await-in-loop */
/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';
import { eventListeners } from './eventListeners';

export const gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,

  loadGame() {
    domElements.clearText(domElements.message);
    domElements.clearText(domElements.alert);
    domElements.startDialog.showModal();
  },

  initPvpMode() {
    domElements.startDialog.close();
    domElements.pvpDialog.showModal();
    eventListeners.activatePvpStart();
  },

  initPvcMode() {
    domElements.startDialog.close();
    domElements.pvcDialog.showModal();
    eventListeners.activatePvcStart();
  },

  async shipPlacement() {
    const shipLengths = [5, 4];
    const shipNames = [
      'Carrier',
      'Battleship',
      // 'Cruiser',
      // 'Submarine',
      // 'Destroyer',
    ];
    for (let i = 0; i < shipLengths.length; i++) {
      domElements.clearText(domElements.message);
      domElements.animateText(
        `${this.activePlayer.name}, place your ${shipNames[i].toLowerCase()} on the board`,
        domElements.message,
      );
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
    domElements.renderBlankBoard(this.activeGameboard);
    for (let i = 0; i < shipLengths.length; i++) {
      domElements.clearText(domElements.message);
      domElements.animateText(
        `${this.inactivePlayer.name}, place your ${shipNames[i].toLowerCase()} on the board`,
        domElements.message,
      );
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

    domElements.clearText(domElements.alert);
    domElements.clearText(domElements.message);
    domElements.animateText(
      `${this.activePlayer.name}'s turn`,
      domElements.message,
    );
  },

  displayBoards() {
    domElements.renderOpponent(this.inactivePlayer, this.inactiveGameboard);
    eventListeners.activateCoords(this.inactivePlayer, this.inactiveGameboard);
    domElements.renderGameboard(this.activePlayer, this.activeGameboard);
    domElements.toggleTurnButton();
  },

  switchScreen() {
    domElements.renderBlankBoard(this.activeGameboard);
    domElements.renderBlankBoard(this.inactiveGameboard);
    domElements.toggleTurnButton(this.inactivePlayer.name);
  },

  endGame() {
    domElements.alert.textContent = '';
    domElements.turnButton.classList.remove('switch-button');
    domElements.turnButton.classList.remove('begin-button');
    domElements.turnButton.classList.add('new-game-button');
    domElements.turnButton.textContent = 'Start a New Game';
    return `Game Over! ${this.activePlayer.name} has successfully sunk all of ${this.inactivePlayer.name}'s ships`;
  },
};
