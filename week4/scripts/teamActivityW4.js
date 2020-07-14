const controlBoard = document.querySelector('.gameBoard');
const newGameBtn = document.querySelector('.newGameBtn');

const firstPlayerActive = "x"
const secondPlayerActive = "o"
let player = firstPlayerActive;

const playerCheck = (e) => {
    e.target.innerHTML = player;
    player = (player === secondPlayerActive) ? firstPlayerActive : secondPlayerActive;
    
}
const newGame = () => {
    let i = 0;
    while (i < controlBoard.children.length) {
        controlBoard.children[i].innerHTML = "";
        i++;
    }
    player = firstPlayerActive;
  }

newGameBtn.addEventListener('click', newGame);
controlBoard.addEventListener('click', playerCheck);