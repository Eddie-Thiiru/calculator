const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const initializer = document.querySelector(".operateButton");

let textContent = "";
let array = [];
let numString = "";
let solution = 0;
let count = 0;
display.textContent = "0"

function getSum() {
    const index = array.indexOf("+");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseFloat(array[firstIndex]);
    const y = parseFloat(array[secondIndex]);
  
    if (isNaN(y)){
        return x + x;
    } else if(isNaN(x)){
        return y;
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
    } else if (isNaN(x)){
        return parseFloat("-" + y);
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
    } else if(isNaN(x)){
        return 0;
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
    } else if(isNaN(x)){
        return 0;
    } else {
        return x / y;
    }
}

function getNumber(e) {
    const num = e.target.dataset.num;
   console.log(numString);
    if (num === "." && array[0] === undefined && numString === "") {
        display.textContent = "";
        display.textContent += "0" + num;
        numString += "0" + num; 
    } else if (num === "." && solution !== 0 && numString === "") {
        array = [];
        display.textContent = "";
        display.textContent += "0" + num;
        numString += "0" + num;
    } else if (num === "." && numString === "0.") {
        return;
    } else if (num === "." && numString.includes(".")){
        return
    } else if (array[0] === undefined && numString === "") {
        display.textContent = "";
        display.textContent += num;
        numString += num; 
    } else if (array[0] === undefined && numString !== "") {
        display.textContent += num;
        numString += num; 
    }else if (array[0] !== undefined && array[1] === undefined){
        display.textContent += num;
        numString += num;
    }else if (solution !== 0 && array[1] === undefined && numString === "") {
        array = [];
        display.textContent = "";
        display.textContent += num;
        numString += num;
    } else if (array[1] !== undefined && numString === ""){
        display.textContent = "";
        display.textContent += num;
        numString += num;
    } else if (array[1] !== undefined && numString !== ""){
        display.textContent += num;
        numString += num;
    }
}

function getOperator(e) {
    const operator = e.target.dataset.operator;
    count ++;
  
    if (numString != "") {
        array.push(numString);
    } 
    numString = "";
    console.log(array);

    if (count >= 2 && array[2] !== undefined) {
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
    display.textContent = "0";  
    console.log(array);

    if (array[0] !== undefined) {

        if (array.length > 1) {

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
            solution = 0;
            solution += parseFloat(array[0].toFixed(7));
            console.log(solution);
            display.textContent = solution;

        } else {
            const answer = parseFloat(array[0]);
            array.splice(0, 1, answer);
            solution = 0;
            solution = parseFloat(array[0].toFixed(7));
            display.textContent = solution;
        }    

    } else {
        return;
    } 
}

numbers.forEach(number => number.addEventListener("click", getNumber));
operators.forEach(operator => operator.addEventListener("click", getOperator));
initializer.addEventListener("click", operate);
clear.addEventListener("click", ()=> {
    display.textContent = "0";
    numString = "";
    array = [];
    solution = 0;
    count = 0;
})
