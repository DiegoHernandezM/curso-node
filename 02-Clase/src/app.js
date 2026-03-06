const {emailTemplate} = require('./js-foundation/01-template');
const {getNamesById} = require('./js-foundation/03-callbacks');
//console.log(emailTemplate);
const id = 3;
getNamesById(id, function(error, user) {
    if (error) {
        throw new Error('USER  NOT FOUND WITH ID ', id);
    }
    console.log(user);
});



