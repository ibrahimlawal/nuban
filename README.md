# nuban
Helper library when working with nuban accounts

## Change log
1.0.3. Committed just the code

## Installation
```terminal
npm install nuban -save
```

## Usage

First require the library as always after installation.

```javascript
    var nuban = require('nuban');
```

### Validate a nuban account number against a bank's code

Use the library's `validate` function to confirm that the account number is valid for the bank. Format
is:

`nuban.validate(accountNumber, bankCode);`


```javascript
    var valid = nuban.validate("0123456789","011");
```

### Calculate check digit

Use the library's `calculateCheckDigit` function to get the check digit for a nuban account's first 9 digits.
Format is:

`nuban.calculateCheckDigit(first9, bankCode);`.


Note that this function throws a `NubanValidationError` if either the first9 or bank code are invalid according to a
regex check so it should be called in a try block.

```javascript
    var checkDigit = null;
    try {
        checkDigit = nuban.calculateCheckDigit("012345678","011");
    } catch(err){
        console.error(err);
    }
```
