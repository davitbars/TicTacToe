const resetbtn = document.querySelector('#button');
const container = document.querySelector('.container');
var popup = document.getElementById("myPopup");
var popupText = document.getElementById('actualtext');

var turnCount = 0;
var gameEnded = false;
var scorePlayer1 = 0;
var scorePlayer2 = 0;

resetbtn.addEventListener('click', () => {
    var children = container.children;
    for (c of children) {
        c.innerHTML = '';
        c.classList.remove('winning-box');
    }
    turnCount = 0;
    gameEnded = false;
    player1.style.color = 'red';
    playerX.style.color = 'red';
    player2.style.color = 'black';
    playerO.style.color = 'Black';
    popup.style.visibility = 'hidden';
    enableClicks();
});

const player1 = document.getElementById('player1');
const playerX = document.getElementById('X');
console.log(playerX)
const player2 = document.getElementById('player2');
const playerO = document.getElementById('O');

player1.addEventListener('click', () => {
    player1.innerHTML = '';
});

player2.addEventListener('click', () => {
    player2.innerHTML = '';
});

const box1 = document.querySelector('#box1');
const box2 = document.querySelector('#box2');
const box3 = document.querySelector('#box3');
const box4 = document.querySelector('#box4');
const box5 = document.querySelector('#box5');
const box6 = document.querySelector('#box6');
const box7 = document.querySelector('#box7');
const box8 = document.querySelector('#box8');
const box9 = document.querySelector('#box9');

const boxes = [box1, box2, box3, box4, box5, box6, box7, box8, box9];

function boxClickHandler() {
    const value = this.innerHTML;
    handleClick(value, this);
}

function enableClicks() {
    boxes.forEach(box => box.addEventListener('click', boxClickHandler));
}

function disableClicks() {
    boxes.forEach(box => box.removeEventListener('click', boxClickHandler));
}

// Add this event listener to each box
enableClicks();

function handleClick(value, box) {
    if (!gameEnded && value === '') {
        turnCount++;

        if (turnCount % 2 === 1) {
            box.innerHTML = 'X';
            player2.style.color = 'red';
            playerO.style.color = 'red';
            player1.style.color = 'Black';
            playerX.style.color = 'Black';
        } else {
            box.innerHTML = 'O';
            player1.style.color = 'red';
            playerX.style.color = 'red';
            player2.style.color = 'Black';
            playerO.style.color = 'Black';
        }

        if (checkWin() || turnCount === 9) {
            gameEnded = true;
            disableClicks();
            if (turnCount === 9 && !checkWin()) {
                // It's a tie
                myFunction('Tie');
            } else {
                // There is a winner
                const winner = turnCount % 2 === 1 ? 'Player 1' : 'Player 2';
                updateScore(winner);
                myFunction(winner);
            }
        }
    }
}

function updateScore(winner) {
    if (winner === 'Player 1') {
        scorePlayer1++;
        playerX.innerHTML = `: ${scorePlayer1}`;
    } else if (winner === 'Player 2') {
        scorePlayer2++;
        playerO.innerHTML = `: ${scorePlayer2}`;
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
            // Player 1 (X) wins
            winningBoxes = [boxes[a], boxes[b], boxes[c]];
            applyWinningClass(winningBoxes);

            return 'X';
        } else if (boxes[a].innerHTML === 'O' && boxes[b].innerHTML === 'O' && boxes[c].innerHTML === 'O') {
            // Player 2 (O) wins
            winningBoxes = [boxes[a], boxes[b], boxes[c]];
            applyWinningClass(winningBoxes);

            return 'O';
        }
    }

    // Check for a tie
    if (turnCount === 9) {
        return 'Tie';
    }

    return null;
}

function applyWinningClass(winningBoxes) {
    for (const box of winningBoxes) {
        box.classList.add('winning-box');
    }
}

function myFunction(winner) {
    console.log(winner);
    console.log(scorePlayer1)
    console.log(scorePlayer2)
    popupText.innerHTML = winner === 'Tie' ? "It's a tie!" : winner + ' Wins!';
    popup.style.visibility = 'visible';
    popup.classList.toggle("show");
}