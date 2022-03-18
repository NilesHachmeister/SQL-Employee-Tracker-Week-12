const inquirer = require('inquirer');
const fs = require('fs');


const express = require('express');
const viewDb = require('./helper/viewdb')
const editDb = require('./helper/editdb')
const removeDb = require('./helper/removedb');
const exp = require('constants');
const PORT = process.env.PORT || 3001;
const app = express();



app.use(express.urlencoded({ extended: false }));
app.use(express.json());



// fix cascade delete issue
//promise issue



//comment
//video
//readme

// express, inquirer, mysql2, console.table




var initPromptUser = function () {
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

        newResponse.viewDepartments()


        // done

      } else if (data.decideFunction === "View all roles") {
        newResponse.viewRoles(); //done

      } else if (data.decideFunction === "View all employees") {
        newResponse.viewEmployees(); // done

      } else if (data.decideFunction === "Add a department") {
        newEdit.addDepartment();
        // done

      } else if (data.decideFunction === "Add a role") {
        newEdit.addRole(); //done


      } else if (data.decideFunction === "Add an employee") {
        newEdit.addEmployee(); // done

      } else if (data.decideFunction === "View employees by department") {
        newResponse.viewByDepartment(); // done
      } else if (data.decideFunction === "View all employees by manager") {
        newResponse.viewByManager(); // done

      } else if (data.decideFunction === "Remove employee") {
        newRemove.removeEmployee();    //done
      } else if (data.decideFunction === "Update employee role") {
        newEdit.updateEmployeeRole(); // done
      } else if (data.decideFunction === "Update employee manager") {
        newEdit.updateEmployeeManager(); // done
      } else if (data.decideFunction === "Remove role") {
        newRemove.removeRole(); // fix where it deletes the player as well

      } else if (data.decideFunction === "Remove department") {
        newRemove.removeDepartment();   //fix where it deletes the

      } else if (data.decideFunction === "View total utilized budget by department") {
        newResponse.viewBudget(); //done
      } else {
        console.log("Goodbye");
        return;
      }




    });

}




initPromptUser()



app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
