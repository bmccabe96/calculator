//Basic operators
const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;

//display will store a current value and be updated with results
const display = document.querySelector(".display");
let currentValue; //this will be used to store the value
                //currently stored in the display
let equation = {
    'a': null,
    'b': null,
    'operator': null
};


//Create function to perform the evaluation for any given operator and return the answer
function operate(operator, a, b) {
    equation.b = null;
    equation.operator = null;
    switch (operator) {
        case "add":
            return add(a,b);
        case "subtract":
            equation.b = null;
            return subtract(a,b);
        case "multiply":
            equation.b = null;
            return multiply(a,b);
        case "divide":
            equation.b = null;
            return divide(a,b);
    }
}




const buttonNumbers = document.querySelectorAll('.nums');
buttonNumbers.forEach((button) => {
    button.addEventListener("click", () => {
        display.textContent += button.textContent;
        currentValue = parseInt(display.textContent);
    });
});

const buttonOperators = document.querySelectorAll('.operator');
buttonOperators.forEach((button) => {
    button.addEventListener("click", () => {
        if(currentValue && !equation.operator) {
            equation.a = currentValue;
            equation.operator = button.value;
            display.textContent = "";
            console.log(equation);
        }
        if (equation.a && equation.b) {
            currentValue = operate(equation.operator, equation.a, equation.b);
            display.textContent = currentValue;
            console.log(equation);
        }
        if (equation.a && equation.operator && button.value === 'equals') {
            currentValue = parseInt(display.textContent);
            equation.b = currentValue;
            currentValue = operate(equation.operator, equation.a, equation.b);
            equation.a = currentValue;
            display.textContent = currentValue;
            console.log(equation);
        }
      
    })
})