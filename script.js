const display = document.querySelector("#display");
const clear = document.querySelector("#clear");
const backspace = document.querySelector("#backspace");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const initializer = document.querySelector(".operateButton");

let array = [];
let numString = "";
let solution = 0;
let count = 0;
let keyValue = "";
display.textContent = "0"

function getSum() {
    const index = array.indexOf("+");
    const firstIndex = index - 1;
    const secondIndex = index + 1;
    const x = parseFloat(array[firstIndex]);
    const y = parseFloat(array[secondIndex]);
  
    if (isNaN(x) && isNaN(y)) {
        return 0;
    } else if  (isNaN(y)){
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
   
    if (isNaN(x) && isNaN(y)) {
        return 0;
    } else if  (isNaN(y)){
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

    if (isNaN(x) && isNaN(y)) {
        return 0;
    } else if (isNaN(y)){
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

    if (isNaN(x) && isNaN(y)) {
        return 0;
    } else if (x === 0) {
        return "bruh!";
    }else if (isNaN(y)){
        return x / x;
    } else if(isNaN(x)){
        return 0;
    } else if(y === 0) {
        return "bruh!";
    } else {
        return x / y;
    }
}

function getNumber(e) { 
    let num = (e.target.dataset.num === undefined? keyValue: e.target.dataset.num);
   
    if (num === "." && array[0] === undefined && numString === "") {
        display.textContent = "";
        display.textContent += "0" + num;
        numString += "0" + num; 
    } else if (num === "." && solution !== 0 && numString === "") {
        array = [];
        display.textContent = "";
        display.textContent += "0" + num;
        numString += "0" + num;
    } else if (num === "." && numString === "0." ) {
        return;
    } else if (num === "." && numString.includes(".")){
        return
    } else if (numString.length === 12) {
        return;
    }else if (array[0] === undefined && numString === "") {
        display.textContent = "";
        display.textContent += num;
        numString += num; 
    } else if (array[0] === undefined && numString !== "") {
        display.textContent += num;
        numString += num; 
    } else if (array[0] !== undefined && array[1] === undefined && numString === "") {
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
    const operator = (e.target.dataset.operator === undefined? keyValue: e.target.dataset.operator);
    count ++;
  
    if (numString != "") {
        array.push(numString);
    } 
    numString = "";
    console.log(array);

    if (keyValue === "="){
        operate(e);
    } else if(count >= 2 && array[2] !== undefined) {
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
            solution = (array[0] === "bruh!"? "bruh!": parseFloat(array[0].toFixed(7)));
            console.log(solution);
            display.textContent = solution;

        } else {
            const answer = (array[0] === "bruh!"? 0: parseFloat(array[0]));
            array.splice(0, 1, answer);
            solution = 0;
            solution = parseFloat(array[0].toFixed(7));
            display.textContent = solution;
        }    

    } else {
        return;
    } 
}

function deleteEntry(e) {
    if (numString != "") {
        array.push(numString);
    } 
   
    for(let i = array.length -1; i >= 0; i-- ) {
       
        if (array.length === 1 && typeof(+array[i]) === "number"){
            const arr = (array[i] + "").split("");
            if (arr.length > 1) {
                let index = arr.length - 1 
                arr.splice(index, 1);
                const newNumber = arr.join("");
                array.splice(i, 1, newNumber);
                display.textContent = newNumber;
                numString = "";
                break;
            } else {
                array.splice(0, 1);
                console.log(array);
                display.textContent = "0";
                numString = "";
                break;
            }
        } else if (array.length > 2 && typeof(+array[i]) === "number"){
            const arr = (array[i] + "").split("");
            if (arr.length > 1) {
                let index = arr.length - 1 
                arr.splice(index, 1);
                const newNumber = arr.join("");
                array.splice(i, 1, newNumber);
                console.log(array);
                display.textContent = newNumber;
                numString = "";
                break;
            } else {
                array.splice(2, 1);
                console.log(array);
                display.textContent = array[0];
                numString = "";
                break;
            }
        }else {
            break;
        }
    }
}

function clearCalculator(e) {
    display.textContent = "0";
    numString = "";
    array = [];
    solution = 0;
    count = 0;
}

function inputCommand(e) {
    const numberValue = document.querySelector(`button[data-num="${e.key}"]`);
    const operatorValue = document.querySelector(`button[data-operator="${e.key}"]`);
    const calculate = document.querySelector(`button[data-operate="${e.key}"]`);
 
    if (numberValue) {
        keyValue = e.key;
        getNumber(e);
    } else if (operatorValue) {
        keyValue = e.key;
        console.log(keyValue);
        getOperator(e);
    } else if (calculate || e.key === "Enter") {
        keyValue = e.key;
        operate(e);
        console.log(e.key);
    } else if (e.key === "Backspace"){
        deleteEntry(e);
    } else if (e.key === "Delete") {
        clearCalculator(e);
    } else {
        return;
    }
}

numbers.forEach(number => number.addEventListener("click", getNumber));
operators.forEach(operator => operator.addEventListener("click", getOperator));
initializer.addEventListener("click", operate);
clear.addEventListener("click", clearCalculator);
backspace.addEventListener("click", deleteEntry);
window.addEventListener("keydown", inputCommand);