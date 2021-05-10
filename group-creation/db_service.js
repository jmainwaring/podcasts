const mysql = require('mysql2');

require('dotenv').config(); // Removes private keys from public code

module.exports = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.USERNAME, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, 
    port: process.env.DB_PORT, 
    namedPlaceholders: process.env.NAMEDPLACEHOLDERS 
});