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
          initPromptUser());
        // done

      } else if (data.decideFunction === "View all roles") {
        //done

        Promise.resolve(newResponse.viewRoles()).then(
          initPromptUser());

      } else if (data.decideFunction === "View all employees") {


        Promise.resolve(newResponse.viewEmployees()).then(
          initPromptUser());
      } else if (data.decideFunction === "Add a department") {

        // done

        Promise.resolve(newEdit.addDepartment()).then(
          initPromptUser());

      } else if (data.decideFunction === "Add a role") {
        //done

        Promise.resolve(newEdit.addRole()).then(
          initPromptUser());



      } else if (data.decideFunction === "Add an employee") {


        Promise.resolve(newEdit.addEmployee()).then(
          initPromptUser());

      } else if (data.decideFunction === "View employees by department") {


        Promise.resolve(newResponse.viewByDepartment()).then(
          initPromptUser());
      } else if (data.decideFunction === "View all employees by manager") {


        Promise.resolve(newResponse.viewByManager()).then(
          initPromptUser());

      } else if (data.decideFunction === "Remove employee") {


        Promise.resolve(newRemove.removeEmployee()).then(
          initPromptUser());
      } else if (data.decideFunction === "Update employee role") {

        Promise.resolve(newEdit.updateEmployeeRole()).then(
          initPromptUser());


      } else if (data.decideFunction === "Update employee manager") {

        Promise.resolve(newEdit.updateEmployeeManager()).then(
          initPromptUser());

      } else if (data.decideFunction === "Remove role") {


        Promise.resolve(newRemove.removeRole()).then(
          initPromptUser());

      } else if (data.decideFunction === "Remove department") {


        Promise.resolve(newRemove.removeDepartment()).then(
          initPromptUser());

      } else if (data.decideFunction === "View total utilized budget by department") {
    

        Promise.resolve(newResponse.viewBudget()).then(
          initPromptUser());

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
