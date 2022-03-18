// requiring mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

// creating the constructor function se that the prototypes can be used in server.js
function RemoveDb() { }

// creates the arrays that will be populated with the information recieved from the database
let departmentArr = []
let roleArr = []
let employeeArr = []


// connects to database
const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'S$U%Ry2AT%9To8A29hro6h4cWr',
        database: 'hr_db'
    },
);

// populates the departmentArr with all of the departments in the database
db.query('SELECT * FROM departments', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const departmentName = { name: results[index].department_name, value: results[index].id };
        departmentArr.push(departmentName)
    }
});

// populates the rolesArr with all of the roles the database
db.query('SELECT * FROM roles', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const roleName = { name: results[index].role_title, value: results[index].id };
        roleArr.push(roleName)
    }
});

// populates the employeeArr and managerArr with all of the roles the database
db.query('SELECT CONCAT(employees.employee_first_name, " ", employees.employee_last_name) AS employee_name , id FROM employees', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const employeeName = { name: results[index].employee_name, value: results[index].id };
        employeeArr.push(employeeName)
    }
});

// this prototype removes departments from the database
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
            db.query(`DELETE FROM departments WHERE id = ?`, selectedDepartment, (err, result) => {
                console.log(`department has been removed from the database`);
            })
        });
}

// this prototype removes a role from the database
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
            db.query(`DELETE FROM roles WHERE id = ?`, selectedRole, (err, result) => {
                console.log(`role has been removed from the database`);
            })
        });
}

// this prototype removes an employee from the database
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
            db.query(`DELETE FROM employees WHERE id = ?`, selectedEmployee, (err, result) => {
                console.log(`employee has been removed from the database`);
            })
        });
}

// exports the prototypes
module.exports = RemoveDb;