const getAgePlugin = require('get-age')

const getAge = (birthdate) => {
    if (!birthdate) {
        throw new Error('BIRTHDATE IS REQUIRED');
    }
    return getAgePlugin(birthdate);
}

module.exports = {
    getAge,
};