const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');


function RemoveDb() { }
let departmentArr = []
let roleArr = []
let employeeArr = []


const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'S$U%Ry2AT%9To8A29hro6h4cWr',
        database: 'hr_db'
    },
);




db.query('SELECT department_name FROM departments', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const departmentName = results[index].department_name;
        departmentArr.push(departmentName)
    }
});

db.query('SELECT role_title FROM roles', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const roleName = results[index].role_title;
        roleArr.push(roleName)
    }
});

db.query('SELECT CONCAT(employees.employee_first_name, " ", employees.employee_last_name) AS employee_name FROM employees', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const employeeName = results[index].employee_name;
        employeeArr.push(employeeName)
    }
});




RemoveDb.prototype.removeDepartment = function () {
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
            db.query(`DELETE FROM departments WHERE department_name = ?`, selectedDepartment, (err, result) => {
                console.log(`${selectedDepartment} has been removed from the database`);
            })
        });
}



RemoveDb.prototype.removeRole = function () {
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
            db.query(`DELETE FROM roles WHERE role_title = ?`, selectedRole, (err, result) => {
                console.log(`${selectedRole} has been removed from the database`);
            })
        });
}

RemoveDb.prototype.removeEmployee = function () {
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
            db.query(`DELETE FROM employees WHERE CONCAT(employee_first_name, " ", employee_last_name) = ?`, selectedEmployee, (err, result) => {
                console.log(`${selectedEmployee} has been removed from the database`);
            })
        });
}



module.exports = RemoveDb;