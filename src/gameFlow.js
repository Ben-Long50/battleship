/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';

export const gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,

  startGame() {},

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
