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
  playerName: document.querySelector('#player-name'),
  pvpStartButton: document.querySelector('#pvp-start-button'),
  pvcStartButton: document.querySelector('#pvc-start-button'),
  player1Title: document.querySelector('#player1-title'),
  player2Title: document.querySelector('#player2-title'),
  player1Sunk: document.querySelector('#player1-sunk-ships'),
  player2Sunk: document.querySelector('#player2-sunk-ships'),
  gameboardOne: document.querySelector('#gameboard-one'),
  gameboardTwo: document.querySelector('#gameboard-two'),
  message: document.querySelector('#message-container'),
  alert: document.querySelector('#alert-container'),
  buttonContainer: document.querySelector('#button-container'),
  turnButton: undefined,
  messageTimers: [],
  alertTimers: [],

  renderTitles() {
    this.player1Title.textContent = `${gameFlow.activePlayer.name}'s Gameboard`;
    this.player2Title.textContent = `${gameFlow.inactivePlayer.name}'s Gameboard`;
    const sunk1Title = document.createElement('div');
    const sunk2Title = document.createElement('div');
    sunk1Title.textContent = 'Ships Sunk:';
    sunk2Title.textContent = 'Ships Sunk:';
    this.player2Sunk.appendChild(sunk1Title);
    this.player1Sunk.appendChild(sunk2Title);
  },

  renderSunkShip(list, name, length) {
    const sunkShip = document.createElement('div');
    sunkShip.classList.add('sunk-ship');
    sunkShip.textContent = `${name} (${length})`;
    list.appendChild(sunkShip);
  },

  renderTurnButton(property, text) {
    const turnButton = document.createElement('button');
    turnButton.id = 'turn-button';
    turnButton.classList.add(property);
    turnButton.textContent = text;
    this.buttonContainer.appendChild(turnButton);
    this.turnButton = this.getTurnButton();
    turnButton.addEventListener('click', (e) => {
      if (e.target.classList.contains(undefined)) {
        this.buttonContainer.removeChild(turnButton);
        domElements.clearText(domElements.message, domElements.messageTimers);
        domElements.clearText(domElements.alert, domElements.alertTimers);
        this.renderTurnButton('begin-button', 'Begin Turn');
        gameFlow.switchScreen();
      } else if (e.target.classList.contains('switch-button')) {
        this.buttonContainer.removeChild(turnButton);
        this.renderTurnButton('begin-button', 'Begin Turn');
        gameFlow.switchActive();
        gameFlow.switchScreen();
      } else if (e.target.classList.contains('begin-button')) {
        this.buttonContainer.removeChild(turnButton);
        gameFlow.displayBoards();
      } else if (e.target.classList.contains('new-game-button')) {
        this.buttonContainer.removeChild(turnButton);
        gameFlow.loadGame();
      }
    });
  },

  getTurnButton() {
    return document.querySelector('#turn-button');
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
        } else if (
          index != player.token &&
          gameFlow.activePlayer.name === 'Computer'
        ) {
          coordinate.classList.add('ship');
        }
        coordinate.classList.add('coordinate');
        if (
          !coordinate.classList.contains('hit') &&
          !coordinate.classList.contains('miss') &&
          gameFlow.activePlayer.name != 'Computer'
        ) {
          coordinate.classList.add('active-coord');
        }
      });
    }
  },

  renderBlankBoard(element) {
    const boardCoords = element.querySelectorAll('.coordinate');
    boardCoords.forEach((ele) => {
      ele.classList.remove('ship');
      ele.classList.remove('hit');
      ele.classList.remove('miss');
      ele.classList.remove('active-coord');
    });
  },

  clearGameboard(element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
  },

  toggleTurnButton(player) {
    turnButton.classList.remove('new-game-button');
    !turnButton.classList.contains('begin-button')
      ? (() => {
          turnButton.textContent = 'Begin Turn';
          turnButton.classList.remove('switch-button');
          turnButton.classList.add('begin-button');
          message.textContent = `${player}'s Turn`;
        })()
      : (() => {
          turnButton.classList.remove('begin-button');
          turnButton.classList.add('switch-button');
          turnButton.textContent = 'Switch Turn';
        })();
  },

  async animateText(text, element) {
    element.style.removeProperty('display');
    for (let i = 0; i < text.length; i++) {
      const timer = await setTimeout(() => {
        element.textContent += text[i];
      }, 20 * i);
      this.messageTimers.push(timer);
    }
  },

  clearText(element) {
    element.textContent = '';
    if (element === this.message) {
      this.messageTimers.forEach((timer) => {
        clearTimeout(timer);
      });
      this.messageTimers = [];
    } else if (element === this.alert) {
      this.alert.style.display = 'none';
      this.alertTimers.forEach((timer) => {
        clearTimeout(timer);
      });
      this.alertTimers = [];
    }
  },
};
