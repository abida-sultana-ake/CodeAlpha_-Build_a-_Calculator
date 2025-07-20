const display = document.getElementById('display');
const buttons = document.querySelectorAll('.btn');
const historyDiv = document.getElementById('history');

let input = "";

function updateDisplay() {
  display.value = input || '0';
}

function updateHistory(expr, result) {
  const entry = document.createElement('div');
  entry.textContent = `${expr} = ${result}`;
  historyDiv.prepend(entry);
}

buttons.forEach(button => {
  button.addEventListener('click', () => {
    const key = button.dataset.key;

    if (key === "C") {
      input = "";
    } else if (key === "DEL") {
      input = input.slice(0, -1);
    } else if (key === "=") {
      try {
        const result = eval(input).toString();
        updateHistory(input, result);
        input = result;
      } catch {
        input = "Error";
      }
    } else if (key === "sqrt") {
      try {
        input = Math.sqrt(eval(input)).toString();
      } catch {
        input = "Error";
      }
    } else if (key === "^") {
      input += "**";
    } else if (key === "%") {
      input += "/100";
    } else {
      input += key;
    }

    updateDisplay();
  });
});

window.addEventListener('keydown', (e) => {
  const key = e.key;
  const validKeys = "0123456789+-*/.=EnterBackspace^%()";

  if (!validKeys.includes(key) && key !== 'Escape') return;

  if (key === "Escape") {
    input = "";
  } else if (key === "Backspace") {
    input = input.slice(0, -1);
  } else if (key === "Enter" || key === "=") {
    try {
      const result = eval(input).toString();
      updateHistory(input, result);
      input = result;
    } catch {
      input = "Error";
    }
  } else if (key === "^") {
    input += "**";
  } else if (key === "%") {
    input += "/100";
  } else {
    input += key;
  }

  updateDisplay();
});

updateDisplay();