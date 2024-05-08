import './styles/main.css';
import './styles/reset-css.css';
import { domElements } from './renderDom';
import { gameFlow } from './gameFlow';

gameFlow.loadGame();

domElements.pvpMode.addEventListener('click', () => {
  gameFlow.initPvpMode();
});
domElements.pvcMode.addEventListener('click', () => {
  gameFlow.initPvcMode();
});

domElements.turnButton.addEventListener('click', (e) => {
  if (e.target.classList.length === 0) {
    gameFlow.switchScreen();
  } else if (e.target.classList.contains('begin-button')) {
    gameFlow.switchActive();
    gameFlow.displayBoards();
  } else if (e.target.classList.contains('new-game-button')) {
    gameFlow.loadGame();
  }
});
