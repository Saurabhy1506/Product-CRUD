const mysql = require('mysql');
var  mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'',
    database:'product_catalog'
})

module.exports = mysqlConnection;