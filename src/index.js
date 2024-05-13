import './styles/main.css';
import './styles/reset-css.css';
import { domElements } from './renderDom';
import { gameFlow } from './gameFlow';
import { Human, Computer } from './player';

gameFlow.loadGame();

domElements.pvpMode.addEventListener('click', () => {
  gameFlow.initPvpMode();
});
domElements.pvcMode.addEventListener('click', () => {
  gameFlow.initPvcMode();
});

domElements.pvpStartButton.addEventListener('click', () => {
  gameFlow.activePlayer = new Human(domElements.player1Name.value);
  gameFlow.activeGameboard = domElements.gameboardOne;
  gameFlow.activeList = domElements.player1Sunk;
  gameFlow.inactivePlayer = new Human(domElements.player2Name.value);
  gameFlow.inactiveGameboard = domElements.gameboardTwo;
  gameFlow.inactiveList = domElements.player2Sunk;
  domElements.pvpDialog.close();
  domElements.renderTitles();
  domElements.renderGameboard(gameFlow.activePlayer, gameFlow.activeGameboard);
  domElements.renderGameboard(
    gameFlow.inactivePlayer,
    gameFlow.inactiveGameboard,
  );
  gameFlow.pvpShipPlacement();
});

domElements.pvcStartButton.addEventListener('click', () => {
  gameFlow.activePlayer = new Human(domElements.playerName.value);
  gameFlow.activeGameboard = domElements.gameboardOne;
  gameFlow.activeList = domElements.player1Sunk;
  gameFlow.inactivePlayer = new Computer();
  gameFlow.inactiveGameboard = domElements.gameboardTwo;
  gameFlow.inactiveList = domElements.player2Sunk;
  domElements.pvcDialog.close();
  domElements.renderTitles();
  domElements.renderGameboard(gameFlow.activePlayer, gameFlow.activeGameboard);
  domElements.renderGameboard(
    gameFlow.inactivePlayer,
    gameFlow.inactiveGameboard,
  );
  gameFlow.pvcShipPlacement();
});
