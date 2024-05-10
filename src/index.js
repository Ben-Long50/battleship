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
