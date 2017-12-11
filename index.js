var NubanValidationError = require('./errors/nubanValidationError');

module.exports = {
    validateBankCode: function(bankCode){
        return /^[0-9]{3}$/.test(''+bankCode);
    },
    regexValidAccount: function(accountNumber){
        return /^[0-9]{10}$/.test(''+accountNumber);
    },
    regexValidFirst9: function(accountNumber){
        return /^[0-9]{9}$/.test(''+accountNumber);
    },
    validateAccountNumber: function(accountNumber, bankCode){
        return this.regexValidAccount(accountNumber) && this.validateBankCode(bankCode) && checkCheckDigit(''+accountNumber,''+bankCode);
    },
    validate: function(accountNumber, bankCode){
        return this.validateAccountNumber(accountNumber, bankCode);
    },
    calculateCheckDigit: function(first9, bankCode){
        if(!this.regexValidFirst9(first9)){
            throw new NubanValidationError('' + first9 + ' is not a valid first 9 digits');
        }
        if(!this.validateBankCode(bankCode)){
            throw new NubanValidationError('' + bankCode + ' is not a valid bank code');
        }
        return calculateCheckDigitFor('' + bankCode + first9);
    }
};

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
