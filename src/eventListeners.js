/* eslint-disable import/prefer-default-export */
import { domElements } from './renderDom';
import { Human, Computer } from './player';
import { gameFlow } from './gameFlow';

export const eventListeners = {
  activatePvpStart() {
    domElements.pvpStartButton.addEventListener('click', () => {
      gameFlow.activePlayer = new Human(domElements.player1Name.value);
      gameFlow.activeGameboard = domElements.gameboardOne;
      gameFlow.inactivePlayer = new Human(domElements.player2Name.value);
      gameFlow.inactiveGameboard = domElements.gameboardTwo;
      domElements.pvpDialog.close();
      domElements.renderGameboard(
        gameFlow.activePlayer,
        gameFlow.activeGameboard,
      );
      domElements.renderGameboard(
        gameFlow.inactivePlayer,
        gameFlow.inactiveGameboard,
      );
      gameFlow.shipPlacement();
    });
  },

  activatePvcStart() {
    domElements.pvcStartButton.addEventListener('click', () => {
      gameFlow.activePlayer = new Human(domElements.player1Name.value);
      gameFlow.activeGameboard = domElements.gameboardOne;
      gameFlow.inactivePlayer = new Computer();
      gameFlow.inactiveGameboard = domElements.gameboardTwo;
      domElements.pvcDialog.close();
      domElements.renderGameboard(
        gameFlow.activePlayer,
        gameFlow.activeGameboard,
      );
      domElements.renderGameboard(
        gameFlow.inactivePlayer,
        gameFlow.inactiveGameboard,
      );
      gameFlow.shipPlacement();
    });
  },

  activatePlacement(player, element, name, length) {
    const boardCoords = Array.from(element.querySelectorAll('.coordinate'));
    let index = 0;
    boardCoords.forEach((item) => {
      item.addEventListener('wheel', () => {
        player.gameboard.toggleOrientation();
        boardCoords.forEach((item) =>
          item.style.removeProperty('background-color'),
        );
        if (player.gameboard.horizontal === true) {
          for (let i = 0; i < length; i++) {
            if (boardCoords[index + i]) {
              boardCoords[index + i].style.backgroundColor =
                'rgb(113, 197, 113)';
            }
          }
        } else if (player.gameboard.horizontal === false) {
          for (let i = 0; i < length; i++) {
            if (boardCoords[index + i * 10]) {
              boardCoords[index + i * 10].style.backgroundColor =
                'rgb(113, 197, 113)';
            }
          }
        }
      });
    });

    boardCoords.forEach((item) => {
      item.addEventListener('mouseenter', (e) => {
        index = boardCoords.indexOf(e.target);
        if (player.gameboard.horizontal === true) {
          for (let i = 0; i < length; i++) {
            if (boardCoords[index + i]) {
              boardCoords[index + i].style.backgroundColor =
                'rgb(113, 197, 113)';
            }
          }
        } else if (player.gameboard.horizontal === false) {
          for (let i = 0; i < length; i++) {
            if (boardCoords[index + i * 10]) {
              boardCoords[index + i * 10].style.backgroundColor =
                'rgb(113, 197, 113)';
            }
          }
        }
      });
    });

    boardCoords.forEach((item) => {
      item.addEventListener('mouseleave', () => {
        boardCoords.forEach((item) =>
          item.style.removeProperty('background-color'),
        );
      });
    });

    return new Promise((resolve) => {
      boardCoords.forEach((item) => {
        item.addEventListener('click', () => {
          const row = index > 9 ? Math.floor(index / 10) : 0;
          const column = index % 10;
          const alert = player.gameboard.placeShip(name, length, row, column);
          domElements.clearText(domElements.alert);
          domElements.animateText(alert, domElements.alert);
          domElements.renderGameboard(player, element);
          if (alert === `${name} placed`) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
    });
  },

  activateCoords(player, element) {
    const boardCoords = Array.from(element.querySelectorAll('.coordinate'));

    boardCoords.forEach((item) => {
      if (!item.classList.contains('hit') && !item.classList.contains('miss')) {
        item.addEventListener('click', (e) => {
          const index = boardCoords.indexOf(e.target);
          const row = index > 9 ? Math.floor(index / 10) : 0;
          const column = index % 10;
          let message = player.gameboard.receiveAttack(row, column);
          player.gameboard.checkSunk();
          domElements.clearText(domElements.alert);
          domElements.animateText(message, domElements.alert);
          domElements.renderOpponent(player, element);
          if (player.gameboard.checkFleet() === true) {
            message = gameFlow.endGame();
            domElements.clearText(domElements.message);
            domElements.animateText(message, domElements.message);
          }
        });
      }
    });
  },
};
