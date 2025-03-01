document.addEventListener("DOMContentLoaded", function() {
    const buttonsContainer = document.getElementById("buttons");
    const screen = document.getElementById("result");
    let newCalculation = false; // If true, starts a new calculation on number press

    // Button Layout with Required IDs
    const buttonValues = [
        [{ text: "C", id: "clear" }, { text: "←", id: "backspace" }, { text: ".", id: "decimal" }, { text: "*", id: "multiply" }],
        [{ text: "7", id: "7" }, { text: "8", id: "8" }, { text: "9", id: "9" }, { text: "/", id: "divide" }],
        [{ text: "4", id: "4" }, { text: "5", id: "5" }, { text: "6", id: "6" }, { text: "-", id: "subtract" }],
        [{ text: "1", id: "1" }, { text: "2", id: "2" }, { text: "3", id: "3" }, { text: "+", id: "add" }],
        [{ text: "0", id: "0" }, { text: "00", id: "00" }, { text: "=", id: "equal" }, { text: "%", id: "modulus" }]
    ];

    // Create buttons dynamically
    buttonsContainer.innerHTML = ""; // Clear existing buttons (if any)

    buttonValues.forEach(row => {
        let rowDiv = document.createElement("div");
        rowDiv.classList.add("button-row");

        row.forEach(button => {
            let btn = document.createElement("button");
            btn.classList.add("btn");
            btn.id = button.id; // Assign correct IDs for test cases

            if (button.text === "C") {
                btn.classList.add("btn-clear");
                btn.innerHTML = `<span style="color: red;">C</span>`; // Make only "C" red
            } else if (button.text === "←") {
                btn.classList.add("btn-backspace");
                btn.innerText = "←";
            } else if (["+", "-", "*", "/", "%"].includes(button.text)) {
                btn.classList.add("btn-operator");
                btn.innerText = button.text;
            } else if (button.text === "=") {
                btn.classList.add("btn-equal");
                btn.innerText = "=";
            } else {
                btn.innerText = button.text;
            }

            btn.addEventListener("click", function() {
                handleInput(button.text);
            });

            rowDiv.appendChild(btn);
        });

        buttonsContainer.appendChild(rowDiv);
    });

    // Function to handle button clicks
    function handleInput(value) {
        if (value === "C") {
            screen.value = "";
            newCalculation = false;
        } else if (value === "←") {
            screen.value = screen.value.slice(0, -1);
        } else if (value === "=") {
            try {
                screen.value = eval(screen.value);
                newCalculation = true;
            } catch {
                screen.value = "Error";
            }
        } else {
            if (newCalculation && !isNaN(value)) {
                screen.value = value;
            } else {
                screen.value += value;
            }
            newCalculation = false;
        }
    }

    // Handle keyboard input (Only numbers allowed)
    document.addEventListener("keydown", function(event) {
        if (/[\d+\-*/.%]/.test(event.key)) {
            handleInput(event.key);
        } else if (event.key === "Enter") {
            handleInput("=");
        } else if (event.key === "Backspace") {
            handleInput("←");
        } else {
            alert("Only numbers are allowed!");
            event.preventDefault();
        }
    });
});
