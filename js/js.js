const btnNum = document.getElementsByName('data-number'); //Accedemos a los botones numéricos
const btnOper = document.getElementsByName('data-opera'); //Accedemos a los botones operaciones
const btnParen = document.querySelector('.paren'); //Accedemos al botón parentesis
const same = document.querySelector('.same'); //Accedemos al botón igual
const del = document.querySelector('.delete'); //Accedemos al botón borrar
const del2 = document.querySelector('.delete2'); //Accedemos al botón borrar
const back = document.querySelector('.back'); //Accedemos al botón atrás
const point = document.querySelector('.point'); //Accedemos al botón punto
const neg = document.querySelector('.neg'); //Accedemos al botón cambio de signo
const display = document.querySelector('.display'); //Accedemos al display grande
const display2 = document.querySelector('.display2'); //Accedemos al display chico
let currentOp = '';
let previousOp = '';
let operation = undefined;

btnNum.forEach((button) => button.addEventListener('click', () => { //Captura e iteración Numeros
    addNum(button.textContent);
    let display2Arra = [];
    display2Arra = [...display2Arra, button.textContent];
    display2Arra.forEach(item => document.querySelector('.display2').innerHTML += item);
}));

btnOper.forEach((button) => button.addEventListener('click', () => { //Captura e iteración Operaciones
    if (currentOp == '') return;
    let display2Arra = [];
    display2Arra = [...display2Arra, button.textContent.fontcolor('blue')];
    display2Arra.forEach(item => document.querySelector('.display2').innerHTML += item);
    selectOperation(button.textContent);
    calculate();
}));

same.addEventListener('click', () => calculate()); // Boton Igual

del.addEventListener('click', () => display.value = '');  // Evento para borrar 

del2.addEventListener('click', () => { // Evento para borrar los dos displays  
    clear();
    displayOutput();
    display2.innerHTML = '';
    display2Arra = [];
});

neg.addEventListener('click', () => { // Cambio de signo
    currentOp = currentOp.toString();
    if (currentOp.includes('-')) {
        currentOp = currentOp.slice(1);
    } else {
        currentOp = '-' + currentOp;
    }
    displayOutput();
});

point.addEventListener('click', () => { //Agregamos el punto
    currentOp = currentOp.toString();
    previousOp = previousOp.toString();
    let display2Arra = [];
    if (currentOp.includes('.') || previousOp.includes('.') && previousOp == '') return;
    if (currentOp == '' && previousOp == '') {
        display.value = '0' + point.innerHTML;
    };
    currentOp += point.innerHTML;
    display2Arra = [...display2Arra, point.innerHTML];
    display2Arra.forEach(item => document.querySelector('.display2').innerHTML += item);
});

back.addEventListener('click', () => { //Evento atrás
    display.value = display.value.slice(0, -1);
    currentOp = display.value;
});

function addNum(num) { // Generamos el 1º valor de la operacion y la enviamos a la pantalla
    currentOp += num;
    displayOutput();
}

function selectOperation(op) { // Seleccionamos el signo de la op
    if (currentOp === '') return;
    if (previousOp !== '') {
        calculate();
    };
    operation = op;
    previousOp = currentOp;
    currentOp = '';
}

function clear() {
    currentOp = '';
    previousOp = '';
    operation = undefined;
}

function displayOutput() { //Impresion en pantalla 
    display.value = currentOp;
}

function calculate() { // Calculos 
    const previous = parseFloat(previousOp);
    const current = parseFloat(currentOp);

    if (isNaN(previous) || isNaN(current)) return;
    switch (operation) {
        case '+':
            results = previous + current;
            break;
        case '-':
            results = previous - current;
            break;
        case '×':
            results = previous * current;
            break;
        case '÷':
            results = previous / current;
            break;
        default:
            return;
    };

    if (Number.isInteger(results)) {
        currentOp = results;
    } else {
        currentOp = results.toFixed(10);
        currentOp = currentOp.replace(/0+$/, '');
    };
    operation = undefined;
    previousOp = '';
    displayOutput()
}

clear()