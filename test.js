var nuban = require('./index');

const { validateAccountNumber } = require("./index");



var shouldnotbevalid = validateAccountNumber("0123456789","011");
var shouldbevalid = nuban.validate("0123456784","011");


var checkDigit = null;
var err1 = null;
try {
    checkDigit = nuban.calculateCheckDigit("012345678","011");
} catch(err){
    err1 = err;
}

var invalidCheckDigit = null;
var err2 = null;
try {
    invalidCheckDigit = nuban.calculateCheckDigit("01234567","011");
} catch(err){
    err2 = err;
}

if(shouldnotbevalid !== false){
    console.log("Test for invalid nuban failed");
    process.exit(1);
}

if(shouldbevalid !== true){
    console.log("Test for valid nuban failed");
    process.exit(1);
}

if(err1 !== null){
    console.log("Test for valid calculateCheckDigit parameters failed");
    console.error(err1);
    process.exit(1);
}

if(checkDigit !== 4){
    console.log("Test for calculateCheckDigit failed");
    process.exit(1);
}

if(invalidCheckDigit !== null){
    console.log("We should not have gotten a response for invalid calculateCheckDigit parameters");
    process.exit(1);
}

if(err2 === null){
    console.log("Test for invalid calculateCheckDigit parameters failed");
    process.exit(1);
}

console.log("ok");