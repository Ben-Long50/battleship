import './styles/main.css';
import './styles/reset-css.css';
import { Human, Computer } from './player';
import { domElements } from './renderDom';
import { gameFlow } from './gameFlow';

const player1 = new Human('Ben');
const player2 = new Human('Zach');

domElements.turnButton.addEventListener('click', (e) => {
  if (e.target.classList.length === 0) {
    gameFlow.switchScreen();
  } else if (e.target.classList.contains('begin-button')) {
    gameFlow.switchActive();
    gameFlow.displayBoards();
  } else if (e.target.classList.contains('new-game-button')) {
    gameFlow.startGame();
  }
});

player1.gameboard.placeShip(2, 2, 3);
player1.gameboard.placeShip(3, 3, 3);
player1.gameboard.placeShip(5, 0, 1);
player1.gameboard.toggleOrientation();
player1.gameboard.placeShip(3, 7, 2);
player1.gameboard.placeShip(4, 4, 5);

domElements.renderGameboard(player1, domElements.gameboardOne);

player2.gameboard.placeShip(2, 9, 8);
// player2.gameboard.placeShip(3, 3, 6);
// player2.gameboard.placeShip(5, 0, 1);
// player2.gameboard.toggleOrientation();
// player2.gameboard.placeShip(3, 7, 2);
// player2.gameboard.placeShip(4, 6, 3);
domElements.renderGameboard(player2, domElements.gameboardTwo);

gameFlow.activePlayer = player1;
gameFlow.activeGameboard = domElements.gameboardOne;
gameFlow.inactivePlayer = player2;
gameFlow.inactiveGameboard = domElements.gameboardTwo;

gameFlow.displayActiveBoard();
// gameFlow.switchActive();
// gameFlow.displayActiveBoard();
