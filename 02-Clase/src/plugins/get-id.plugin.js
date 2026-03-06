const {v4: uuidv4} = require('uuid');

const getId = () => {
    try {
        return uuidv4();
    } catch (error) {
        throw new Error('ERROR GENERATING ID');
    }
}

module.exports = {
    getId,
}