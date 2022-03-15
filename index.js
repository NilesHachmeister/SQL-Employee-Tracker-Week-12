const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');




// const db = mysql.createConnection(
//     {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'classlist_db'
//     },
//     console.log(`Connected to the classlist_db database.`)
// );

// db.query('SELECT * FROM students', function (err, results) {
//     console.log(results);
// });