const calculation = document.querySelector('#calculation');
const result = document.querySelector('#result');
const clrBtn = document.querySelector('#clr-btn');
const undoBtn = document.querySelector('#undoBtn');
const numBtns = document.querySelectorAll('.num-btns');
const opBtns = document.querySelectorAll('.op-btns');
const eqBtn = document.querySelector('#eq-btn');
const decBtn = document.querySelector('#dec-btn');

function add(num1, num2) {
    return num1 + num2;
}

function subtract(num1, num2) {
    return num1 - num2;
}

function multiply(num1, num2) {
    return num1 * num2;
}

function divide(num1, num2) {
    return num1 / num2;
}

function operate(num1, num2 = num1) {
     switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtrack(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '&#247':
            return divide(num1, num2);
        default:
            return num1;
     }
}

function getOperands(userChoices) {
    console.log(userChoices);
    userChoices.pop();
    console.log(userChoices);
    let operatorIndex = null;
    for (let i = 0; i < userChoices.length; i++) {
        console.log(userChoices[i]);
        if (/['+, -, x, &#247']/.test(userChoices[i])) {
            operatorIndex = i;
            break;
        };
        operand1arr.push(userChoices[i]);
    }
    for (let i = operatorIndex + 1; i < userChoices.length; i++) {
        operand2arr.push(userChoices[i]);
    }
    operand1 = operand1arr.join('');
    operand2 = operand2arr.join('');
    console.log(operand1);
    console.log(operand2);
}

let operand1arr = [];
let operand2arr = [];
let operator = null;
let operand1 = null;
let operand2 = null;

numBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        let num = parseInt(e.target.innerText);
        calculation.innerText += ` ${num}`;
        operand1arr.push(num);
    });
});

decBtn.addEventListener('click', function (e) {
    calculation.innerText += e.target.innerText;
});

opBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        operator = e.target.innerText;
        calculation.innerText += ` ${operator}`;
    });
});

eqBtn.addEventListener('click', function (e) {
    calculation.innerText += ` ${e.target.innerText}`;
    getOperands(calculation.innerText.replace(/\s+/g,'').split(''));
    result.innerText = operate(operand1, operand2);
    for (let i = 0; i < operand1arr.length; i++) {
        operand1arr.pop();
    };
});




/*
When the user clicks a number, the event listener stores the number in an array. When the user clicks an operator, the even listener stores the operator in the same array.



{/* <div id="calc-container">
<div id="display">
    <p id="calculation">5 + 5 =</p>
    <p id="result">10</p>
</div>
<div id="rec-btns-container">
    <button class="rec-btns" id="clr-btn">Clear</button>
    <button class="rec-btns" id="undo-btn">Undo</button>
</div>
<div id="sq-btns-container">
    <button class="num-btns sq-btns">7</button>
    <button class="num-btns sq-btns">8</button>
    <button class="num-btns sq-btns">9</button>
    <button class="op-btns sq-btns">&#247</button>
    <button class="num-btns sq-btns">4</button>
    <button class="num-btns sq-btns">5</button>
    <button class="num-btns sq-btns">6</button>
    <button class="op-btns sq-btns">X</button>
    <button class="num-btns sq-btns">1</button>
    <button class="num-btns sq-btns">2</button>
    <button class="num-btns sq-btns">3</button>
    <button class="op-btns sq-btns">-</button>
    <button class="num-btns sq-btns">0</button>
    <button class="num-btns sq-btns">.</button>
    <button id="eq-btn" class="sq-btns">=</button>
    <button class="op-btns sq-btns">+</button>
</div>
</div> */