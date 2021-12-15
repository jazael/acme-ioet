const calculatorSchedulsWorking = require('./salarypayments');
const res = calculatorSchedulsWorking.calculatorSchedulsWorking('./data.txt');

console.log(res.join('\n'));