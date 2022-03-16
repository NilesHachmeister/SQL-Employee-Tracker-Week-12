const inquirer = require('inquirer');
const fs = require('fs');
const cTable = require('console.table');
const mysql = require('mysql2');
const express = require('express');
const responseToUser = require('./helper/respond2user')


const PORT = process.env.PORT || 3001;
const app = express();

const seedQuery = fs.readFileSync("./db/seeds.sql", { encoding: "utf-8", })




app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// figure out atuo seed
// inquirer asks questions
// eddit points on the table depending on what is going on



// const db = mysql.createConnection(
//   {
//     host: 'localhost',
//     // MySQL username,
//     user: 'root',
//     // MySQL password created with a random password genorator
//     password: 'S$U%Ry2AT%9To8A29hro6h4cWr',


//     //   may change database name
//     database: 'hr_db'
//   },
//   console.log(`Connected to the courses_db database.`)
// );






function initPromptUser() {
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
      } else if (data.decideFunction === "View all roles") {
        newResponse.viewRoles();
      } else if (data.decideFunction === "View all employees") {
        newResponse.viewEmployees();
      } else if (data.decideFunction === "Add a department") {
        newResponse.addDepartment();
      } else if (data.decideFunction === "Add a role") {
        newResponse.addRole();
      } else if (data.decideFunction === "Add an employee") {
        newResponse.addEmployee();
      } else {
        newResponse.updateEmployeeRole();
      }

    });
}



initPromptUser()


// db.query(seedQuery, function (err, results) {
//   console.log(err)
// });

// db.query('SOURCE ./db/seeds.sql', function (err, results) {
//   console.log(err)
// });


// db.query('SELECT * FROM departments', function (err, results) {

//   console.table(results)
// });


// db.query('SELECT * FROM roles', function (err, results) {
//   console.table(results);
// });

// db.query('SELECT * FROM employees', function (err, results) {
//   console.table(results);
// });



//   db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
