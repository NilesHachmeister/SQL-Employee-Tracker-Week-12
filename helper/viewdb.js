const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');


function ViewDb() { }


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




// this prototype is built do spit out the html file
ViewDb.prototype.viewDepartments = function () {
  db.query('SELECT * FROM departments', function (err, results) {
    console.table(results)
  });
}


ViewDb.prototype.viewRoles = function () {
  db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id ', function (err, results) {
    console.table(results);
  });
}

// fix it to spit out just what is needed
ViewDb.prototype.viewEmployees = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, e.employee_role_id, e.manager_id, r.role_title, r.role_salary, d.department_name FROM employees e JOIN roles r ON e.employee_role_id = r.id JOIN departments d ON r.department_id = d.id', function (err, results) {
    console.table(results);
  });
}









module.exports = ViewDb;