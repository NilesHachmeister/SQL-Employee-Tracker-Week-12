const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');


function Respond2User() { }


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
Respond2User.prototype.viewDepartments = function () {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results)
    });
}


Respond2User.prototype.viewRoles = function () {
    db.query('SELECT * FROM roles JOIN departments ON roles.department_id = departments.id ', function (err, results) {
        console.table(results);
    });
}


Respond2User.prototype.viewEmployees = function () {
    db.query('SELECT e.id, e.employee_first_name, e.employee_last_name, e.employee_role_id, e.manager_id, r.role_title, r.role_salary, d.department_name FROM employees e JOIN roles r ON e.employee_role_id = r.id JOIN departments d ON r.department_id = d.id', function (err, results) {
        console.table(results);
    });
}


Respond2User.prototype.addDepartment = function () {
    console.log("department added");
}


Respond2User.prototype.addRole = function () {
    console.log("role added");
}


Respond2User.prototype.addEmployee = function () {
    console.log("added employee");
}


Respond2User.prototype.updateEmployeeRole = function () {
    console.log("updating role");
}








module.exports = Respond2User;