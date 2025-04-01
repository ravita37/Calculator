let string = "";
let memory = 0;
let history = [];
let inputField = document.querySelector("input");
let historyContainer = document.querySelector(".history");

// Function to update the display
function updateDisplay() {
    inputField.value = string;
}

// Function to calculate result safely
function calculateResult() {
    try {
        let result = eval(string);
        history.push(`${string} = ${result}`);
        string = result.toString();
        updateDisplay();
        updateHistory();
    } catch {
        string = "Error";
        updateDisplay();
        setTimeout(() => {
            string = "";
            updateDisplay();
        }, 1500);
    }
}

// Function to update calculation history
function updateHistory() {
    historyContainer.innerHTML = history
        .slice(-5)
        .map((entry) => `<p>${entry}</p>`)
        .join("");
}

// Function to calculate factorial
function factorial(n) {
    return n <= 1 ? 1 : n * factorial(n - 1);
}

// Event listener for button clicks
document.querySelectorAll(".btn-style").forEach((button) => {
    button.addEventListener("click", (e) => {
        let value = e.target.innerHTML;

        if ("vibrate" in navigator) navigator.vibrate(20); // Vibration feedback

        if (value == "=") {
            calculateResult();
        } else if (value == "C") {
            string = "";
            updateDisplay();
        } else if (value == "DEL") {
            string = string.slice(0, -1);
            updateDisplay();
        } else if (value == "%") {
            string = (eval(string) / 100).toString();
            updateDisplay();
        } else if (value == "√") {
            string = Math.sqrt(eval(string)).toString();
            updateDisplay();
        } else if (value == "^") {
            string += "**";
            updateDisplay();
        } else if (value == "!") {
            string = factorial(parseInt(string)).toString();
            updateDisplay();
        } else if (value == "M+") {
            memory += eval(string);
        } else if (value == "M-") {
            memory -= eval(string);
        } else if (value == "MR") {
            string = memory.toString();
            updateDisplay();
        } else if (value == "MC") {
            memory = 0;
        } else {
            if (value === "." && string.slice(-1) === ".") return; // Prevent multiple decimals
            string += value;
            updateDisplay();
        }
    });
});

// Keyboard Support
document.addEventListener("keydown", (e) => {
    let key = e.key;
    if (/[0-9+\-*/.%]/.test(key)) {
        string += key;
        updateDisplay();
    } else if (key === "Enter") {
        calculateResult();
    } else if (key === "Backspace") {
        string = string.slice(0, -1);
        updateDisplay();
    } else if (key === "Escape") {
        string = "";
        updateDisplay();
    }
});


