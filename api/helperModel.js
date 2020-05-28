const db = require('../data/dbConfig');

module.exports = {
    getClassTypes
}

function getClassTypes(){
    return db('classTypes');
}