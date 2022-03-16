const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');


function EditDb() { }


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

EditDb.prototype.addDepartment = function () {
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


EditDb.prototype.addRole = function () {
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