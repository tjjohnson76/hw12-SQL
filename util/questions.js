// const table = require("text-table")



const whatToDo = {
        type: "list",
        message: "What would you like to do?",
        name: "whatToDo",
        choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
    };

const addingDepartment = [
    {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName"
    }
]

const addingRole = [
    {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName"
    },
    {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary"
    },
    {
        type: "list",
        message: "Which department does the role belong to?",
        choices: getAllDepartments() // change to correct function
    }
]

const addingEmployee = [
    {
        type: "input",
        message: "What is the employee's first name?",
        name: "firstName"
    },
    {
        type: "input",
        message: "What is the employee's last name?",
        name: "lastName"
    },
    {
        type: "list",
        message: "What is the employee's role?",
        name: "employeeRole",
        choices: getAllRoles() // change to correct function
    },
    {
        type: "list",
        message: "Who is the employee's manager?",
        name: "employeeManager",
        choices: getAllEmployees() // change to correct function
    }
]






module.exports = {
    whatToDo,
    addingDepartment,
    addingRole,
    addingEmployee
}
