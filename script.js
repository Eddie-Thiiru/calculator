const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const initializer = document.querySelector(".operateButton");

let textContent = "";
let array = [];
let stringNum = "";

function getSum() {
    return x + y;
}

function getSubtraction() {
    return x - y;
}

function getMultiplication() {
    return x * y;
}

function getDivision() {
    return x / y;
}

function displayNumber(e) {
    const num = e.target.dataset.num;
    display.textContent += num;
    stringNum += num; 
}

function displayOperator(e) {
    const operator = e.target.dataset.operator;
    display.textContent += operator;
    array.push(stringNum);
    array.push(operator);
    stringNum = "";

    console.log(stringNum);
    console.log(array);
}

function operate(e) {
    display.textContent = "";

    // if (operator === "+" && operator === "=") {
    //     console.log(getSum());
    // } else if (operator === "-" && operator === "=") {
    //     console.log(getSubtraction());
    // } else if (operator === "*" && operator === "=") {
    //     console.log(getMultiplication());
    // } else if (operator === "/" && operator === "=") {
    //     console.log(divide = getDivision());
    // }
}

numbers.forEach(number => number.addEventListener("click", displayNumber));
operators.forEach(operator => operator.addEventListener("click", displayOperator));
initializer.addEventListener("click", operate);
