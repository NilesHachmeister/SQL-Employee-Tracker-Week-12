// requiring mysql2 and console.table
const mysql = require('mysql2');
const cTable = require('console.table');

// creating the constructor function so that the prototypes can be used in server.js
function ViewDb() { }

// connects to database
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: 'S$U%Ry2AT%9To8A29hro6h4cWr',
    database: 'hr_db'
  },
);


// when this prototype is called all of the departments are logged as a table
ViewDb.prototype.viewDepartments = function () {
  db.query('SELECT * FROM departments', function (err, results) {
    console.table(results)
    displayMenue()
  });
}

// when this prototype is called all of the roles are logged as a table
ViewDb.prototype.viewRoles = function () {
  db.query('SELECT roles.id, roles.role_title `Title`, roles.role_salary `Salary`, departments.department_name `Department` FROM roles LEFT JOIN departments ON roles.department_id = departments.id ', function (err, results) {
    console.table(results);
    displayMenue()
  });
}

// when this prototype is called all of the employees are logged as a table
ViewDb.prototype.viewEmployees = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, r.role_title `Title`, d.department_name `Department`, r.role_salary `Salary`, CONCAT(m.employee_first_name, " ", m.employee_last_name) `manager` FROM employees e LEFT JOIN employees m ON e.manager_id = m.id LEFT JOIN roles r ON e.employee_role_id = r.id LEFT JOIN departments d ON r.department_id = d.id', function (err, results) {
    console.table(results);
    displayMenue()
  });
}

// when this prototype is called all of the employees are logged as a table orderd by department
ViewDb.prototype.viewByDepartment = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, r.role_title `Title`, d.department_name `Department`, r.role_salary `Salary`, m.employee_first_name `manager` FROM employees e LEFT JOIN employees m ON e.manager_id = m.id LEFT JOIN roles r ON e.employee_role_id = r.id LEFT JOIN departments d ON r.department_id = d.id ORDER BY d.department_name DESC', function (err, results) {
    console.table(results);
    displayMenue()
  });
}

// when this prototype is called all of the employees are logged as a table orderd by manager
ViewDb.prototype.viewByManager = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, r.role_title `Title`, d.department_name `Department`, r.role_salary `Salary`, m.employee_first_name `manager` FROM employees e LEFT JOIN employees m ON e.manager_id = m.id LEFT JOIN roles r ON e.employee_role_id = r.id LEFT JOIN departments d ON r.department_id = d.id ORDER BY m.employee_first_name DESC', function (err, results) {
    console.table(results);
    displayMenue()
  });
}

// when this prototype is called the sum of each departments budgets is displayed as a table
ViewDb.prototype.viewBudget = function () {

  db.query('SELECT d.department_name, SUM(r.role_salary) AS `Budget by department` FROM employees e LEFT JOIN employees m ON e.manager_id = m.id LEFT JOIN roles r ON e.employee_role_id = r.id LEFT JOIN departments d ON r.department_id = d.id GROUP BY department_id', function (err, results) {
    console.table(results);
    displayMenue()
  });
}

// exports the prototypes
module.exports = ViewDb;