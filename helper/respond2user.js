const fs = require('fs')


function Respond2User() { }


// this prototype is built do spit out the html file
Respond2User.prototype.viewDepartments = function () {
    console.log("departments viewed");
}







// ["View all departments", "View all roles", "View all employees", "Add a department", "Add a role", "Add an employee", "Update an employee role"]




module.exports = Respond2User;