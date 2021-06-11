const display = document.querySelector('h1');
const inputBtn = document.querySelectorAll('button');
const clearBtn = document.querySelector('#clear-btn');

const calculate = {
    '/': (n1, n2) => n1 / n2,
    '*': (n1, n2) => n1 * n2,
    '+': (n1, n2) => n1 + n2,
    '-': (n1, n2) => n1 - n2,
    '=': (n1, n2) => n2,
};

let firstValue = 0;
let operator = '';
let awaitingNextValue = false;

const updateDisplay = (n) => {
    if (n === '.') {
        if (awaitingNextValue) return;
        if (!display.textContent.includes('.')) {
            display.textContent = `${display.textContent}.`;
        }
    } else if (awaitingNextValue) {
        /** Replace current display value if first value is entered */
        display.textContent = n;
        awaitingNextValue = false;
    } else {
        const displayValue = display.textContent;
        display.textContent = displayValue === '0' ? n : displayValue + n;
    }
};

const useOperator = (operatorValue) => {
    /** Prevent multiple operators */
    if (awaitingNextValue && operator) {
        operator = operatorValue;
        return;
    }
    const currentValue = +display.textContent;
    /** Assign first value if no value */
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operator](firstValue, currentValue);
        firstValue = calculation;
        display.textContent = calculation;
    }
    /** Ready for next value, store operator */
    awaitingNextValue = true;
    operator = operatorValue;
};

const clearDisplay = () => {
    firstValue = 0;
    operator = '';
    awaitingNextValue = false;
    display.textContent = 0;
};

clearBtn.addEventListener('click', clearDisplay);
inputBtn.forEach((btn) => {
    /** For numbers */
    if (btn.classList.length === 0 || btn.classList.contains('decimal')) {
        btn.addEventListener('click', () => updateDisplay(btn.value));
        /** For operators */
    } else if (btn.classList.contains('operator')) {
        btn.addEventListener('click', () => useOperator(btn.value));
        /** For decimal */
    }
});
