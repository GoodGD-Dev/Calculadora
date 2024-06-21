document.addEventListener("DOMContentLoaded", () => {
  const display = document.getElementById("resultado");
  const buttons = document.querySelectorAll("button");

  let currentInput = "";
  let operator = "";
  let operand1 = null;

  buttons.forEach(button => {
    button.addEventListener("click", () => {
      const value = button.innerText;

      if (button.id === "clear") {
        clear();
      } else if (button.id === "igual") {
        if (operator && operand1 !== null && currentInput !== "") {
          const operand2 = parseFloat(currentInput);
          const result = calculate(operand1, operand2, operator);
          display.innerText = result;
          operand1 = parseFloat(result); // Atualiza operand1 com o novo resultado
          currentInput = "";
          operator = "";
        }
      } else if (["mais", "menos", "vezes", "dividir"].includes(button.id)) {
        if (currentInput !== "") {
          if (operand1 === null) {
            operand1 = parseFloat(currentInput);
          } else if (operator && operand1 !== null) {
            const operand2 = parseFloat(currentInput);
            const result = calculate(operand1, operand2, operator);
            display.innerText = result;
            operand1 = parseFloat(result); // Atualiza operand1 com o novo resultado
          }
          operator = value;
          currentInput = "";
        } else if (operand1 !== null) {
          operator = value;
        }
      } else {
        currentInput += value;
        display.innerText = currentInput;
      }
    });
  });

  function calculate(a, b, operator) {
    if (operator === "+") return (a + b).toString();
    if (operator === "-") return (a - b).toString();
    if (operator === "*") return (a * b).toString();
    if (operator === "/") return (a / b).toString();
  }

  function clear() {
    currentInput = "";
    operator = "";
    operand1 = null;
    display.innerText = "0";
  }
});
