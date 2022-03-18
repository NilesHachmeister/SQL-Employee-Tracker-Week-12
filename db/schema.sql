-- creates the database
DROP DATABASE IF EXISTS hr_db;
CREATE DATABASE hr_db;

-- uses the database
USE hr_db;

-- creates the department table
CREATE TABLE departments (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  department_name VARCHAR(30) NOT NULL
);

-- creates the roles table
CREATE TABLE roles (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  role_title VARCHAR(30),
  role_salary DECIMAL(8,2),
  department_id INT,
  FOREIGN KEY (department_id)
  REFERENCES departments(id)
  ON DELETE SET NULL
);

-- creates the employees table
CREATE TABLE employees (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  employee_first_name VARCHAR(30) NOT NULL,
  employee_last_name VARCHAR(30) NOT NULL,
  employee_role_id INT,
  manager_id INT,
  FOREIGN KEY (employee_role_id)
  REFERENCES roles(id)
  ON DELETE SET NULL
);
