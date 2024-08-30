const { Pool } = require('pg');




const pool = new Pool (
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
async function getAllDepartments(){
    const {rows} = await pool.query('SELECT * FROM departments')
    // console.log(rows)
    return rows[0]
}

async function getAllEmployees() {
    pool.query('SELECT * FROM employees JOIN departments on employees.department_id = departments.id JOIN roles on employees.role_id = roles.id', (err, resp) => {
        console.log(resp)
    })
}

async function getAllRoles() {
    pool.query('SELECT * FROM roles JOIN departments on roles.department_id = departments.id', (err, {rows}) => {
        console.log(rows)
    })
}

// setters
async function addDepartment(responseObj){

}
async function addEmployee(responseObj){

}
async function addRole(responseObj){

}

// update
async function updateRole(responseObj){

}

async function startup(){
    const result = await getAllDepartments()
    console.log(result + ' cleh')

}
// getAllDepartments()
// getAllEmployees()
// getAllRoles()

startup()