const db = require('../database/dbConfig.js');

module.exports = {
    addUser,
    findByUsername
};

function addUser(user) {
    return db('users').insert(user)
};

function findByUsername(username) {
    return db('users').where({ username }).first()
}

