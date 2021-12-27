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
            return parseFloat(add(a,b).toFixed(8));
        case "subtract":
            equation.b = null;
            return parseFloat(subtract(a,b).toFixed(8));
        case "multiply":
            equation.b = null;
            return parseFloat(multiply(a,b).toFixed(8));
        case "divide":
            equation.b = null;
            return parseFloat(divide(a,b).toFixed(8));
    }
}




const buttonNumbers = document.querySelectorAll('.nums');
buttonNumbers.forEach((button) => {
    button.addEventListener("click", () => {
        /*
        This is for situation where an equation was solved by following
        the sequence of Num > Operator > Num > Operator > Num
        the final num needs to keep the equation going, where the last saved
        value is stored as equation.a
        */
        if (equation.operator && !equation.a) {
            display.textContent = "";
            equation.a = currentValue;
            display.textContent += button.textContent;
            currentValue = parseFloat(display.textContent);
            console.log("AAA");
            console.log(equation);
            console.log(currentValue);
        /*
        Next, if someone performed a calculation and then clicks equals to
        land on an answer. In this case, hitting a number should clear the content
        and essentially be the first number in some new entirely separate equation. 
        */
        } else if (!equation.operator && equation.a) {
            if (!display.textContent.includes(".")) {
                equation.a = null;
                display.textContent = "";
                display.textContent += button.textContent;
                currentValue = parseFloat(display.textContent);
                console.log("FFF");
                console.log(equation);
                console.log(currentValue);
            } else {
                display.textContent += button.textContent;
                currentValue = parseFloat(display.textContent);
                console.log("HHH");
                console.log(equation);
                console.log(currentValue);
            }
            
        /*
        Finally, the baase case is when the equation is completely new.
        No operator has been stored, and the first equation value a is blank as well
        */
        }else {
            display.textContent += button.textContent;
            currentValue = parseFloat(display.textContent);
            console.log("BBB");
            console.log(equation);
            console.log(currentValue);
        }
    });
});

const buttonOperators = document.querySelectorAll('.operator');
buttonOperators.forEach((button) => {
    button.addEventListener("click", () => {
        /*
        If an operator is not yet stored, but there is a value stored in display
        THen we mark that value as equation.a and store an operator
        */
        if(currentValue && !equation.operator && button.value !== 'equals') {
            equation.a = currentValue;
            equation.operator = button.value;
            display.textContent = "";
            console.log("CCC");
            console.log(equation);
            console.log(currentValue);
        } 
        /*
        This next case handles when an operator performs an evaluation
        And ALSO sets up the next equation with the selected operator
        */
        else if (equation.a && equation.operator && button.value !== 'equals') {
            currentValue = parseFloat(display.textContent);
            equation.b = currentValue;
            currentValue = operate(equation.operator, equation.a, equation.b);
            equation.a = null;
            equation.operator = button.value;
            equation.b = null;
            display.textContent = currentValue;
            console.log("DDD");
            console.log(equation);
            console.log(currentValue);        
        } 
        /*
        If an equation is being chained by non equal operators, and the user hits +
        to continue chaining...but then before hitting a number, switches his mind
        and hits -, then this just changes the operator and leaves the equation
        intact
        */
       else if (!equation.a && equation.operator && button.value !== 'equals') {
            equation.operator = button.value;
            console.log("GGG");
            console.log(equation);
            console.log(currentValue);        
        }
        /*
        Operates on a given equation
        */
        if (equation.a && equation.operator && button.value === 'equals') {
            currentValue = parseFloat(display.textContent);
            equation.b = currentValue;
            currentValue = operate(equation.operator, equation.a, equation.b);
            equation.a = currentValue;
            display.textContent = currentValue;
            console.log("EEE");
            console.log(equation);
            console.log(currentValue);
        } 
        
    });
});

const clear = document.querySelector(".clear");
clear.addEventListener("click", () => {
    display.textContent = "";
    for (let key in equation) {
        equation[key] = null;
    }
});

const negate = document.querySelector('.negate');
negate.addEventListener("click", () => {
    currentValue = -currentValue;
    display.textContent = currentValue;
});

const percent = document.querySelector('.percent');
percent.addEventListener("click", () => {
    currentValue = currentValue / 100;
    display.textContent = currentValue;
});

const decimal = document.querySelector('.decimal');
decimal.addEventListener("click", () => {
    if (!display.textContent.includes(".")) {
        display.textContent += ".";
    }
});

// const round = document.querySelector('.round');
// round.addEventListener("click", () => {
//     currentValue = currentValue.toFixed(4);
//     display.textContent = currentValue;
// });