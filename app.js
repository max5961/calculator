let oneOperand = '';
let twoOperand = '';
let threeOperand = '';



inputNumbers = true;
content = document.getElementById('console');

//numbers and parentheses
one = document.getElementById('one');
two = document.getElementById('two');
three = document.getElementById('three');
four = document.getElementById('four');
five = document.getElementById('five');
six = document.getElementById('six');
seven = document.getElementById('seven');
eight = document.getElementById('eight');
nine = document.getElementById('nine');
zero = document.getElementById('zero');
leftP = document.getElementById('leftP');
rightP = document.getElementById('rightP');
decimalPoint = document.getElementById('decimalPoint');

//operators
divide = document.getElementById('divide');
multiply = document.getElementById('multiply');
subtract = document.getElementById('subtract');
add = document.getElementById('add');
modulo = document.getElementById('modulo');

//equals
equals = document.getElementById('equals');
equals.addEventListener('click', () => {
    content.textContent = eval(content.textContent);
    inputNumbers = false;

})

clear = document.getElementById('clear');

numberButtons = [one, two, three, four, five, six, seven, eight, nine, zero, rightP, leftP, decimalPoint];
numberButtons.forEach(number => {
    console.log(number);
    number.addEventListener('click', () => {
        if(content.textContent.length < 15 && inputNumbers){
            content.textContent += number.textContent;
        }
    })
})

operators = [add, divide, multiply, subtract, modulo]

operators.forEach(operator => {
    operator.addEventListener('click', () => {
        if(content.textContent != ''){
            content.textContent += ` ${operator.textContent} `;
        inputNumbers = true;
        }
    })
})


function clearScreen(){
    content.textContent = '';
    inputNumbers = true;
}

clear.addEventListener('click', clearScreen);



