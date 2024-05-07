/* eslint-disable import/prefer-default-export */
export const domElements = {
  gameboardOne: document.querySelector('#gameboard-one'),
  gameboardTwo: document.querySelector('#gameboard-two'),

  renderGameboard(player, element) {
    while (element.firstChild) {
      element.firstChild.remove();
    }
    const boardArray = player.gameboard.grid;
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i].forEach((index) => {
        const coordinate = document.createElement('div');
        element.appendChild(coordinate);
        coordinate.textContent = index;
        coordinate.classList.add('coordinate');
      });
    }

    const boardCoords = Array.from(element.querySelectorAll('.coordinate'));

    boardCoords.forEach((item) => {
      item.addEventListener('click', (e) => {
        const index = boardCoords.indexOf(e.target);
        const row = index > 9 ? Math.floor(index / 10) : 0;
        const column = index % 10;
        player.gameboard.receiveAttack(row, column);
        this.renderGameboard(player, this.gameboardOne);
      });
    });
  },
};
