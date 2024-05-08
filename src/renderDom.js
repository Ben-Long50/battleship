import { gameFlow } from './gameFlow';

/* eslint-disable import/prefer-default-export */
export const domElements = {
  gameboardOne: document.querySelector('#gameboard-one'),
  gameboardTwo: document.querySelector('#gameboard-two'),
  message: document.querySelector('#message-container'),
  turnButton: document.querySelector('#turn-button'),

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

  activateCoords(player, element) {
    const boardCoords = Array.from(element.querySelectorAll('.coordinate'));

    boardCoords.forEach((item) => {
      if (!item.classList.contains('hit') && !item.classList.contains('miss')) {
        item.addEventListener('click', (e) => {
          const index = boardCoords.indexOf(e.target);
          const row = index > 9 ? Math.floor(index / 10) : 0;
          const column = index % 10;
          const message = player.gameboard.receiveAttack(row, column);
          player.gameboard.checkSunk();
          this.message.textContent = message;
          this.renderOpponent(player, element);
          if (player.gameboard.checkFleet() === true) {
            this.message.textContent = gameFlow.endGame();
          }
        });
      }
    });
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
    this.turnButton.textContent === 'Switch Turn'
      ? (() => {
          this.turnButton.textContent = 'Begin Turn';
          this.turnButton.classList.add('begin-button');
          this.message.textContent = `${player}'s Turn`;
        })()
      : (() => {
          this.turnButton.classList.remove('begin-button');
          this.turnButton.textContent = 'Switch Turn';
        })();
  },
};
