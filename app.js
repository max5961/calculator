let valueOne = '';
let valueTwo = '';
let valueThree = null;
console.log(valueOne != valueThree);
operatorOrder = [];


let inputValueOne = true;
let inputNumbers = true;
let content = document.getElementById('console');
let outputValue = document.getElementById('outputValue');

//numbers and parentheses
const one = document.getElementById('one');
const two = document.getElementById('two');
const three = document.getElementById('three');
const four = document.getElementById('four');
const five = document.getElementById('five');
const six = document.getElementById('six');
const seven = document.getElementById('seven');
const eight = document.getElementById('eight');
const nine = document.getElementById('nine');
const zero = document.getElementById('zero');
const decimalPoint = document.getElementById('decimalPoint');

//operators
const divide = document.getElementById('divide');
const multiply = document.getElementById('multiply');
const subtract = document.getElementById('subtract');
const add = document.getElementById('add');
const modulo = document.getElementById('modulo');

//equals, clear, backspace
const equals = document.getElementById('equals');
const clear = document.getElementById('clear');
const backspace = document.getElementById('backspace');

function checkIfOperatorInput(content){
    return (content.textContent != '') && (content.textContent.slice(-2,-1) != '+') &&
    (content.textContent.slice(-2,-1) != '-') &&
    (content.textContent.slice(-2,-1) != '*') &&
    (content.textContent.slice(-2,-1) != '/')
}

//backspace.addEventListener('click', () => {}

numberButtons = [one, two, three, four, five, six, seven, eight, nine, zero, decimalPoint];
numberButtons.forEach(number => {
    console.log(number);
    number.addEventListener('click', () => {
        if(content.textContent.length < 25 && inputNumbers && (valueOne != valueThree)){
            console.log(content.textContent == '0');
            if(content.textContent == '0'){
                content.textContent = '';
            }
            content.textContent += number.textContent;
            valueOne += number.textContent;
            console.log(`from # click, inputValueOne should be true: ${inputValueOne}, valueOne: ${valueOne}`);
            console.log(`from # click, inputValueOne should be true: ${inputValueOne}, valueTwo: ${valueTwo}`);
        } else if (content.textContent.length < 25 && inputNumbers){
            content.textContent += number.textContent;
            valueTwo += number.textContent
            console.log(`from # click, inputValueOne should be false: ${inputValueOne}, valueOne: ${valueOne}`)
            console.log(`from # click, inputValueOne should be false: ${inputValueOne}, valueTwo: ${valueTwo}`)
        }

        //outputBox.textContent = operate(valueOne, value2, operator)
        })
    })

operators = [add, divide, multiply, subtract]
operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if((content.textContent != '') && (content.textContent.slice(-2,-1) != '+') &&
        (content.textContent.slice(-2,-1) != '-') &&
        (content.textContent.slice(-2,-1) != '*') &&
        (content.textContent.slice(-2,-1) != '/')){
            inputNumbers = true;
            //inputValueOne = !inputValueOne;
            operatorOrder.push(operator.textContent)
            valueThree = operate(valueOne, valueTwo, valueThree, operatorOrder);
            outputValue.textContent = valueThree;
            content.textContent = valueThree;
            content.textContent += ` ${operator.textContent} `;
            valueOne = valueThree;
            valueTwo = '';
            
            console.log(`from OPERATOR click, inputValueOne should be false: ${inputValueOne}, valueOne: ${valueOne}`);
            console.log(`from OPERATOR click, inputValueOne should be false: ${inputValueOne}, valueTwo: ${valueTwo}`);
        }
    })
})

equals.addEventListener('click', () => {
    valueThree = finalOperate(valueOne, valueTwo, valueThree, operatorOrder);
    outputValue.textContent = valueThree;
    content.textContent = valueThree;
    operatorOrder = [];
    valueOne = valueThree;
    valueTwo = '';
    inputNumbers = false;
})

function operate(value1, value2, value3, operatorOrder){
    if(operatorOrder.length == 1){
        operator = operatorOrder[0]
        if(operator == '+'){
            value3 = Number(value1) + Number(value2);
        } else if(operator == '-'){
            value3 = Number(value1) - Number(value2);
        } else if(operator == '*'){
            value3 = Number(value1);
        } else if(operator == '/'){
            value3 = Number(value1);
        }
    } else if(operatorOrder.length > 1){
        console.log(operatorOrder[operatorOrder.length - 2]);

        if(operatorOrder[operatorOrder.length - 2] == '+'){
            value3 = Number(value1) + Number(value2);
        } else if(operatorOrder[operatorOrder.length - 2] == '-'){
            value3 = Number(value1) - Number(value2);
        } else if(operatorOrder[operatorOrder.length - 2] == '*'){
            value3 = Number(value1) * Number(value2);
        } else if(operatorOrder[operatorOrder.length - 2] == '/'){
            value3 = Number(value1) / Number(value2);
        }
    }

    return value3;
}


function finalOperate(value1, value2, value3, operatorOrder){
    if(operatorOrder[operatorOrder.length - 1] == '+'){
        value3 = Number(value1) + Number(value2);
    } else if(operatorOrder[operatorOrder.length - 1] == '-'){
        value3 = Number(value1) - Number(value2);
    } else if(operatorOrder[operatorOrder.length - 1] == '*'){
        value3 = Number(value1) * Number(value2);
    } else if(operatorOrder[operatorOrder.length - 1] == '/'){
        value3 = Number(value1) / Number(value2);
    }

    return value3;
}




