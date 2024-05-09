import { gameFlow } from './gameFlow';

/* eslint-disable import/prefer-default-export */
export const domElements = {
  startDialog: document.querySelector('#start-dialog'),
  pvpMode: document.querySelector('#pvp-mode'),
  pvcMode: document.querySelector('#pvc-mode'),
  pvpDialog: document.querySelector('#pvp-dialog'),
  pvcDialog: document.querySelector('#pvc-dialog'),
  player1Name: document.querySelector('#player1-name'),
  player2Name: document.querySelector('#player2-name'),
  pvpStartButton: document.querySelector('#pvp-start-button'),
  pvcStartButton: document.querySelector('#pvc-start-button'),
  player1Ships: document.querySelector('#player1-ship-info'),
  player2Ships: document.querySelector('#player2-ship-info'),
  gameboardOne: document.querySelector('#gameboard-one'),
  gameboardTwo: document.querySelector('#gameboard-two'),
  message: document.querySelector('#message-container'),
  alert: document.querySelector('#alert-container'),
  turnButton: document.querySelector('#turn-button'),

  renderShip(element, length) {
    const ship = document.createElement('div');
    ship.classList.add('ship-display');
    element.appendChild(ship);
    for (let i = 0; i < length; i++) {
      const shipUnit = document.createElement('div');
      shipUnit.classList.add('ship-unit');
      ship.appendChild(shipUnit);
    }
  },

  renderGameboard(player, element) {
    this.clearGameboard(element);
    const boardArray = player.gameboard.grid;
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i].forEach((index) => {
        const coordinate = document.createElement('div');
        element.appendChild(coordinate);
        if (index === player.gameboard.token) {
          coordinate.classList.add('ship');
        } else if (index === 'hit') {
          coordinate.classList.add('hit');
        } else if (index === 'miss') {
          coordinate.classList.add('miss');
        }
        coordinate.classList.add('coordinate');
      });
    }
  },

  renderOpponent(player, element) {
    this.clearGameboard(element);
    const boardArray = player.gameboard.grid;
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i].forEach((index) => {
        const coordinate = document.createElement('div');
        element.appendChild(coordinate);
        if (index === 'hit') {
          coordinate.classList.add('hit');
        } else if (index === 'miss') {
          coordinate.classList.add('miss');
        }
        coordinate.classList.add('coordinate');
      });
    }
  },

  renderBlankBoard(element) {
    const boardCoords = element.querySelectorAll('.coordinate');
    boardCoords.forEach((ele) => {
      ele.classList.remove('ship');
      ele.classList.remove('hit');
      ele.classList.remove('miss');
    });
  },

  clearGameboard(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  },

  toggleTurnButton(player) {
    this.turnButton.classList.remove('new-game-button');
    !this.turnButton.classList.contains('begin-button')
      ? (() => {
          this.turnButton.textContent = 'Begin Turn';
          this.turnButton.classList.remove('switch-button');
          this.turnButton.classList.add('begin-button');
          this.message.textContent = `${player}'s Turn`;
        })()
      : (() => {
          this.turnButton.classList.remove('begin-button');
          this.turnButton.classList.add('switch-button');
          this.turnButton.textContent = 'Switch Turn';
        })();
  },

  animateText(text, element, index = 0) {
    if (index === text.length) {
      return;
    }
    element.textContent += text[index];
    setTimeout(() => {
      this.animateText(text, element, index + 1);
    }, 20);
  },

  clearText(element) {
    element.textContent = '';
  },
};
