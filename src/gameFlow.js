/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';
import { Human, Computer } from './player';

export const gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,

  loadGame() {
    domElements.startDialog.showModal();
  },

  initPvpMode() {
    domElements.startDialog.close();
    domElements.pvpDialog.showModal();
    domElements.pvpStartButton.addEventListener('click', () => {
      this.activePlayer = new Human(domElements.player1Name.value);
      this.activeGameboard = domElements.gameboardOne;
      this.inactivePlayer = new Human(domElements.player2Name.value);
      this.inactiveGameboard = domElements.gameboardTwo;
      domElements.pvpDialog.close();
      domElements.renderGameboard(this.activePlayer, this.activeGameboard);
      domElements.renderGameboard(this.inactivePlayer, this.inactiveGameboard);
      domElements.renderShips(domElements.player1Ships);
    });
  },

  initPvcMode() {
    domElements.startDialog.close();
    domElements.pvcDialog.showModal();
    domElements.pvcStartButton.addEventListener('click', () => {
      this.activePlayer = new Human(domElements.player1Name.value);
      this.activeGameboard = domElements.gameboardOne;
      this.inactivePlayer = new Computer();
      this.inactiveGameboard = domElements.gameboardTwo;
      domElements.pvcDialog.close();
      domElements.renderGameboard(this.activePlayer, this.activeGameboard);
      domElements.renderGameboard(this.inactivePlayer, this.inactiveGameboard);
    });
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
    domElements.renderOpponent(this.inactivePlayer, this.inactiveGameboard);
    domElements.activateCoords(this.inactivePlayer, this.inactiveGameboard);
    domElements.renderGameboard(this.activePlayer, this.activeGameboard);
    domElements.toggleTurnButton();
  },

  switchScreen() {
    domElements.renderBlankBoard(this.activeGameboard);
    domElements.renderBlankBoard(this.inactiveGameboard);
    domElements.toggleTurnButton(this.inactivePlayer.name);
  },

  endGame() {
    domElements.turnButton.textContent = 'Start a New Game';
    domElements.turnButton.classList.add('new-game-button');
    return `Game Over! ${this.activePlayer.name} has successfully sunk all of ${this.inactivePlayer.name}'s ships`;
  },
};
