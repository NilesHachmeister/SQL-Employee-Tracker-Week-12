// requiring displayMenue from the server, mysql2 and inquirer
const server = require('../server')
const mysql = require('mysql2');
const inquirer = require('inquirer');

// creating the constructor function se that the prototypes can be used in server.js
function RemoveDb() { }


// connects to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'S$U%Ry2AT%9To8A29hro6h4cWr',
        database: 'hr_db'
    },
);


// this prototype removes departments from the database
RemoveDb.prototype.removeDepartment = function (departmentArr) {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which department would you like to remove?",
                name: 'department',
                choices: departmentArr
            },
        ])
        .then((data) => {
            const selectedDepartment = data.department
            db.query(`DELETE FROM departments WHERE id = ?`, selectedDepartment, (err, result) => {
                console.log(`department has been removed from the database`);
                displayMenue()

            })
        });
}

// this prototype removes a role from the database
RemoveDb.prototype.removeRole = function (roleArr) {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which role would you like to remove?",
                name: 'role',
                choices: roleArr
            },
        ])
        .then((data) => {
            const selectedRole = data.role
            db.query(`DELETE FROM roles WHERE id = ?`, selectedRole, (err, result) => {
                console.log(`role has been removed from the database`);
                displayMenue()
            })
        });
}

// this prototype removes an employee from the database
RemoveDb.prototype.removeEmployee = function (employeeArr) {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee would you like to remove?",
                name: 'employee',
                choices: employeeArr
            },
        ])
        .then((data) => {
            const selectedEmployee = data.employee
            db.query(`DELETE FROM employees WHERE id = ?`, selectedEmployee, (err, result) => {
                console.log(`employee has been removed from the database`);
                displayMenue()
            })
        });
}



// exports the prototypes
module.exports = RemoveDb;