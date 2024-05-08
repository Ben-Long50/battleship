/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';

export const gameFlow = {
  activePlayer: undefined,
  activeGameboard: undefined,
  inactivePlayer: undefined,
  inactiveGameboard: undefined,

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

  displayActiveBoard() {
    domElements.renderOpponent(this.inactivePlayer, this.inactiveGameboard);
    domElements.renderGameboard(this.activePlayer, this.activeGameboard);
  },
};
