const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const initializer = document.querySelector(".operateButton");

let textContent = "";
let array = [];
let numString = "";
let count = 0;

function getSum() {
    const index = array.indexOf("+");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseFloat(array[firstIndex]);
    const y = parseFloat(array[secondIndex]);
  
    if (isNaN(y)){
        return x + x;
    } else {
        return x + y;
    }
}

function getSubtraction() {
    const index = array.indexOf("-");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseFloat(array[firstIndex]);
    const y = parseFloat(array[secondIndex]);
   
    if (isNaN(y)){
        return x - x;
    } else {
        return x - y;
    }
}

function getMultiplication() {
    const index = array.indexOf("*");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseFloat(array[firstIndex]);
    const y = parseFloat(array[secondIndex]);

    if (isNaN(y)){
        return x * x;
    } else {
        return x * y;
    }
}

function getDivision() {
    const index = array.indexOf("/");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseFloat(array[firstIndex]);
    const y = parseFloat(array[secondIndex]);

    if (isNaN(y)){
        return x / x;
    } else {
        return x / y;
    }
}

function getNumber(e) {
    const num = e.target.dataset.num;
    if (array[0] === undefined) {
        display.textContent += num;
    } else if (array[0] !== undefined && array[1] === undefined && numString === "") {
        array = [];
        display.textContent = "";
        display.textContent += num;
    } else if (array[1] !== undefined && numString === ""){
        display.textContent = "";
        display.textContent += num;
    } else {
        display.textContent += num;
    }
    numString += num; 
}

function getOperator(e) {
    const operator = e.target.dataset.operator;
    count ++;
   
    if (numString != "") {
        array.push(numString);
    } 
    numString = "";
    console.log(array);

    if (array[0] === undefined){
        return;
    }else if (count >= 2 && array[2] !== undefined) {
        operate(e);
        array.push(operator);
    } else if (count >=2 && array[1] === undefined) {
        array.push(operator);
    } else if (count >=2 && array[2] === undefined) {
        operate(e);   
    } else {
        array.push(operator);
    }
    console.log(array);
}

function operate(e) {
    if (numString !== "") {
        array.push(numString);
    } 
    numString = "";
    display.textContent = "";  
    console.log(array);

    if (array[0] !== undefined) {
        for (let i = 0; i < array.length; i++ ){
            if (array[i] === "+") {
                const answer = getSum();
                console.log(answer);
                array.splice(0, 3, answer);
                console.log(array);
                break;
            } else if (array[i] === "-") {
                const answer = getSubtraction();
                array.splice(0, 3, answer);
                console.log(array);
                break;
            } else if (array[i] === "*") {
                const answer = getMultiplication();  
                array.splice(0, 3, answer);
                console.log(array);
                break;
            } else if (array[i] === "/") {
                const answer = getDivision();
                array.splice(0, 3, answer);
                console.log(array);
                break;
            }  
        }
    } else {
        return;
    }
    const solution = parseFloat(array[0].toFixed(7));
    console.log(solution);
    display.textContent += solution;
}

numbers.forEach(number => number.addEventListener("click", getNumber));
operators.forEach(operator => operator.addEventListener("click", getOperator));
initializer.addEventListener("click", operate);
 