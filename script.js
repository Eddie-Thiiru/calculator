const display = document.querySelector("#display");
const numbers = document.querySelectorAll(".number");
const operators = document.querySelectorAll(".operator");
const initializer = document.querySelector(".operateButton");

let textContent = "";
let array = [];
let stringNum = "";

function getSum() {
    let firstIndex = array.findIndex(element => element === "+")- 1;
    let secondIndex = array.findIndex(element => element === "+")+ 1;
    let x = parseInt(array[firstIndex]);
    let y = parseInt(array[secondIndex]);
    
    return x + y;
}

function getSubtraction() {
    let firstIndex = array.findIndex(element => element === "-")- 1;
    let secondIndex = array.findIndex(element => element === "-")+ 1;
    let x = parseInt(array[firstIndex]);
    let y = parseInt(array[secondIndex]);
    
    return x - y;
}

function getMultiplication() {
    let firstIndex = array.findIndex(element => element === "*")- 1;
    let secondIndex = array.findIndex(element => element === "*")+ 1;
    let x = parseInt(array[firstIndex]);
    let y = parseInt(array[secondIndex]);
    
    return x * y;
}

function getDivision() {
    let firstIndex = array.findIndex(element => element === "/")- 1;
    let secondIndex = array.findIndex(element => element === "/")+ 1;
    let x = parseInt(array[firstIndex]);
    let y = parseInt(array[secondIndex]);
    
    return x / y;
}

function displayNumber(e) {
    const num = e.target.dataset.num;
    display.textContent += num;
    stringNum += num; 
}

function displayOperator(e) {
    const operator = e.target.dataset.operator;
    console.log(stringNum);

    if (stringNum != "") {
        array.push(stringNum);
    } 
    stringNum = "";

    display.textContent += operator;
    array.push(operator);
   
    console.log(array);
}

function operate(e) {
    array.push(stringNum);
    display.textContent = "";  
    console.log(array);

    const newArray = array.map(arg => {
        if(arg.includes("/")) {
            const answer = getDivision();          
            return answer;
        } else if(arg.includes("*")) {
            const answer = getMultiplication();          
            return answer;
        } else if(arg.includes("+")) {
            const answer = getSum();
            return answer;
        } else if(arg.includes("-")){
            const answer = getSubtraction();
            return answer;
        }
    });
    const answer = newArray.join("");
    display.textContent += answer;
    stringNum = "";
    array = [];
    console.log(array);
    array.push(answer);
    console.log(array);
}

numbers.forEach(number => number.addEventListener("click", displayNumber));
operators.forEach(operator => operator.addEventListener("click", displayOperator));
initializer.addEventListener("click", operate);
