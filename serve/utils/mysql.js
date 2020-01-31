const mysql = require('mysql');

const connection = mysql.createConnection({
    host:"localhost",
    user:"zer0",
    password:'yishengyouni14',
    database:'gb'
});

connection.connect();

module.exports = connection;