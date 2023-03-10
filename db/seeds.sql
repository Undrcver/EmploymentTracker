USE employee_db

INSERT INTO department (name)
VALUES
('Engineering'),
('Finance'),
('Legal'),
('Sales');

INSERT INTO role (title, salary, department_id)
VALUES
('Sr. Engineer', 110000, 1),
('Accountant', 70000, 2),
('Lawyer', 90000, 3),
('Sales Manager', 70000, 4);

INSERT INTO employee (first_name, last_name, role_id)
VALUES 
('John', 'Cortez', 1),
('Micheal', 'Smith', 2),
('Alex', 'Johnson', 3),
('Sarah', 'Chan', 4);