// const random = require("random");
const convertNumberToWordsRu = require('number-to-words-ru').convert

const divModule = require(`./numberGenerate`);
// const result = divModule.divisionNumbers(random.int(0, 100), random.int(0, 100));
const result = divModule.divisionNumbers(5, 8);
console.log(result);
console.log(convertNumberToWordsRu(result));