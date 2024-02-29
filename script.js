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
let operatorIndex = null;
let operand1 = null;
let operand2 = null;
let resultNum = null;

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
    return (num1 / num2).toFixed(3) / 1;
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
    if (userChoices[-1] == '=') {
        userChoices.pop();
    }
    for (let i = 0; i < userChoices.length; i++) {
        // if (/^[+\-x\/]&/.test(userChoices[i])) {
            if ((userChoices[i] == '+') || (userChoices[i] == '-') || (userChoices[i] == 'x') || (userChoices[i] == '/')) {
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
    operand1 = parseFloat(operand1arr.join(''));
    operand2 = parseFloat(operand2arr.join(''));
}


numBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        let num = e.target.innerText;

        if (result.innerText != '') {
            clear();
        }

        calculation.textContent += `${num}`;

        // if (calculation.innerText.includes(operator)) {
        //     calculation.innerText += ` ${num}`;
        // }
        // else {
        //     calculation.innerText += `${num}`;
        // }
        
        userChoices.push(num);
    });
    
});

decBtn.addEventListener('click', function (e) {
    calculation.innerText += e.target.innerText;
});

opBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        operator = e.target.innerText;
        calculation.textContent += ` ${operator} `;
        if (operatorIndex != null) {
            calculation.textContent = `${resultNum} ${operator} `;
            result.textContent = '';
        };
    });
});

eqBtn.addEventListener('click', function () {
    equalsJobs();
});

function equalsJobs() {
    if (calculation.innerText.includes('=')) {
        calculation.innerText = `${calculation.innerText.slice(0, -2)}`;
    };
    calculation.innerText += ` =`;
    debugger;
    getOperands(calculation.innerText.replace(/\s+/g,'').split(''));
    resultNum = operate(operator, operand1, operand2);
    result.innerText = resultNum;
    operand1arr = [];
    operand2arr = [];
    userChoices = [];
}

clrBtn.addEventListener('click', function() {
    clear();
})

function clear () {
    calculation.innerText = '';
    result.innerText = '';
    for (let i = 0; i < operand1arr.length; i++) {
        operand1arr.pop();
    };
    for (let i = 0; i< operand2arr.length; i++) {
        operand2arr.pop();
    };
    for (let i = 0; i < userChoices.length; i++) {
        userChoices.pop();
    }
    operator = null;
    operatorIndex = null;
}