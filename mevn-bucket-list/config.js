const uri = require('./.dbCred');

module.exports = {
    mongoUri: uri,
    PORT: process.env.PORT || 9000
}