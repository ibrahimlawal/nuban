var NubanValidationError = require('./errors/nubanValidationError');

const validateBankCode = function(bankCode){
    return /^[0-9]{3}$/.test(''+bankCode);
};
const regexValidAccount = function(accountNumber){
    return /^[0-9]{10}$/.test(''+accountNumber);
};
const regexValidFirst9 = function(accountNumber){
    return /^[0-9]{9}$/.test(''+accountNumber);
};
const validateAccountNumber = function(accountNumber, bankCode){
    return regexValidAccount(accountNumber) && validateBankCode(bankCode) && checkCheckDigit(''+accountNumber,''+bankCode);
};
const validate = function(accountNumber, bankCode){
    return functions.validateAccountNumber(accountNumber, bankCode);
};
const calculateCheckDigit = function(first9, bankCode){
    if(!regexValidFirst9(first9)){
        throw new NubanValidationError('' + first9 + ' is not a valid first 9 digits');
    }
    if(!validateBankCode(bankCode)){
        throw new NubanValidationError('' + bankCode + ' is not a valid bank code');
    }
    return calculateCheckDigitFor('' + bankCode + first9);
};
functions = {
    validateBankCode: validateBankCode,
    calculateCheckDigit: calculateCheckDigit,
    validate: validate,
    validateAccountNumber: validateAccountNumber,
};

module.exports = functions;

function checkCheckDigit(accountNumber, bankCode){
    var checkDigit = parseInt(accountNumber.charAt(9));
    var calculatedCheckDigit = calculateCheckDigitFor((bankCode + accountNumber).slice(0,12));
    return checkDigit === calculatedCheckDigit;
}

function calculateCheckDigitFor(s){
    var sum = 0,
        multipliers = [3,7,3,3,7,3,3,7,3,3,7,3];
    for (var i = 0; i < s.length; i++) {
        sum += (parseInt(s.charAt(i)) * multipliers[i]);
    }
    return (sum % 10) ? (10 - (sum % 10)) : 0;
}
