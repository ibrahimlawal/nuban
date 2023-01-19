class NubanValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = 'NubanValidationError';
    }
}

module.exports = NubanValidationError;