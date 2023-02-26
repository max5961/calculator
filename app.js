let valueOne = '';
let valueTwo = '';
let valueThree = null;
console.log(valueOne != valueThree);
operatorOrder = [];


let inputValueOne = true;
let inputNumbers = true;
let afterEquals = false;
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

function clearResults(){
    valueOne = '';
    valueTwo = '';
    valueThree = null;
    operatorOrder = [];
    content.textContent = '0';
    outputValue.textContent = '0';
    inputNumbers = true;
}

clear.addEventListener('click', clearResults);

/*
function checkIfOperatorInput(content){
    return (content.textContent != '') && (content.textContent.slice(-2,-1) != '+') &&
    (content.textContent.slice(-2,-1) != '-') &&
    (content.textContent.slice(-2,-1) != '*') &&
    (content.textContent.slice(-2,-1) != '/');
}
*/


numberButtons = [one, two, three, four, five, six, seven, eight, nine, zero];
numberButtons.forEach(number => {
    console.log(number);
    number.addEventListener('click', () => {
        if(afterEquals == true && inputNumbers == false){
            clearResults();
        }

        if(content.textContent.length < 25 && inputNumbers && (valueOne != valueThree)){
            console.log(content.textContent == '0');
            if(content.textContent == '0'){
                content.textContent = '';
            }
            content.textContent += number.textContent;
            valueOne += number.textContent;
            console.log(`from # click, inputValueOne should be true: ${inputValueOne}, valueOne: ${valueOne}`);
            console.log(`from # click, inputValueOne should be true: ${inputValueOne}, valueTwo: ${valueTwo}`);
            console.log(`valueOne != valueThree.  This is valueThree: ${valueThree}`)
        } else if (content.textContent.length < 25 && inputNumbers){
            content.textContent += number.textContent;
            valueTwo += number.textContent
            console.log(`from # click, inputValueOne should be false: ${inputValueOne}, valueOne: ${valueOne}`)
            console.log(`from # click, inputValueOne should be false: ${inputValueOne}, valueTwo: ${valueTwo}`)
            console.log(`valueOne should = valueThree.  This is valueThree: ${valueThree}`)
        }
        })
    })


decimalPoint.addEventListener('click', () => {
    if(content.textContent == '0' && inputNumbers && valueOne != valueThree){
        content.textContent += decimalPoint.textContent;
        valueOne += decimalPoint.textContent;
    } else if(content.textContent.length < 24 && inputNumbers && valueOne != valueThree){
        hasDecimals = content.textContent.split("");
        hasDecimals = hasDecimals.filter(char => {
            return char == '.';
        })
        if(hasDecimals.length == 1){
            content.textContent = content.textContent;
            valueOne = valueOne;
        } else {
            content.textContent += decimalPoint.textContent;
            valueOne += decimalPoint.textContent;
        }
    }

    else if(content.textContent.length < 24 && inputNumbers){
        //check if valueTwo is empty.  Input '0' in front of the decimal point.
        if(content.textContent.slice(-1) == ' '){
            content.textContent += '0.';
            valueTwo += decimalPoint.textContent;
        }
        //get an array of the valueTwo
        hasDecimals = (content.textContent.split(' '))[2].split('');
        hasDecimals = hasDecimals.filter(char => {
            return char == '.';
        })
        if(hasDecimals.length == 1){
            content.textContent = content.textContent;
            valueTwo = valueTwo;
        } else {
            content.textContent += decimalPoint.textContent;
            valueTwo += decimalPoint.textContent;
        }
    }
})

function backTick(string){
    if(string == '0' || string == ''){
        return string;
    }

    else if(string.split(' ')[2]){
        let arrayString = string.split(' ')[2].toString().split('');
        arrayString.pop()
        let removedString = '';
        arrayString.forEach(char => {
            removedString += char;
        })
        string = string.split(' ')[0] + ` ${string.split(' ')[1]} ` + removedString;
        return string;
    }

    else if(string.split(' ')[1]){
        arrayString = string.split(' ')[0].toString().split('');
        removedString = '';
        arrayString.forEach(char => {
            removedString += char;
        })

        operatorOrder.pop();

        return removedString
    }

    else{
        arrayString = string.split('');
        arrayString.pop();
        removedString = '';
        arrayString.forEach(char => {
            removedString += char;
        })
        return removedString;
    }
}

backspace.addEventListener('click', () => {
    if(afterEquals == true && inputNumbers == false){
        clearResults();
    }

    else if(valueOne != valueThree){
        content.textContent = backTick(content.textContent);
        valueOne = content.textContent;
    }

    else if(content.textContent.split(' ')[2] == false){
        content.textContent = backTick(content.textContent);
    }

    else if(content.textContent.split(' ')[2]){
        content.textContent = backTick(content.textContent);
        valueTwoArray = content.textContent.split(' ')[2].toString().split('');
        valueTwo = '';
        valueTwoArray.forEach(char => {
            valueTwo += char;
        })
    }
})


operators = [add, multiply, subtract, divide]
operators.forEach(operator => {
    operator.addEventListener('click', () => {

        //allow negative numbers
        console.log(`this is the content.textContent: ${content.textContent}`)
        if(operator == subtract && content.textContent == '0'){
            content.textContent = subtract.textContent;
            valueOne += subtract.textContent;
        }

        else if(operator == subtract && content.textContent.slice(-1) == ' '){
            content.textContent += subtract.textContent;
            valueTwo += subtract.textContent;
        }

        else if((content.textContent != '') && (content.textContent.slice(-2,-1) != '+') &&
        (content.textContent.slice(-2,-1) != '-' || content.textContent.slice(1) != '-') &&
        (content.textContent.slice(-2,-1) != '*') &&
        (content.textContent.slice(-2,-1) != '/')){
            inputNumbers = true;
            //inputValueOne = !inputValueOne;
            operatorOrder.push(operator.textContent)
            valueThree = operate(valueOne, valueTwo, valueThree, operatorOrder);
            outputValue.textContent = valueThree;
            content.textContent = valueThree;
            content.textContent += ` ${operator.textContent} `;
            console.log(content.textContent);
            valueOne = valueThree;
            valueTwo = '';
            
            console.log(`from OPERATOR click, inputValueOne should be false: ${inputValueOne}, valueOne: ${valueOne}`);
            console.log(`from OPERATOR click, inputValueOne should be false: ${inputValueOne}, valueTwo: ${valueTwo}`);
            console.log(`ValueThree: ${valueThree}`);
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
    afterEquals = true;
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

    value3 = value3.toFixed(3);
    console.log(value3);
    value3 = Number(value3);
    return value3;
}

//bug, if no value is created if no operations are done before clicking equals because no values have been entered into the values stack
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

    value3 = value3.toFixed(3);
    console.log(value3);
    value3 = Number(value3);
    return value3;
    
}



