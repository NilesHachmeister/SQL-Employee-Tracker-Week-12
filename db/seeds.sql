
-- seeds the departments table
INSERT INTO departments (department_name)
VALUES ("forward"),
       ("defence"),
       ("goaltending");

-- seeds the roles table
       INSERT INTO roles (role_title, role_salary, department_id)
VALUES ("power", 4.2, 1),
       ("skilled", 6.5, 1),
       ("offensive", 9.1, 2),
       ("stay at home", 4, 2),
       ("shut down", 6.0, 3);

-- seeds the employees table
       INSERT INTO employees (employee_first_name, employee_last_name, employee_role_id, manager_id)
VALUES ("Gabriel", "Landeskog", 1, null),
       ("Valeri", "Nichushkin", 1, 1),
       ("Nathan", "MacKinnon", 2, 1),
       ("Cale", "Makar", 3, 1),
       ("Eric", "Johnson", 4, 1),
       ("Darcy", "Kuemper", 5, 1);
