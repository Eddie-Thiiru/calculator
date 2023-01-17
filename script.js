const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const initializer = document.querySelector(".operateButton");

let textContent = "";
let array = [];
let numString = "";

function getSum() {
    const index = array.indexOf("+");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseInt(array[firstIndex]);
    const y = parseInt(array[secondIndex]);
    return x + y;
}

function getSubtraction() {
    const index = array.indexOf("-");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseInt(array[firstIndex]);
    const y = parseInt(array[secondIndex]);
    return x - y;
}

function getMultiplication() {
    const index = array.indexOf("*");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseInt(array[firstIndex]);
    const y = parseInt(array[secondIndex]);
    return x * y;
}

function getDivision() {
    const index = array.indexOf("/");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseInt(array[firstIndex]);
    const y = parseInt(array[secondIndex]);
    return x / y;
}

function displayNumber(e) {
    const num = e.target.dataset.num;
    display.textContent += num;
    numString += num; 
}

function displayOperator(e) {
    const operator = e.target.dataset.operator;
 
    if (numString != "") {
        array.push(numString);
    } 
    numString = "";

    display.textContent += operator;
    array.push(operator);
}

function operate(e) {
    array.push(numString);
    display.textContent = "";  
    console.log(array);

    for (let i = 0; i < array.length; i++ ){
        console.log(array);
        console.log(array[i]);
        
        if (array[i] === "+") {
            const answer = getSum();
            console.log(answer);
            array.splice(0, 3, answer);
            console.log(array);
            i--;
        } else if (array[i] === "-") {
            const answer = getSubtraction();
            array.splice(0, 3, answer);
            console.log(array);
            i--;
        } else if (array[i] === "*") {
            const answer = getMultiplication();  
            array.splice(0, 3, answer);
            console.log(array);
            i--;
        } else if (array[i] === "/") {
            const answer = getDivision();
            array.splice(0, 3, answer);
            console.log(array);
            i--;
        }  
    }

    const answer = array.join("");
    console.log(answer);
    display.textContent += answer;
    // numString = "";
    // array = [];
    // console.log(array);
    // array.push(answer);
    // console.log(array);
}

numbers.forEach(number => number.addEventListener("click", displayNumber));
operators.forEach(operator => operator.addEventListener("click", displayOperator));
initializer.addEventListener("click", operate);
