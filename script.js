const calculation = document.querySelector('#calculation');
const result = document.querySelector('#result');
const clrBtn = document.querySelector('#clr-btn');
const undoBtn = document.querySelector('#undoBtn');
const numBtns = document.querySelectorAll('.num-btns');
const opBtns = document.querySelectorAll('.op-btns');
const eqBtn = document.querySelector('#eq-btn');
const decBtn = document.querySelector('#dec-btn');

let operand1arr = [];
let operand2arr = [];
let userChoices = [];
let operator = null;
let operand1 = null;
let operand2 = null;

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

function operate(operator, num1, num2 = num1) {
     switch(operator) {
        case '+':
            return add(num1, num2);
        case '-':
            return subtract(num1, num2);
        case 'x':
            return multiply(num1, num2);
        case '/':
            return divide(num1, num2);
        default:
            return num1;
     }
}

function getOperands(userChoices) {
    userChoices.pop();
    let operatorIndex = null;
    debugger;
    for (let i = 0; i < userChoices.length; i++) {
        // if (/^[+\-x\/]&/.test(userChoices[i])) {
            if (userChoices[i] == '+') {
            operatorIndex = i;
            break;
            }
            else {
                operand1arr.push(userChoices[i]);
            }
            
        
    }
    for (let i = operatorIndex + 1; i < userChoices.length; i++) {
        operand2arr.push(userChoices[i]);
    }
    operand1 = parseInt(operand1arr.join(''));
    operand2 = parseInt(operand2arr.join(''));
}


numBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        let num = e.target.innerText;
        calculation.innerText += ` ${num}`;
        userChoices.push(num);
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
    result.innerText = operate(operator, operand1, operand2);
    for (let i = 0; i < operand1arr.length; i++) {
        operand1arr.pop();
    };
});