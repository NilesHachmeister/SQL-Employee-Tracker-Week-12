const inquirer = require('inquirer');
const fs = require('fs');

const cTable = require('console.table');


const mysql = require('mysql2');

const express = require('express');

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
      if (data.decideFunction === "View all departments") {
        console.log("Viewing departments");
      } else if (data.decideFunction === "View all roles") {
        console.log(2);
      } else if (data.decideFunction === "View all employees") {
        console.log(3);
      } else if (data.decideFunction === "Add a department") {
        console.log(4);
      } else if (data.decideFunction === "Add a role") {
        console.log(5);
      } else if (data.decideFunction === "Add an employee") {
        console.log(6);
      } else {
        console.log(data.decideFunction);
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
