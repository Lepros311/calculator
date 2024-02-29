const calculation = document.querySelector('#calculation');
const result = document.querySelector('#result');
const clrBtn = document.querySelector('#clr-btn');
const undoBtn = document.querySelector('#undo-btn');
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
        userChoices.push(num);
    });
});

decBtn.addEventListener('click', function (e) {
    if (result.innerText != '') {
        clear();
    }
    calculation.innerText += e.target.innerText;
    userChoices.push(e.target.innerText)
    if (calculation.innerText.includes('.') && (operator == null)) {
        decBtn.disabled = true;
    }
    const pattern = /[+-x/]\./g;
    if (pattern.test(calculation.innerText)) {
        decBtn.disabled = true;
    }
});

opBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        operator = e.target.innerText;
        calculation.textContent += ` ${operator} `;
        if (operatorIndex != null) {
            calculation.textContent = `${resultNum} ${operator} `;
            result.textContent = '';
        };
        decBtn.removeAttribute("disabled");
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
    decBtn.removeAttribute("disabled");
}

clrBtn.addEventListener('click', function() {
    clear();
})

function clear () {
    calculation.innerText = '';
    result.innerText = '';
    operand1arr = [];
    operand2arr = [];
    userChoices = [];
    operator = null;
    operatorIndex = null;
    decBtn.removeAttribute("disabled");
}

undoBtn.addEventListener('click', function () {
    undo();
});

function undo() {
    let userChoicesArr = calculation.textContent.split('');
    if (userChoicesArr[userChoicesArr.length - 1] == ' ') {
        userChoices.pop();
        userChoices.pop();
        calculation.textContent = calculation.textContent.slice(0, -2);
    }
    if (result.innerText == resultNum) {
        result.innerText = '';
        calculation.textContent = calculation.textContent.slice(0, -1);
        const pattern = /[+\-x/]\.|\.\ [+\-x/]/;
        if (pattern.test(calculation.textContent)) {
            decBtn.disabled = true;
        }
        else {
            decBtn.removeAttribute("disabled");
        }
    } 
    userChoices.pop();
    calculation.textContent = calculation.textContent.slice(0, -1);
    if (userChoices[userChoices.length - 1] == '.') {
        decBtn.removeAttribute("disabled");
    }
}