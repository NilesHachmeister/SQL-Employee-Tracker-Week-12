const inquirer = require('inquirer');
const fs = require('fs');


const express = require('express');
const viewDb = require('./helper/viewdb')
const editDb = require('./helper/editdb')
const removeDb = require('./helper/removedb')
const PORT = process.env.PORT || 3001;
const app = express();




app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// figure out atuo seed
// inquirer asks questions
// eddit points on the table depending on what is going on



function initPromptUser() {
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

      const newResponse = new viewDb;
      const newEdit = new editDb;
      const newRemove = new removeDb;

      if (data.decideFunction === "View all departments") {

        Promise.resolve(newResponse.viewDepartments()).then(
          initPromptUser()
        );
        // done

      } else if (data.decideFunction === "View all roles") {
        newResponse.viewRoles(); //done

      } else if (data.decideFunction === "View all employees") {
        newResponse.viewEmployees(); // figure out why landy isnt showing up

      } else if (data.decideFunction === "Add a department") {
        newEdit.addDepartment();
        // done

      } else if (data.decideFunction === "Add a role") {
        newEdit.addRole(); //done
        initPromptUser();

      } else if (data.decideFunction === "Add an employee") {
        newEdit.addEmployee();

      } else if (data.decideFunction === "View employees by department") {
        newResponse.viewByDepartment(); // figure out why landy isnt showing up
      } else if (data.decideFunction === "View all employees by manager") {
        newResponse.viewByManager(); // figure out why landy isnt showing up

      } else if (data.decideFunction === "Remove employee") {
        newRemove.removeEmployee();    //done
      } else if (data.decideFunction === "Update employee role") {
        newEdit.updateEmployeeRole(); // done
      } else if (data.decideFunction === "Update employee manager") {
        newEdit.updateEmployeeManager();
      } else if (data.decideFunction === "Remove role") {
        newRemove.removeRole(); // fix where it deletes the player as well

      } else if (data.decideFunction === "Remove department") {
        newRemove.removeDepartment();   //fix where it deletes the

      } else if (data.decideFunction === "View total utilized budget by department") {
        newResponse.viewBudget();
      } else {
        console.log("Goodbye");
        return;
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











//   db.query(`DELETE FROM course_names WHERE id = ?`, 3, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     console.log(result);
//   });

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
