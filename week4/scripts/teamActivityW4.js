const controlBoard = document.querySelector('.gameBoard');
const newGameBtn = document.querySelector('.newGameBtn');

const firstPlayerActive = "x";
const secondPlayerActive = "o";
let currentPlayer = firstPlayerActive;

const playerCheck = (e) => {
    e.target.innerHTML = currentPlayer;
    currentPlayer = (currentPlayer === secondPlayerActive) ? firstPlayerActive : secondPlayerActive;
    
}
const newGame = () => {
    let i = 0;
    while (i < controlBoard.children.length) {
        controlBoard.children[i].innerHTML = '';
        i++;
    }
    currentPlayer = firstPlayerActive;
  }

newGameBtn.addEventListener('click', newGame);
controlBoard.addEventListener('click', playerCheck);