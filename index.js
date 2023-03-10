const inquirer = require('inquirer');
const mysql = require('mysql2');
const cTable = require('console.table');

// connects employee_db database //
const db = mysql.createConnection(
    {
        user: 'root',
        password: 'root',
        database: 'employee_db'
    },
     // console.log(`Connected to the employee_db.`)
);


const addDeptart = function () {
    inquirer.prompt([
        {
            name: 'name',
            message: 'Department name?',
        },
    ])
        .then(answers => {
            db.query(`INSERT INTO department SET ?`, answers, function (err, result) {
                console.log(`${answers.name} added to Departments.`);
                iQuestion();
            });
        })
}

const addRole = function () {
    inquirer.prompt([
        {
            name: 'title',
            message: 'What is the role\'s title?',
        },
        {
            name: 'salary',
            message: 'What is the role\'s salary?'
        },
        {
            type: 'list',
            name: 'department',
            message: 'which department does this role reside in?',
            choices: [
                'Engineering',
                'Finance',
                'Legal',
                'Sales',
                'Marketing',
            ]
        }
    ])
        .then(answers => {
            db.query(`INSERT INTO role SET ?`, answers, function (err, result) {
                console.log(`${answers.title} added to Employees.`);
                iQuestion();
            });
        })
}

const addEmployee = function () {
    inquirer.prompt([
        {
            name: 'first_name',
            message: 'What is the employee\'s first name?',
        },
        {
            name: 'last_name',
            message: 'What is the employee\'s last name?'
        },
        {
            type: 'list',
            name: 'role',
            message: 'What is the role of this employee?',
            choices: [
                'Sr. Engineer',
                'Accountant',
                'Lawyer',
                'Sales Manager',
                'Social Media Manager',
            ]
        }
    ])
        .then(answers => {
            db.query(`INSERT INTO employee SET ?`, answers, function (err, result) {
                console.log(`${answers.first_name} ${answers.last_name} added to Roles.`);
                iQuestion();
            });
        })
}

const iQuestion = function () {

    inquirer.prompt([
        {
            type: 'list',
            name: 'todo',
            message: 'What would you like to do?',
            choices: [
                'View all departments',
                'View all roles',
                'View all employees',
                'Add a department',
                'Add a role',
                'Add an employee',
                'Update an employee',
            ],
        }
    ])
        .then(answers => {
            console.log(answers);

             if (answers.todo === 'Add a department') {
                addDeptart();
            } else if (answers.todo === 'Add a role') {
                addRole();
            } else if (answers.todo === 'Add an employee') {
                addEmployee();
            } else if (answers.todo === 'View all departments') {
                db.query('SELECT * FROM department', function (err, department) {
                    console.table(department);
                    iQuestion();
                });
            } else if (answers.todo === 'View all roles') {
                db.query('SELECT * FROM role', function (err, role) {
                    console.table(role);
                    iQuestion();
                });
            } else if (answers.todo === 'View all employees') {
                db.query('SELECT * FROM employee', function (err, employee) {
                    console.table(employee);
                    iQuestion();
                });
            }
        });
};

  iQuestion();