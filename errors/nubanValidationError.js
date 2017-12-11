function NubanValidationError(message) {
    this.name = 'NubanValidationError';
    this.message = message;
    this.stack = (new Error()).stack;
}
NubanValidationError.prototype = new Error;

module.exports = NubanValidationError;