const boardStatus = [1, 2, 3, 4, 5, 6, 7, 8, 9];
let player1;
let player2;

function Player(name, mark) {
  this.playerName = name;
  this.playerMark = mark;
}

const GameBoard = (() => {
  const board = document.getElementById('board-container');
  const boardPositions = document.querySelectorAll('[id^="position"]');
  let totalMoves = 0;
  let movesO = 0;
  let movesX = 0;

  function drawBoard() {
    board.style.display = 'grid';
    boardPositions.forEach(item => {
      item.addEventListener('click', e => {
        if (item.innerHTML != 'X' && item.innerHTML != 'O') {
          if (movesX == movesO) {
            boardStatus[item.innerHTML - 1] = 'X';
            item.innerHTML = 'X';
            item.style.color = 'black';
            movesX++;
            totalMoves++;
            Game.checkWin('X', totalMoves);
          } else if (movesX > movesO) {
            boardStatus[item.innerHTML - 1] = 'O';
            item.innerHTML = 'O';
            item.style.color = 'black';
            movesO++;
            totalMoves++;
            Game.checkWin('O', totalMoves);
          }
        } else {
          alert('Position already filled.');
        }
      });
    });
  }

  function resetBoard() {
    movesO = 0;
    movesX = 0;
    totalMoves = 0;
    let count = 1;
    boardPositions.forEach(item => {
      item.style.color = 'white';
      item.innerHTML = count;
      count++;
    });
  }

  function setPlayers() {
    player1 = new Player(prompt('Enter name of player 1:'), 'X');
    player2 = new Player(prompt('Enter name of player 2:'), 'O');
  }

  return {
    drawBoard,
    setPlayers,
    resetBoard
  };
})();

const Game = (() => {
  const startBtn = document.getElementById('start-game');
  const winMessage = document.getElementById('winner');
  const restartBtn = document.getElementById('restart-btn');

  startBtn.addEventListener('click', e => {
    GameBoard.setPlayers();
    GameBoard.drawBoard();
    startBtn.style.display = 'none';
  });

  function checkWin(player, totalMoves) {
    const possibleWinningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    let winningCombo = possibleWinningCombos.find(e => {
      return (
        boardStatus[e[0]] == player &&
        boardStatus[e[1]] == player &&
        boardStatus[e[2]] == player
      );
    });

    if (totalMoves == 9 && !winningCombo) {
      winMessage.style.color = 'black';
      winMessage.innerHTML = "It's a tie!";
      restartBtn.style.display = 'flex';
    }

    if (winningCombo) {
      if (player1.playerMark == player) {
        winMessage.style.color = 'black';
        winMessage.innerHTML = `${player1.playerName}` + ' wins!';
        restartBtn.style.display = 'flex';
      } else if (player2.playerMark == player) {
        winMessage.style.color = 'black';
        winMessage.innerHTML = `${player2.playerName}` + ' wins!';
        restartBtn.style.display = 'flex';
      }
    }
  }

  restartBtn.addEventListener('click', e => {
    GameBoard.resetBoard();
    winMessage.style.color = 'darkgray';
    for (let i = 0; i < 9; i++) {
      boardStatus[i] = i;
    }
    restartBtn.style.display = 'none';
  });

  return {
    checkWin
  };
})();
