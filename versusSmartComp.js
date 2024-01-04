const resetButton = document.querySelector('#button');
const container = document.querySelector('.container');
var popup = document.getElementById("myPopup");
var popupText = document.getElementById('actualtext');
var cpuMoveText = document.getElementById("cpu-move");
var turnCount = 0;
var player1Score = 0;
var player2Score = 0;

const player1 = document.getElementById('player1');
const playerX = document.getElementById('X');
const player2 = document.getElementById('player2');
const playerO = document.getElementById('O');

resetButton.addEventListener('click', () => {
    var children = container.children;
    for (c of children) {
        c.innerHTML = '';
        c.classList.remove('winning-box'); // Remove winning class
    }
    turnCount = 0;
    popup.style.visibility = 'hidden';
    updateScore();
});

player1.addEventListener('click', () => {
    player1.innerHTML = '';
});

const boxes = Array.from(document.querySelectorAll('.box'));

for (const box of boxes) {
    box.addEventListener('click', () => {
        if (box.innerHTML === '') {
            handleClick('X', box);
            if (turnCount != 9) {
                computerMove();
            }
        }
    });
}

function computerMove() {
    cpuMoveText.innerHTML = "CPU is Thinking....";
    setTimeout(() => {
        const move = minimax('O').index;
        const box = boxes[move];
        handleClick('O', box);
        cpuMoveText.innerHTML = "";
    }, 500);
    
}

function handleClick(value, box) {
    if (value === 'X' && turnCount % 2 === 1) {
        return; // Prevent user from making consecutive moves
    }

    turnCount++;
    box.innerHTML = value;

    if (value === 'X') {
        player2.style.color = 'red';
        playerO.style.color = 'red';
        player1.style.color = 'Black';
        playerX.style.color = 'Black';
    } else {
        player1.style.color = 'red';
        playerX.style.color = 'red';
        player2.style.color = 'Black';
        playerO.style.color = 'Black';
    }

    if (checkWin()) {
        updateScore();
    }
}

function applyWinningClass(winningBoxes) {
    for (const box of winningBoxes) {
        box.classList.add('winning-box');
    }
}

function checkWin() {
    let winningBoxes = [];
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (boxes[a].innerHTML === 'X' && boxes[b].innerHTML === 'X' && boxes[c].innerHTML === 'X') {
            winningBoxes = [boxes[a], boxes[b], boxes[c]];
            applyWinningClass(winningBoxes);
            myFunction(player1.innerHTML);
            player1Score++;  // Increment player1Score when player 1 wins
            updateScore();
            return true;
        } else if (boxes[a].innerHTML === 'O' && boxes[b].innerHTML === 'O' && boxes[c].innerHTML === 'O') {
            winningBoxes = [boxes[a], boxes[b], boxes[c]];
            applyWinningClass(winningBoxes);
            myFunction(player2.innerHTML);
            player2Score++;  // Increment player2Score when player 2 wins
            updateScore();
            return true;
        }
    }

    if (turnCount === 9) {
        myFunction('Tie');
        return true;
    }

    return false;
}


function myFunction(winner) {
    popupText.innerHTML = winner === 'Tie' ? 'It\'s a Tie!' : winner + ' Wins!';
    popup.style.visibility = 'visible';
    popup.classList.toggle("show");
}

function updateScore() {
    playerX.innerHTML = ': ' + player1Score;
    playerO.innerHTML = ': ' + player2Score;
}

function checkWinForMinimax(player, currentBoxes) {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (currentBoxes[a].innerHTML === player && currentBoxes[b].innerHTML === player && currentBoxes[c].innerHTML === player) {
            return true;
        }
    }

    return false;
}

function minimax(player) {
    const availableSpots = getEmptyIndexes();

    if (checkWinForMinimax('X', boxes)) {
        return { score: -10 };
    } else if (checkWinForMinimax('O', boxes)) {
        return { score: 10 };
    } else if (availableSpots.length === 0) {
        return { score: 0 };
    }

    const moves = [];

    for (let i = 0; i < availableSpots.length; i++) {
        const move = {};
        move.index = availableSpots[i];

        boxes[availableSpots[i]].innerHTML = player;

        if (player === 'O') {
            move.score = minimax('X').score;
        } else {
            move.score = minimax('O').score;
        }

        boxes[availableSpots[i]].innerHTML = '';
        moves.push(move);
    }

    let bestMove;
    let bestScore = player === 'O' ? -Infinity : Infinity;

    for (let i = 0; i < moves.length; i++) {
        if ((player === 'O' && moves[i].score > bestScore) || (player === 'X' && moves[i].score < bestScore)) {
            bestScore = moves[i].score;
            bestMove = i;
        }
    }

    return moves[bestMove];
}



function getEmptyIndexes() {
    return boxes
        .map((box, index) => (box.innerHTML === '') ? index : -1)
        .filter(index => index !== -1);
}
