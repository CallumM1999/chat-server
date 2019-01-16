const validator = require('validator');

const validateNewUser = (email, password, fname, lname) => {
    const errors = [];

    if (!validator.isEmail(email)) errors.push('Invalid email')
    if (validator.trim(password).length < 8 || validator.trim(password).length > 100) errors.push('Password length invalid');
    else if (!validator.isAscii(password)) errors.push('Password not ascii')

    if (validator.trim(fname).length > 30) errors.push('Fname longer than 30 characters')
    else if (!validator.isAscii(fname)) errors.push('Fname is not ascii')

    if (validator.trim(lname).length > 30) errors.push('Lname longer than 30 characters')
    else if (!validator.isAscii(lname)) errors.push('Lname is not ascii')

    if (errors.length) console.log('errors', errors);
    return errors.length === 0;
};

module.exports = validateNewUser;