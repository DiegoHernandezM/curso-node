const {emailTemplate} = require('./js-foundation/01-template');
const {getNamesById} = require('./js-foundation/03-callbacks');
require('./js-foundation/05-factory');
const {getAge, getId} = require('./plugins');

//console.log(emailTemplate);
const id = 2;
getNamesById(id, function(error, user) {
    if (error) {
        throw new Error('USER  NOT FOUND WITH ID ', id);
    }
    //console.log(user);
});

const {buildMakePerson} = require('./js-foundation/05-factory');
const makePerson = buildMakePerson({ getAge, getId });
const obj = {name: 'Diego', birthdate: '1992-07-20'};
const john = makePerson(obj);
console.log(john);



