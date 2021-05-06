const mysql = require('mysql2');

require('dotenv').config(); // Removes private keys from public code


// const connection = mysql.createConnection({
//     host: process.env.HOST, 
//     user: process.env.USERNAME, 
//     password: process.env.PASSWORD, 
//     database: process.env.DATABASE, 
//     port: process.env.DB_PORT, 
// });

module.exports = mysql.createConnection({
    host: process.env.HOST, 
    user: process.env.USERNAME, 
    password: process.env.PASSWORD, 
    database: process.env.DATABASE, 
    port: process.env.DB_PORT, 
    namedPlaceholders: process.env.NAMEDPLACEHOLDERS 
});



// // create connection or print error if it fails
// connection.connect((err) => {
//     if (err) {
//         console.log(err);
//     }
//     // console.log('db ' + connection);
// });

