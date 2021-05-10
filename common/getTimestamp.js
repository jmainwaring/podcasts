const moment = require('moment');

//  Function to return current timestamp
// const mysqlTimestamp = () => {
//     return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
// };

//  Function to return current timestamp
module.exports.mysqlTimestamp = () => {
    return moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
};