let turn = 0;
let xScore =0;
let oScore = 0;

const slots = document.getElementsByClassName('slot');
const openSlots = document.getElementsByClassName('open');

function getPlyer(turno){
    let player = turno % 2 ==0 ? 'X' : 'O';
    return player;
}

function showMouseOver(){
    if(this.classList.contains('open')){
    this.textContent=  getPlyer(turn);
    this.style.color = 'rgba(0,0,0,0.5)';
    }
}

function clearMouseOver(){
    if(this.classList.contains('open')){
        this.textContent= '';
    }
}

function markSlot(){
    if(this.classList.contains('open')){
        this.textContent=  getPlyer(turn);
        this.style.color = 'rgba(0,0,0,1)';
        this.classList.remove("open");
        this.classList.add("lock");
        checkWinner();
        turn++;
    }
}

function clearSlot(){
    Array.from(slots).forEach(e=> {
        e.classList.remove('lock');
        e.classList.add('open');
        e.textContent=  '';
    });
}

function winner(){
    document.getElementById('modal').style.display = 'block';
    document.getElementById('message').innerHTML =  getPlyer(turn) + ' Ganhou!';
    document.getElementById('message').classList.add('winner');
    score();
}

function tie(){
    document.getElementById('modal').style.display = 'block';
    document.getElementById('message').innerHTML =  'Empate!'
}

function restart(){
    document.getElementById('modal').style.display = 'none';
    clearSlot();
    turn =0;
}

function score(){
    turn % 2 ==0 ? xScore++ : oScore++;
    document.getElementById('oScore').innerText = oScore;
    document.getElementById('xScore').innerText = xScore;
}

function checkWinner(){
    let player = getPlyer(turn)
   let array = Array.from(slots).map(x=> x.innerHTML);
   let result=[];
   for (let index = 0; index < array.length/3; index++) {
       result.push(array.slice(index*3,index*3+3));
    }

    if(turn == 8){
        return tie();
    }
    
    for (let i = 0; i < 3; i++) {
        if(result[i][0] == player && result[i][1] == player &&result[i][2] == player){
           return winner();
        }
        if(result[0][i] == player && result[1][i] == player &&result[2][i] == player){
            return winner();
        }      
    }

    if(result[0][0] == player && result[1][1] == player&&result[2][2] == player){
        return  winner();
    }
    if(result[0][2] == player && result[1][1] == player &&result[2][0] == player){
        return winner();
    }

}

Array.from(slots).forEach(e=> e.addEventListener('mouseover',showMouseOver));

Array.from(slots).forEach(e=> e.addEventListener('mouseleave',clearMouseOver))

Array.from(openSlots).forEach(e=> e.addEventListener('click',markSlot))




