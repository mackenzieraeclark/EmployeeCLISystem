// Functions for performing specific SQL queries
// Using class and constructor function

// Set Requirements
const connection = require("./connection");

// Create a class to be called on 
class DB {

    // Reference connection using CONSTRUCTOR
    constructor(connection){
        this.connection = connection;
    }

    // Begin Functions

    // All Employees Function
    // This will JOIN roles and departments to display ROLE, SALARY, DEPARTMENT, and MANAGER
    allEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }

    // In order to find the MANAGER, isolate by ID
    allPossibleManagers(employeeID) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeID
        );
    }

    // Create a new employee
    createEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }


} // End Functions