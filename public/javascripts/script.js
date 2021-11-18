let turn = 0;
let xScore = 0;
let oScore = 0;
let firstPlayer = 0 ;

const slots = document.querySelectorAll('.slot');
const openSlots = document.getElementsByClassName('open');

function getPlyer(turno) {
    if (firstPlayer % 2 == 0)
        return turno % 2 == 0 ? 'X' : 'O';
    else
        return turno % 2 == 0 ? 'O' : 'X';
}

function showMouseOver() {
    if (this.classList.contains('open')) {
        this.textContent = getPlyer(turn);
        this.style.color = 'rgba(0,0,0,0.5)';
    }
}

function clearMouseOver() {
    if (this.classList.contains('open')) {
        this.textContent = '';
    }
}

function markSlot() {
    if (this.classList.contains('open')) {
        this.textContent = getPlyer(turn);
        this.style.color = 'rgba(0,0,0,1)';
        this.classList.remove("open");
        this.classList.add("lock");
        checkWinner();
        turn++;
    }
}

function clearSlots() {
    slots.forEach(e => {
        e.classList.remove('lock');
        e.classList.add('open');
        e.textContent = '';
    });
}

function winner() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('message').innerHTML = getPlyer(turn) + ' Ganhou!';
    document.getElementById('message').classList.add('winner');
    score();
}

function tie() {
    document.getElementById('modal').style.display = 'block';
    document.getElementById('message').classList.remove('winner');
    document.getElementById('message').innerHTML = 'Empate!'
}

function restart() {
    document.getElementById('modal').style.display = 'none';
    clearSlots();
    turn = 0;
    firstPlayer++;
}

function score() {

    getPlyer(turn) == 'X' ? xScore++ : oScore++;
    document.getElementById('oScore').innerText = oScore;
    document.getElementById('xScore').innerText = xScore;
}

function checkWinner() {
    let player = getPlyer(turn)
    let array = Array.from(slots).map(x => x.innerHTML);
    let result = [];
    for (let index = 0; index < array.length / 3; index++) {
        result.push(array.slice(index * 3, index * 3 + 3));
    }


    for (let i = 0; i < 3; i++) {
        if (result[i][0] == player && result[i][1] == player && result[i][2] == player) {
            return winner();
        }
        if (result[0][i] == player && result[1][i] == player && result[2][i] == player) {
            return winner();
        }
    }

    if (result[0][0] == player && result[1][1] == player && result[2][2] == player) {
        return winner();
    }
    if (result[0][2] == player && result[1][1] == player && result[2][0] == player) {
        return winner();
    }

    if (turn == 8) {
        return tie();
    }
}

const resizeFontsize = () => {
    let fontSize = slots[0].offsetWidth * 0.9;
    slots.forEach(e => e.style.fontSize = fontSize + 'px');
}

slots.forEach(e => {
    e.addEventListener('mouseover', showMouseOver)
    e.addEventListener('mouseout', clearMouseOver)
});

Array.from(openSlots).forEach(e => e.addEventListener('click', markSlot))

window.addEventListener('resize', resizeFontsize);

resizeFontsize();
