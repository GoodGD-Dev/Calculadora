const calculator = document.querySelector('.main');
const display = document.querySelector('#resultado');
const keys = calculator.querySelector('.main__buttons');

let firstValue = '';
let operator = '';
let secondValue = '';
let shouldResetDisplay = false;

keys.addEventListener('click', e => {
  if (e.target.matches('button')) {
    const key = e.target;
    const action = key.dataset.action;
    const keyContent = key.textContent;
    const displayedNum = display.textContent;

    if (!action) {
      // Se um número for pressionado
      if (displayedNum === '0' || shouldResetDisplay) {
        display.textContent = keyContent;
        shouldResetDisplay = false;
      } else {
        display.textContent = displayedNum + keyContent;
      }
    }

    if (action === 'decimal') {
      if (!displayedNum.includes('.')) {
        display.textContent = displayedNum + '.';
      } else if (shouldResetDisplay) {
        display.textContent = '0.';
        shouldResetDisplay = false;
      }
    }

    if (action === 'clear') {
      display.textContent = '0';
      firstValue = '';
      operator = '';
      secondValue = '';
      shouldResetDisplay = false;
    }

    if (action === 'add' || action === 'subtract' || action === 'multiply' || action === 'divide') {
      if (firstValue && operator && !shouldResetDisplay) {
        secondValue = displayedNum;
        display.textContent = calculate(firstValue, operator, secondValue);
        firstValue = display.textContent;
      } else {
        firstValue = displayedNum;
      }
      operator = action;
      shouldResetDisplay = true;
    }

    if (action === 'calculate') {
      if (firstValue) {
        secondValue = displayedNum;
        display.textContent = calculate(firstValue, operator, secondValue);
        firstValue = '';
        operator = '';
        shouldResetDisplay = true;
      }
    }
  }
});

function calculate(first, operator, second) {
  const firstNum = parseFloat(first);
  const secondNum = parseFloat(second);
  if (operator === 'add') return firstNum + secondNum;
  if (operator === 'subtract') return firstNum - secondNum;
  if (operator === 'multiply') return firstNum * secondNum;
  if (operator === 'divide') return firstNum / secondNum;
}