const numbers = document.querySelectorAll("#numbers");
const operators = document.querySelectorAll("#operators");
const screen = document.querySelector("#screen")
let screenValue = 0;
let numbersCount = 0;
let operatorsCount = 0;
let inputNumbers=[];
let inputOperators=[];
let operatorAtOnce = 0;

numbers.forEach(button => button.addEventListener("click", numberPressed));
function numberPressed(e){
    input = e.target.value;
    if(!input) return;
    if (input==="equal"){
        if(operatorAtOnce==1){
            inputOperators.splice(operatorsCount-1, 1)
        }
        inputNumbers[numbersCount] = screenValue;
        screen.textContent= calculate(inputNumbers, inputOperators);
        return;
    }
    screenValue = screenValue*10+input*1;
    screen.textContent=screenValue;
    operatorAtOnce = 0;
    
}

operators.forEach(button => button.addEventListener("click", operatorPressed));
function operatorPressed(e){
    input = e.target.value;
    console.log(input);
    if(!input) return;
    if(input=="clear"){
        clear();
        return;
    }
    if(operatorAtOnce==0){
        inputOperators[operatorsCount] =input;
        inputNumbers[numbersCount] = screenValue;
        operatorsCount++;
        numbersCount++;
        screenValue = 0;
        screen.textContent="";
        operatorAtOnce = 1;
    }else{
        inputOperators[operatorsCount-1] =input;
        screenValue = 0;
        operatorAtOnce = 1; 
    }
}

function calculate(numbers, operators){
    // console.log(numbers);
    // console.log(operators);
    //divide
    operatorIndex = operators.indexOf("divide");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "/");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("divide");
        console.log(calculated);
    }
    //multiply
    operatorIndex = operators.indexOf("multiply");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "*");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("multiply");
        console.log(calculated);
        console.log(operatorIndex);
    }
    //add
    operatorIndex = operators.indexOf("add");
    while(operatorIndex != -1){
        console.log(operators);
        console.log(numbers);
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "+");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("add");
        console.log(operatorIndex);
        console.log(calculated);
    }
    //subtract
    operatorIndex = operators.indexOf("subtract");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "-");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("subtract");
        console.log(calculated);
    }
    console.log(`Result:${calculated}`)
    clear();
    return calculated;

}

function clear(){
    operatorsCount=0;
    numbersCount=0;
    screenValue = 0;
    screen.textContent="";
    inputNumbers=[];
    inputOperators=[];
    operatorAtOnce = 0;
}
function operate(a, b, operator){
    if(operator === "+"){
       return add(a*1, b*1)
    }else if(operator === "-"){
       return subtract(a*1, b*1)
    }else if(operator === "*"){
        return multiply(a*1, b*1)
    }else if(operator === "/"){
        return divide(a*1, b*1)
    }
}

function add(a,b){
    return a+b;
}

function subtract(a,b){
    return a-b;
}

function multiply(a,b){
    return a*b;
}

function divide(a,b){
    return a/b;
}