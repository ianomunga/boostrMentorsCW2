const bcrypt = require('bcrypt');

const utils = {
    // Hashing a password
    hashPassword: function(password, callback) {
        bcrypt.hash(password, 10, callback);
    },

    // Verifying a password
    verifyPassword: function(password, hash, callback) {
        bcrypt.compare(password, hash, callback);
    },

    // Validating a password
    validatePassword: function(password) {
        const errors = [];

        if (password.length < 6) {
            errors.push('Password must be at least 6 characters long.');
        }
        if (!password.match(/\d/) || !password.match(/[a-zA-Z]/)) {
            errors.push('Password must contain at least one letter and one number.');
        }

        return {
            isValid: errors.length === 0,
            errors,
        };
    },
};

module.exports = utils;
