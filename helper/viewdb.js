const fs = require('fs')

const mysql = require('mysql2');
const cTable = require('console.table');


function ViewDb() { }


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
ViewDb.prototype.viewDepartments = function () {
  db.query('SELECT * FROM departments', function (err, results) {
    console.table(results)
  });
}


ViewDb.prototype.viewRoles = function () {
  db.query('SELECT roles.id, roles.role_title `Title`, roles.role_salary `Salary`, departments.department_name `Department` FROM roles JOIN departments ON roles.department_id = departments.id ', function (err, results) {
    console.table(results);
  });
}

// fix it to spit out just what is needed
ViewDb.prototype.viewEmployees = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, r.role_title `Title`, d.department_name `Department`, r.role_salary `Salary`, CONCAT(m.employee_first_name, " ", m.employee_last_name) `manager` FROM employees e LEFT JOIN employees m ON e.manager_id = m.id LEFT JOIN roles r ON e.employee_role_id = r.id LEFT JOIN departments d ON r.department_id = d.id', function (err, results) {
    console.table(results);
  });
}


ViewDb.prototype.viewByDepartment = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, r.role_title `Title`, d.department_name `Department`, r.role_salary `Salary`, m.employee_first_name `manager` FROM employees e JOIN employees m ON e.manager_id = m.id JOIN roles r ON e.employee_role_id = r.id JOIN departments d ON r.department_id = d.id ORDER BY d.department_name DESC', function (err, results) {
    console.table(results);
  });
}


ViewDb.prototype.viewByManager = function () {
  db.query('SELECT e.id, e.employee_first_name `First Name`, e.employee_last_name `Last Name`, r.role_title `Title`, d.department_name `Department`, r.role_salary `Salary`, m.employee_first_name `manager` FROM employees e JOIN employees m ON e.manager_id = m.id JOIN roles r ON e.employee_role_id = r.id JOIN departments d ON r.department_id = d.id ORDER BY m.employee_first_name DESC', function (err, results) {
    console.table(results);
  });
}





ViewDb.prototype.viewBudget = function () {

  db.query('SELECT SUM(role_salary) AS `Budget by department` FROM roles GROUP BY department_id', function (err, results) {
    console.table(results);
  });


}


// 'SELECT COUNT(id) AS total_count_Instock FROM favorite_books GROUP BY in_stock'



module.exports = ViewDb;