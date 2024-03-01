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
let backupOperand1arr = [];
let backupOperand2arr = [];
let tempOperand1arr = [];
let tempOperand2arr = [];
const pattern = /[+-x/]\./g;

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
    backupOperand1arr = operand1arr;
    backupOperand2arr = operand2arr;
}


numBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        let num = e.target.innerText;
        if (result.innerText != '') {
            clear();
        }
        calculation.textContent += `${num}`;
        tempOperand2arr = calculation.textContent.split('')
        if (operator) {
        tempOperand2arr = tempOperand2arr.slice(tempOperand2arr.indexOf(/[+-x/]/), -1);
        }
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
    if (pattern.test(calculation.innerText)) {
        decBtn.disabled = true;
    }
});

opBtns.forEach((button) => {
    button.addEventListener('click', function (e) {
        // debugger;
        if (operator) {
            equalsJobs();
            tempOperand1arr = calculation.textContent.split('');
        
            if ((calculation.textContent.includes('+')) || (calculation.textContent.includes('-')) || (calculation.textContent.includes('x')) || (calculation.textContent.includes('/')) && (!calculation.textContent.includes('='))) {
                equalsJobs();
            }

            if (!pattern.test(calculation.textContent)) {
                calculation.textContent += ` ${operator} `;
            };

            if (operatorIndex != null) {
                calculation.textContent = `${resultNum} ${operator} `;
                result.textContent = '';
            };
            operator = e.target.innerText;
            calculation.textContent = `${resultNum} ${operator} `;
            decBtn.removeAttribute("disabled");
        }
        else {
            operator = e.target.innerText;
            tempOperand1arr = calculation.textContent.split('');
            
            if ((calculation.textContent.includes('+')) || (calculation.textContent.includes('-')) || (calculation.textContent.includes('x')) || (calculation.textContent.includes('/')) && (!calculation.textContent.includes('='))) {
                equalsJobs();
            }

            if (!pattern.test(calculation.textContent)) {
                calculation.textContent += ` ${operator} `;
            };

            if (operatorIndex != null) {
                calculation.textContent = `${resultNum} ${operator} `;
                result.textContent = '';
            };
            decBtn.removeAttribute("disabled");
        }
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
    // debugger;

    if (userChoicesArr[userChoicesArr.length - 1] == ' ') {
        userChoices.pop();
        userChoices.pop();
        operatorIndex = null;
        operator = null;
        calculation.textContent = calculation.textContent.slice(0, -2);        
        if (((backupOperand2arr.includes('.')) && ((backupOperand1arr.includes('.')) || (!backupOperand1arr.includes('.'))))) {
            decBtn.disabled = true;
            backupOperand2arr = backupOperand2arr.filter(el => el != '.');
        }
        else if (((!backupOperand1arr.includes('.'))) && ((backupOperand2arr.includes('.')) || (!backupOperand2arr.includes('.')))) {
            decBtn.removeAttribute("disabled");
        }  
        
        if (((backupOperand1arr.includes('.'))) && ((backupOperand2arr.includes('.')) || (!backupOperand2arr.includes('.')))) {
            decBtn.disabled = true;
            backupOperand1arr = backupOperand1arr.filter(el => el != '.');
        }
        else if (((!backupOperand2arr.includes('.')) && ((backupOperand1arr.includes('.')) || (!backupOperand1arr.includes('.'))))) {
            decBtn.removeAttribute("disabled");
        }
    }
    if (result.innerText == resultNum) {
        result.innerText = '';
        calculation.textContent = calculation.textContent.slice(0, -1);

        if (((backupOperand2arr.includes('.')) && ((backupOperand1arr.includes('.')) || (!backupOperand1arr.includes('.'))))) {
            decBtn.disabled = true;
            backupOperand2arr = backupOperand2arr.filter(el => el != '.');
        }
        else if (((!backupOperand1arr.includes('.'))) && ((backupOperand2arr.includes('.')) || (!backupOperand2arr.includes('.')))) {
            decBtn.removeAttribute("disabled");
        }  
        
        if (((backupOperand1arr.includes('.'))) && ((backupOperand2arr.includes('.')) || (!backupOperand2arr.includes('.')))) {
            decBtn.disabled = true;
            backupOperand1arr = backupOperand1arr.filter(el => el != '.');
        }
        else if (((!backupOperand2arr.includes('.')) && ((backupOperand1arr.includes('.')) || (!backupOperand1arr.includes('.'))))) {
            decBtn.removeAttribute("disabled");
        }

    } 
    userChoices.pop();
    calculation.textContent = calculation.textContent.slice(0, -1);
    
    if ((operator == null) && (tempOperand1arr.includes('.'))) {
        decBtn.disabled = true;
    }
    if (userChoicesArr[userChoicesArr.length - 1] == '.') {
        decBtn.removeAttribute("disabled");
    }
    if ((calculation.textContent == '') && (decBtn.disabled == true)) {
        clear();
    }
}

