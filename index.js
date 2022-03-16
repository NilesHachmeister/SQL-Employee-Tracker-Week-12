const inquirer = require('inquirer');
const fs = require('fs');
const mysql = require('mysql2');
const cTable = require('console.table');






const db = mysql.createConnection(
    {
      host: 'localhost',
      // MySQL username,
      user: 'root',
      // MySQL password created with a random password genorator
      password: 'S$U%Ry2AT%9To8A29hro6h4cWr',


    //   may change database name
      database: 'hr_db'
    },
    console.log(`Connected to the courses_db database.`)
  );
  
  // Hardcoded query: DELETE FROM course_names WHERE id = 3;



  db.query('SELECT * FROM departments', function (err, results) {
    console.log(results);
  });


//   db.query('SELECT * FROM roles', function (err, results) {
//     console.log(results);
//   });

//   db.query('SELECT * FROM employees', function (err, results) {
//     console.log(results);
//   });


  
//   db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });