
// requiring mysql2 and inquirer
const mysql = require('mysql2');
const inquirer = require('inquirer');

const server = require('../server')
const mainMenue = new server;


// creating the constructor function so that the prototypes can be used in server.js
function EditDb() { }

// creates the arrays that will be populated with the information recieved from the database
let departmentArr = []
let roleArr = []
let employeeArr = []
let managerArr = []

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
        managerArr.push(employeeName)
    }
    managerArr.push({ name: "None", value: null });
});


// this prototype is used to add a department
EditDb.prototype.addDepartment = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the department?",
                name: 'department',
            },
        ])
        .then((data) => {
            const newDepartment = data.department;

            db.query(`INSERT INTO departments (department_name)
            VALUES (?)`, newDepartment, (err, result) => {
                console.log(`Added ${newDepartment} to the database`);
            })
        });
}

// this prototype is used to add a role
EditDb.prototype.addRole = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is the name of the role?",
                name: 'role',
            },
            {
                type: 'input',
                message: "What is the salary of the role?",
                name: 'salary',
            },
            {
                type: 'list',
                message: "Which department does the role belong to?",
                name: 'department',
                choices: departmentArr,
            },
        ])
        .then((data) => {

            const newRole = data.role
            const newSalary = data.salary
            const selectedDepartment = data.department

            const updateString = `INSERT INTO roles (role_title, role_salary, department_id) VALUES ("${newRole}", ${newSalary}, ${selectedDepartment});`

            db.query(updateString, (err, result) => {
                console.log(`Added ${newRole} to the database`);

                mainMenue.displayMenue()

            })
        });
}

//this prototype is used to add an employee 
EditDb.prototype.addEmployee = function () {
    inquirer
        .prompt([
            {
                type: 'input',
                message: "What is employee's first name?",
                name: 'first',
            },
            {
                type: 'input',
                message: "What is the employee's last name?",
                name: 'last',
            },
            {
                type: 'list',
                message: "What is the employee's role?",
                name: 'role',
                choices: roleArr,
            },
            {
                type: 'list',
                message: "Who is the employee's manager",
                name: 'manager',
                choices: managerArr,
            },

        ])
        .then((data) => {

            const firstName = data.first;
            const lastName = data.last;
            const selectedRole = data.role;
            const selectedManager = data.manager;

            const addEmployee = `INSERT INTO employees (employee_first_name, employee_last_name, employee_role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${selectedRole}, ${selectedManager})`

            db.query(addEmployee, (err, result) => {
                console.log(`Added ${firstName} ${lastName} to the database`)
            })
        });
};

// this prototype is used to update an employees role
EditDb.prototype.updateEmployeeRole = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee would you like to update?",
                name: 'employee',
                choices: employeeArr
            },
            {
                type: 'list',
                message: "What role would you like them to have?",
                name: 'role',
                choices: roleArr
            },
        ])
        .then((data) => {

            const employee = data.employee;
            const role = data.role;

            const updateStirng = `UPDATE employees SET employee_role_id = ${role} WHERE id = ${employee};`

            db.query(updateStirng, (err, result) => {
                console.log(`Role has been updated`);
            })
        });
}

// this prototype is used to update an employees manager
EditDb.prototype.updateEmployeeManager = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "Which employee would you like to update?",
                name: 'employee',
                choices: employeeArr
            },
            {
                type: 'list',
                message: "Who would you like to make their manager?",
                name: 'manager',
                choices: managerArr
            },
        ])
        .then((data) => {

            const employee = data.employee;
            const manager = data.manager;
            const updateStirng = `UPDATE employees SET manager_id = ${manager} WHERE id = ${employee};`

            db.query(updateStirng, (err, result) => {
                console.log(`Manager has been updated`);
            })
        });
}


// exports the prototypes
module.exports = EditDb;