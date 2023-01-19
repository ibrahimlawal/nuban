# nuban [![Build Status](https://travis-ci.org/ibrahimlawal/nuban.png?branch=master)](https://travis-ci.org/ibrahimlawal/nuban)

Helper library when working with nuban accounts

## Installation

This is a [Node.js](https://nodejs.org/) module available through the
[npm registry](https://www.npmjs.com/). It can be installed using the
[`npm`](https://docs.npmjs.com/getting-started/installing-npm-packages-locally)
or
[`yarn`](https://yarnpkg.com/en/)
command line tools.

```sh
npm install nuban --save
```

## Usage
The module exposes 2 functions. Samples and an explanation follows:
### Validate a nuban account number against a bank's code

Use the library's `validate` function to confirm that the account number is valid for the bank. Format is:

```javascript
    nuban.validate(accountNumber, bankCode);
```


```javascript
    const valid = nuban.validate("0123456789","011");
```

### Calculate check digit

Use the library's `calculateCheckDigit` function to get the check digit for a nuban account's first 9 digits.
Format is:

```javascript
    nuban.calculateCheckDigit(first9, bankCode);
```


Note that this function throws a `NubanValidationError` if either the first9 or bank code are invalid according to a
regex check so it should be called in a try block.

```javascript
    let checkDigit = null;
    try {
        checkDigit = nuban.calculateCheckDigit("012345678","011");
    } catch(err){
        console.error(err);
    }
```


## Tests

```sh
npm install
npm test
```
```

> nuban@1.0.6 test /Users/i/plop/nuban
> node test.js
ok

```

## Dependencies

None

## Dev Dependencies

None

## License

MIT
