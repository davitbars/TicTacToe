const resetbutton = document.querySelector('#button');
const container = document.querySelector('.container');
var popup = document.getElementById("myPopup");
var popupText = document.getElementById('actualtext');

var turnCount = 0;
var player1Score = 0;
var player2Score = 0;

const player1 = document.getElementById('player1');
const playerX = document.getElementById('X');
const player2 = document.getElementById('player2');
const playerO = document.getElementById('O');

resetbutton.addEventListener('click', () => {
    var children = container.children;
    for (c of children) {
        c.innerHTML = '';
        c.classList.remove('winning-box'); // Remove winning class
    }
    turnCount = 0;
    popup.style.visibility ='hidden';
    updateScore();
});

player1.addEventListener('click', () => {
    player1.innerHTML = '';
});

const boxes = document.querySelectorAll('.box');

for (const box of boxes) {
    box.addEventListener('click', () => {
        if (box.innerHTML === '') {
            handleClick('X', box);
            if (!checkWin()) {
                setTimeout(() => computerMove(), 500); // Introduce delay for computer move
            }
        }
    });
}

function computerMove() {
    const emptyBoxes = Array.from(boxes).filter(box => box.innerHTML === '');
    if (emptyBoxes.length > 0) {
        const randomIndex = Math.floor(Math.random() * emptyBoxes.length);
        const randomBox = emptyBoxes[randomIndex];
        handleClick('O', randomBox);
    }
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
        if (value === 'X' && turnCount != 9) {
            player1Score++;
        } else if(value === 'O' && turnCount != 9) {
            player2Score++;
        }
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
            return true;
        } else if (boxes[a].innerHTML === 'O' && boxes[b].innerHTML === 'O' && boxes[c].innerHTML === 'O') {
            winningBoxes = [boxes[a], boxes[b], boxes[c]];
            applyWinningClass(winningBoxes);
            myFunction(player2.innerHTML);
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
