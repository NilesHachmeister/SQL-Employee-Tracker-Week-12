// requiring things used in this file
const inquirer = require('inquirer');
const express = require('express');
const viewDb = require('./helper/viewdb')
const editDb = require('./helper/editdb')
const removeDb = require('./helper/removedb');
const mysql = require('mysql2');

// declaring the port and app variable
const PORT = process.env.PORT || 3001;
const app = express();

// using middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());


// creates the arrays that will be populated with the information recieved from the database
let departmentArr = []
let roleArr = []
let employeeArr = []
let managerArr = []


// this function builds the arrays for all of the employees, roles, departments, and managers
function buildArrays() {

  // this clears all of the arrays first
  departmentArr = []
  roleArr = []
  employeeArr = []
  managerArr = []

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
  })

}


// connects to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'S$U%Ry2AT%9To8A29hro6h4cWr',
    database: 'hr_db'
  },
);


// this is the main menue prompt for the user
displayMenue = async function () {
  await buildArrays()

  inquirer
    .prompt([
      {
        type: 'list',
        message: "What would you like to do?",
        name: 'decideFunction',
        choices: ["View all employees", "View employees by department", "View all employees by manager", "Add an employee", "Remove employee", "Update employee role", "Update employee manager", "View all roles", "Add a role", "Remove role", "View all departments", "Add a department", "Remove department", "View total utilized budget by department", "Quit"]
      },
    ])
    .then((data) => {

      // creating the class inorder to use the prototypes
      const newResponse = new viewDb;
      const newEdit = new editDb;
      const newRemove = new removeDb;

      // a switch statement used to do what the user wanted
      switch (data.decideFunction) {
        case "View all departments":
          newResponse.viewDepartments()
          break;
        case "View all roles":
          newResponse.viewRoles();
          break;
        case "View all employees":
          newResponse.viewEmployees();
          break;
        case "Add a department":
          newEdit.addDepartment();
          break;
        case "Add a role":
          newEdit.addRole(departmentArr)
          break;
        case "Add an employee":
          newEdit.addEmployee(roleArr, managerArr);
          break;
        case "View employees by department":
          newResponse.viewByDepartment();
          break;
        case "View all employees by manager":
          newResponse.viewByManager();
          break;
        case "Remove employee":
          newRemove.removeEmployee(employeeArr);
          break;
        case "Update employee role":
          newEdit.updateEmployeeRole(employeeArr, roleArr);
          break;
        case "Update employee manager":
          newEdit.updateEmployeeManager(employeeArr, managerArr);
          break;
        case "Remove role":
          newRemove.removeRole(roleArr);
          break;
        case "Remove department":
          newRemove.removeDepartment(departmentArr);
          break;
        case "View total utilized budget by department":
          newResponse.viewBudget();
          break;
        case "Quit":
          console.log("Goodbye");
          process.exit(0)
          break;
        default:
          break;
      }
    });
}


// starts the main menue
displayMenue()

// creates the arrays from the database
buildArrays()

// listening on the port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// exports the displayMenue
module.exports = displayMenue;