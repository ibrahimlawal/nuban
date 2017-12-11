module.exports = {
    validateBankCode: function(bankCode){
        return /^[0-9]{3}$/.test(''+bankCode);
    },
    regexValidAccount: function(accountNumber){
        return /^[0-9]{10}$/.test(''+accountNumber);
    },
    validateAccountNumber: function(accountNumber, bankCode){
        return this.regexValidAccount(accountNumber) && this.validateBankCode(bankCode) && checkCheckDigit(''+accountNumber,''+bankCode);
    }
};

function checkCheckDigit(accountNumber, bankCode){
    var checkDigit = parseInt(accountNumber.charAt(9));
    var calculatedCheckDigit = calculateCheckDigit((bankCode + accountNumber).slice(0,12));
    return checkDigit === calculatedCheckDigit;
}

function calculateCheckDigit(s){
    var sum = 0,
        multipliers = [3,7,3,3,7,3,3,7,3,3,7,3];
    for (var i = 0; i < s.length; i++) {
        sum += (parseInt(s.charAt(i)) * multipliers[i]);
    }
    return (sum % 10) ? (10 - (sum % 10)) : 0;
}
