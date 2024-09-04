const { Pool } = require('pg');
const inquirer = require('inquirer')

const pool = new Pool(
    {
        user: 'postgres',
        password: 'Hotdogwater',
        host: 'localhost',
        database: 'employee_db'
    },
    console.log('Connected to the employee_db database')
)

pool.connect();


// getters
async function viewAllEmployees() {
    const result = await pool.query(`
SELECT
    employees.id,
    employees.first_name,
    employees.last_name,
    roles.title AS title,
    roles.salary AS salary,
    departments.name AS department,
    CASE WHEN employees.manager_id IS NOT NULL 
    THEN CONCAT(manager.first_name,' ',manager.last_name) 
    ELSE 'N/A'
    END AS manager
FROM employees
JOIN roles ON employees.role_id = roles.id
JOIN departments ON roles.department_id = departments.id
LEFT JOIN employees manager ON employees.manager_id = manager.id`)
    console.table(result.rows);
    promptUser();
}

async function viewAllRoles() {
    const { rows } = await pool.query('SELECT roles.id, roles.title, roles.salary, departments.name AS department FROM roles JOIN departments ON roles.department_id = departments.id')
    console.table(rows)
    promptUser();
}

async function viewAllDepartments() {
    const result = await pool.query('SELECT * FROM departments')
    console.table(result.rows);
    promptUser();
}

// setters 
async function addDepartment() {

    const addingDepartment = [
        {
            type: "input",
            message: "What is the name of the department?",
            name: "departmentName"
        }
    ]

    const response = await inquirer.prompt(addingDepartment);
    await pool.query(`INSERT INTO departments (name) VALUES ('${response.departmentName}')`)
    promptUser();
}

async function addRole() {

    const {rows} = await pool.query('SELECT * FROM departments');
    const departments = rows.map((item) => {
        return {
            name: item.name,
            value: item.id
        }
    })
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
            choices: departments,
            name: "roleDepartment"
        }
    ]

    const response = await inquirer.prompt(addingRole)

    await pool.query(`INSERT INTO roles (title, salary, department_id) VALUES ('${response.roleName}', ${response.roleSalary}, ${response.roleDepartment})`)
    promptUser();
}

async function addEmployee() {
    
    const getRole = await pool.query('SELECT * FROM roles');
    const roles = getRole.rows.map((item) => {
        return {
            name: item.title,
            value: item.id
        }
    })

    const getEmployee = await pool.query('SELECT * FROM employees')
    const employees = getEmployee.rows.map((item) => {
        return {
            name: `${item.first_name} ${item.last_name}`,
            value: item.id
        }
    })


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
            choices: roles // change to correct function
        },
        {
            type: "list",
            message: "Who is the employee's manager?",
            name: "employeeManager",
            choices: employees // change to correct function
        }
    ]

    const response = await inquirer.prompt(addingEmployee)

    await pool.query(`INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES ('${response.firstName}', '${response.lastName}', ${response.employeeRole}, ${response.employeeManager})`)
    promptUser();
}


async function updateRole() {
    
    const getEmployee = await pool.query('SELECT * FROM employees')
    const employees = getEmployee.rows.map((item) => {
        return {
            name: `${item.first_name} ${item.last_name}`,
            value: item.id
        }
    })

    const getRole = await pool.query('SELECT * FROM roles');
    const roles = getRole.rows.map((item) => {
        return {
            name: item.title,
            value: item.id
        }
    })

    const updatingRole = [
        {
            type: "list",
            message: "Which employee would you like to update?",
            name: "employee",
            choices: employees
        },
        {
            type: "list",
            message: "Which role will they be taking on?",
            name: "role",
            choices: roles
        }
    ]
    const response = await inquirer.prompt(updatingRole)

    await pool.query(`UPDATE employees SET role_id = ${response.role} WHERE id = ${response.employee}`)
    promptUser();
}




async function promptUser() {
    const response = await inquirer.prompt(whatToDo)

    if (response.whatToDo === "Quit") {
        process.exit();
    } else if (response.whatToDo === "View All Employees") {
        viewAllEmployees();
    } else if (response.whatToDo === "Add Employee") {
        addEmployee();
    } else if (response.whatToDo === "Update Employee Role") {
        updateRole();
    } else if (response.whatToDo === "View All Roles") {
        viewAllRoles();
    } else if (response.whatToDo === "Add Role") {
        addRole();
    } else if (response.whatToDo === "View All Departments") {
        viewAllDepartments();
    } else if (response.whatToDo === "Add Department") {
        addDepartment()
    }
}

const whatToDo = {
    type: "list",
    message: "What would you like to do?",
    name: "whatToDo",
    choices: ["View All Employees", "Add Employee", "Update Employee Role", "View All Roles", "Add Role", "View All Departments", "Add Department", "Quit"]
};

promptUser();