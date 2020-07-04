const numbers = document.querySelectorAll("#numbers");
const operators = document.querySelectorAll("#operators");
const screen = document.querySelector("#screen2")
const miniScreen = document.querySelector("#screen1")
let screenValue = '';
let numbersCount = 0;
let operatorsCount = 0;
let inputNumbers=[];
let inputOperators=[];
let operatorAtOnce = 0;
let eqn='';

//listening for number input by click
numbers.forEach(button => button.addEventListener("click", numberPressed));
function numberPressed(e){
    input = e.target.value;
    if(!input) return;
    passNumber(input);    
}

//updating number based on recent input
function passNumber(input){
    if(input=="clear" || input=="c"){
        clear();
        return;
    }
    screenValue = screenValue+input;
    screen.textContent=screenValue;
    miniScreen.textContent=screenEqn(inputNumbers, inputOperators);
    operatorAtOnce = 0;
}

//listening for operator input by click
operators.forEach(button => button.addEventListener("click", operatorPressed));
function operatorPressed(e){
    input = e.target.value;
    console.log(input);
    if(!input) return;
    passOperator(input);
    
}

//updating operators array & storing current number
function passOperator(input){
    if (input=="="){
        while(operatorAtOnce!=0){
            inputOperators.splice(operatorsCount-1, 1)
            operatorAtOnce--
        }
        inputNumbers[numbersCount] = screenValue;
        miniScreen.textContent=screenEqn(inputNumbers, inputOperators);
        screenValue= calculate(inputNumbers, inputOperators);
        screen.textContent=screenValue
        
        return;
    }else if(input=="backspace"){
        screenValue= screenValue.slice(0, -1);
        console.log(screenValue)
        screen.textContent=screenValue
        miniScreen.textContent=screenEqn(inputNumbers, inputOperators);
    }else{
        inputOperators[operatorsCount] =input;
        inputNumbers[numbersCount] = screenValue;
        miniScreen.textContent=screenEqn(inputNumbers, inputOperators);
        operatorsCount++;
        numbersCount++;
        operatorAtOnce++;
        screenValue = '';
        screen.textContent='';
    }
}

//listening for key presses
document.addEventListener('keydown', keyPressed);
function keyPressed(e){
    rawInput = e.key;
    input=rawInput.toLowerCase();
    if(!input) return;
    if (input==="=" || input==="enter"){
        passOperator("=")
    }
    else if(Number.isInteger(input*1)){
        passNumber(input);
    }
    else if(input==="+" || input==="-" || input==="*" || input==="=" || input==="/" || input==="c" || input==="backspace"){
        passOperator(input);
    }else{return;}
}


function calculate(numbers, operators){
    //divide
    operatorIndex = operators.indexOf("/");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "/");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("/");
    }
    //multiply
    operatorIndex = operators.indexOf("*");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "*");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("*");
    }
    //add
    operatorIndex = operators.indexOf("+");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "+");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("+");
    }
    //subtract
    operatorIndex = operators.indexOf("-");
    while(operatorIndex != -1){
        calculated = operate(numbers[operatorIndex], numbers[operatorIndex+1], "-");
        operators.splice(operatorIndex, 1);
        numbers.splice(operatorIndex, 1);
        numbers[operatorIndex]=calculated;
        operatorIndex = operators.indexOf("-");
    }
    console.log(`Result:${calculated}`)
    clear("eqn");
    return calculated;

}

function clear(a){
    operatorsCount=0;
    numbersCount=0;
    screenValue = '';
    screen.textContent="";
    inputNumbers=[];
    inputOperators=[];
    operatorAtOnce = 0;
    eqn='';
    if(!a){
    miniScreen.textContent='';
    }
}

function screenEqn(numbers, operators){
    n=0;
    i=0;
    eqn='';
    while(1==1){
        if(numbers[n]){
            eqn+=numbers[n]
            n++;
        }else{
            return eqn;
        }
        if(operators[i]){
            eqn+=operators[i]
            i++;
        }else{
            return eqn;
        }
    }
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