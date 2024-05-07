import './styles/main.css';
import './styles/reset-css.css';
import { Human, Computer } from './player';
import { domElements } from './renderDom';

const player1 = new Human('Ben');
const player2 = new Computer();

window.addEventListener('load', () => {
  domElements.renderGameboard(player1, domElements.gameboardOne);
  domElements.renderGameboard(player2, domElements.gameboardTwo);
});

player1.gameboard.placeShip(2, 2, 3);
player1.gameboard.placeShip(3, 3, 3);
player1.gameboard.toggleOrientation();
player1.gameboard.placeShip(3, 7, 2);
player1.gameboard.placeShip(4, 6, 5);
player1.gameboard.toggleOrientation();
player1.gameboard.placeShip(5, 0, 1);
domElements.renderGameboard(player1, domElements.gameboardOne);
