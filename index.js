'use strict';

/**
 * @module nuban
 * @description A module for validating Nigerian NUBAN account numbers
 * @version 1.0.6
 * @license MIT
 * @author @ibrahimlawal
 */

const MULTIPLIERS = [3, 7, 3, 3, 7, 3, 3, 7, 3, 3, 7, 3];
const NubanValidationError = require('./errors/nubanValidationError');

/**
 * Validates a bank code
 *
 * @param {string} bankCode
 * @returns {boolean}
 */
function isValidBankCode(bankCode) {
    return /^[0-9]{3}$/.test(String(bankCode));
};

/**
 * Validates an account number
 *
 * @param {string} accountNumber
 * @returns {boolean}
 */
function isValidAccountNumber(accountNumber) {
    return /^[0-9]{10}$/.test(`${accountNumber}`);
};

/**
 * Validates the first 9 digits of an account number
 *
 * @param {string} first9
 * @returns {boolean}
 */
function isValidFirst9DigitsOfAccountNumber(first9) {
    return /^[0-9]{9}$/.test(`${first9}`);
};

/**
 * Calculates the NUBAN check digit for a given string
 *
 * @param {string} str
 * @returns {number}
 */
function calculateCheckDigitFor(str) {
    let sum = 0;

    for (let i = 0; i < str.length; i += 1) {
        sum += (parseInt(str.charAt(i), 10) * MULTIPLIERS[i]);
    }
    return (sum % 10) ? (10 - (sum % 10)) : 0;
}

/**
 * Confirms that the check digit of a NUBAN account number is valid for a bank code
 *
 * @param {string} accountNumber
 * @param {string} bankCode
 * @returns {boolean}
 */
function checkCheckDigit(accountNumber, bankCode) {
    const checkDigit = parseInt(accountNumber.charAt(9), 10);
    const calculatedCheckDigit = calculateCheckDigitFor((bankCode + accountNumber).slice(0, 12));
    return checkDigit === calculatedCheckDigit;
}

/**
 * Validates a NUBAN account number as being valid for a bank code
 *
 * @param {string} accountNumber
 * @param {string} bankCode
 * @returns {boolean}
 */
function validateAccountNumber(accountNumber, bankCode) {
    return isValidAccountNumber(accountNumber) && isValidBankCode(bankCode) && checkCheckDigit(`${accountNumber}`, String(bankCode));
};

/**
 * Calculates the check digit for the first 9 digits of a NUBAN account number
 * and a bank code
 *
 * @throws {NubanValidationError} if the first 9 digits or bank code are invalid
 * @param {string} first9
 * @param {string} bankCode
 * @returns {number}
 */
function calculateCheckDigit(first9, bankCode) {
    if (!isValidFirst9DigitsOfAccountNumber(first9)) {
        throw new NubanValidationError(`${String(first9)} is not a valid first 9 digits`);
    }
    if (!isValidBankCode(bankCode)) {
        throw new NubanValidationError(`${String(bankCode)} is not a valid bank code`);
    }
    return calculateCheckDigitFor(String(bankCode) + first9);
};

const nuban = {
    calculateCheckDigit,
    isValidBankCode,
    isValidAccountNumber,
    validateAccountNumber,
    validateBankCode: isValidBankCode,
    validate: validateAccountNumber,
};

module.exports = nuban;
