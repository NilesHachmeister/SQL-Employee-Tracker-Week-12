const fs = require('fs')


function Respond2User() { }


// this prototype is built do spit out the html file
Respond2User.prototype.viewDepartments = function () {
    db.query('SELECT * FROM departments', function (err, results) {
        console.table(results)
    });
}


Respond2User.prototype.viewRoles = function () {
    db.query('SELECT * FROM roles', function (err, results) {
        console.table(results);
    });
}


Respond2User.prototype.viewEmployees = function () {
    db.query('SELECT * FROM employees', function (err, results) {
        console.table(results);
    });
}


Respond2User.prototype.addDepartment = function () {
    console.log("department added");
}


Respond2User.prototype.addRole = function () {
    console.log("role added");
}


Respond2User.prototype.addEmployee = function () {
    console.log("added employee");
}


Respond2User.prototype.updateEmployeeRole = function () {
    console.log("updating role");
}








module.exports = Respond2User;