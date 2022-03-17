const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');
const inquirer = require('inquirer');
const { resolveObjectURL } = require('buffer');


function EditDb() { }
let departmentArr = []
let roleArr = []
let employeeArr = []
let managerArr = []


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
        const departmentName = results[index].department_name;
        departmentArr.push(departmentName)
    }
});

db.query('SELECT * FROM roles', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const roleName = { name: results[index].role_title, value: results[index].id };
        roleArr.push(roleName)
    }
    console.log("roleArr", roleArr)
});


db.query('SELECT CONCAT(employees.employee_first_name, " ", employees.employee_last_name) AS employee_name , id FROM employees', function (err, results) {
    for (let index = 0; index < results.length; index++) {
        const employeeName = { name: results[index].employee_name, value: results[index].id };
        employeeArr.push(employeeName)
        managerArr.push(employeeName)
    }
    managerArr.push({ name: "None", value: null });
    console.log(managerArr)
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

            db.promise().query('SELECT id FROM departments WHERE department_name = ?', selectedDepartment, function (err, results) {
                selectedDepartmentId = results[0].id
            }).then((selectedDepartmentId) => {

                const departmentId = selectedDepartmentId[0][0].id

                let updateString = `INSERT INTO roles (role_title, role_salary, department_id) VALUES ("${newRole}", ${newSalary}, ${departmentId});`
                db.query(updateString, (err, result) => {

                })
            });
            console.log(`Added ${newRole} to the database`);
        });
}




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

            console.log("insert ", data);
            const firstName = data.first;
            const lastName = data.last;
            const selectedRole = data.role;
            const selectedManager = data.manager;

            let roleid;

            const addEmployee = `INSERT INTO employees (employee_first_name, employee_last_name, employee_role_id, manager_id) VALUES ("${firstName}", "${lastName}", ${selectedRole}, ${selectedManager})`

            db.query(addEmployee, (err, result) => {
                console.log("Added employeee to db.")
            })



        });


};



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
            let roleIdNumber = 0;

            db.promise().query('SELECT id FROM roles WHERE roles.role_title = ?', role, function (err, results) {

                roleIdNumber = results[0].id;

            }).then((roleIdNumber) => {

                let roleId = roleIdNumber[0][0].id

                const updateStirng = `UPDATE employees SET employee_role_id = ${roleId} WHERE CONCAT(employees.employee_first_name, " ", employees.employee_last_name) = "${employee}";`

                db.query(updateStirng, (err, result) => {
                    console.log(`${employee} now has the role of ${role}`);
                })
            });
        });
}

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



            // figure out none situation...
            db.promise().query('SELECT id FROM roles WHERE CONCAT(employees.employee_first_name, " ", employees.employee_last_name) = ?', manager, function (err, results) {

                roleIdNumber = results[0].id;

            }).then((roleIdNumber) => {

                let roleId = roleIdNumber[0][0].id

                const updateStirng = `UPDATE employees SET employee_role_id = ${roleId} WHERE CONCAT(employees.employee_first_name, " ", employees.employee_last_name) = "${employee}";`

                db.query(updateStirng, (err, result) => {
                    console.log(`${employee} now has the role of ${role}`);
                })
            });
        });
}





module.exports = EditDb;