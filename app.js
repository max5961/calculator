let valueOne = '';
let valueTwo = '';
let valueThree = null;
console.log(valueOne != valueThree);
operatorOrder = [];
let count = 0;
let equationStack = [];


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

//hidden divide by zero error message
const errorMessage = document.getElementById('zeroDivide');

const log = document.querySelector('.logContainer');

const clearLog = document.querySelector('.clearLog');
clearLog.addEventListener('click', () => {
    while(log.firstChild){
        log.removeChild(log.firstChild);
    }
    equationStack = [];
})

function clearResults(){
    valueOne = '';
    valueTwo = '';
    valueThree = null;
    operatorOrder = [];
    content.textContent = '0';
    inputNumbers = true;
    errorMessage.style.visibility = 'hidden';
}

clear.addEventListener('click', clearResults);



numberButtons = [one, two, three, four, five, six, seven, eight, nine, zero];
numberButtons.forEach(number => {
    console.log(number);
    number.addEventListener('click', () => {
        //check if last operator input is '/' and zero button is pressed
        //OR
        //check if last operator input is '/' and minus sign is inputted before the zero
        if((content.textContent.slice(-2,-1) == '/' && number == zero) || (number == zero && content.textContent.slice(-3,-2) == '/' && content.textContent.slice(-1) == '-')){
            errorMessage.style.visibility = 'visible';
        } else {
            errorMessage.style.visibility = 'hidden';
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
        }
        })
    })


decimalPoint.addEventListener('click', () => {
    if((content.textContent == '0' || content.textContent == '') && inputNumbers && valueOne != valueThree){
        content.textContent = '0.';
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

function backTick(test){
    if(test == ''){
        return test;
    }

    else{
        let array = test.split(' ');
        let length = array.length;

        if(length == 3 && array[2] != ''){
            let finalString = '';
            endArray = array[2];
            endArray = endArray.toString();
            endArray = endArray.split("");
            endArray.pop();
            endArray.forEach(char => {
                finalString += char;
            })

            string = array[0] + ` ${array[1]} ` + finalString;

            valueTwo = finalString;

            return string;
        }
        
        else if(length == 3 && array[2] == ''){
            array.pop();
            array.pop();
            finalString = ''
            array.forEach(char => {
                finalString += char;
            })

            operatorOrder.pop();

            return finalString;
        }

        else if (length == 1 && array[0] != ''){
            array = array.toString();
            array = array.split("");
            array.pop();
            finalString = '';
            array.forEach(char => {
                finalString += char;
            })

            valueOne = finalString;

            return finalString;
        }
        }
    
}


backspace.addEventListener('click', () => {
    content.textContent = backTick(content.textContent);
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
        (content.textContent.slice(-2) != '- ' && content.textContent.slice(-1) != '-') &&
        (content.textContent.slice(-2,-1) != '*') &&
        (content.textContent.slice(-2,-1) != '/')){
            inputNumbers = true;
            //inputValueOne = !inputValueOne;
            operatorOrder.push(operator.textContent)
            valueThree = operate(valueOne, valueTwo, valueThree, operatorOrder);
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

function logEquations(){
    let equation = `${valueOne} ${operatorOrder[operatorOrder.length - 1]} ${valueTwo} = ${valueThree}`;
    equationStack.push(equation);
    if(equationStack.length >= 6){
        equationStack.shift();
    }

    while(log.firstChild){
        log.removeChild(log.firstChild);
    }

    equationStack.forEach(el => {
        let logEquation = document.createElement("div");
        logEquation.textContent = el;
        logEquation.style.margin = '5px'
        log.insertAdjacentElement('beforeend', logEquation);
    })
}

equals.addEventListener('click', () => {
    if(valueTwo != '' && valueTwo != '-'){
        valueThree = finalOperate(valueOne, valueTwo, valueThree, operatorOrder);
        content.textContent = valueThree;
        logEquations();
        operatorOrder = [];
        valueOne = valueThree;
        valueTwo = '';
        inputNumbers = false;
        afterEquals = true;
    }
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

        value3 = value3.toFixed(3);
        console.log(value3);
        value3 = Number(value3);

        logEquations();
    }

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



