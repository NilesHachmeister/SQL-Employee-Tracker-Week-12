const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');

function EditDb() { }
let departmentArr = []


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




db.query('SELECT department_name FROM departments', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const element = results[index];
        let pushedEl = results[index].department_name;
        departmentArr.push(pushedEl)
    }
});

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
            let selectedDepartmentId;

            db.query('SELECT id FROM departments WHERE department_name = ?', selectedDepartment, function (err, results) {
                selectedDepartmentId = results[0].id
            }).then(


// figure this out

                db.query(`INSERT INTO roles (role_title, role_salary, department_id)
                VALUES (?, ?, ?)`, newDepartment, (err, result) => {
                    console.log(`Added ${newDepartment} to the database`);
                })


            )




            console.log(`Added ${newRole} to the database`);
        });
}


EditDb.prototype.addEmployee = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'decideFunction',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
            },
        ])
        .then((data) => {

            const newResponse = new responseToUser;

            if (data.decideFunction === "View all departments") {
                newResponse.viewDepartments();
            }
        });
}


EditDb.prototype.updateEmployeeRole = function () {
    inquirer
        .prompt([
            {
                type: 'list',
                message: "What would you like to do?",
                name: 'decideFunction',
                choices: ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]
            },
        ])
        .then((data) => {

            const newResponse = new responseToUser;

            if (data.decideFunction === "View all departments") {
                newResponse.viewDepartments();
            }
        });
}



module.exports = EditDb;