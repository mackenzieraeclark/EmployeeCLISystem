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

// VIEW ALL FUNCTIONS

    // This will JOIN roles and departments to display ROLE, SALARY, DEPARTMENT, and MANAGER
    allEmployees() {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name AS department, role.salary, CONCAT(manager.first_name, ' ', manager.last_name) AS manager FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id LEFT JOIN employee manager on manager.id = employee.manager_id;"
        );
    }


    // In order to find the MANAGER, isolate by ID
    allManagers(employeeId) {
        return this.connection.query(
            "SELECT id, first_name, last_name FROM employee WHERE id != ?",
            employeeId
        );
    }

    // View all departments
    allDepartments() {
        return this.connection.query(
          "SELECT department.id, department.name, SUM(role.salary) AS utilized_budget FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department on role.department_id = department.id GROUP BY department.id, department.name;"
        );
      }

    // View all roles
    allRoles() {
        return this.connection.query(
          "SELECT role.id, role.title, department.name AS department, role.salary FROM role LEFT JOIN department on role.department_id = department.id;"
        );
      }


// VIEW BY FUNCTIONS


    // View Employees by Department
    // This will join with roles to display role titles
    byDepartment(departmentId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, role.title FROM employee LEFT JOIN role on employee.role_id = role.id LEFT JOIN department department on role.department_id = department.id WHERE department.id = ?;",
            departmentId
        );
    }

    //View Employees by Manager
    byManager(managerId) {
        return this.connection.query(
            "SELECT employee.id, employee.first_name, employee.last_name, department.name AS department, role.title FROM employee LEFT JOIN role on role.id = employee.role_id LEFT JOIN department ON department.id = role.department_id WHERE manager_id = ?;",
            managerId
        );
    }

// ADD FUNCTIONS

    // Add a new employee
    makeEmployee(employee) {
        return this.connection.query("INSERT INTO employee SET ?", employee);
    }

    // Add a new role
    makeRole(role) {
        return this.connection.query("INSERT INTO role SET ?", role);
      }

    // Add a department
    makeDepartment(department) {
        return this.connection.query("INSERT INTO department SET ?", department);
      }

// EDIT FUNTIONS

    // Update their role
    manageRole(employeeId, roleId) {
        return this.connection.query(
          "UPDATE employee SET role_id = ? WHERE id = ?",
          [roleId, employeeId]
        );
      }

    // Update who is their Manager
    manageManager(employeeId, managerId) {
        return this.connection.query(
          "UPDATE employee SET manager_id = ? WHERE id = ?",
          [managerId, employeeId]
        );
      }

// DELETE FUNCTIONS

    // Delete an existing employee
    removeEmployee(employeeId) {
        return this.connection.query(
          "DELETE FROM employee WHERE id = ?",
          employeeId
        );
      }

    // Delete a role
    removeRole(roleId) {
        return this.connection.query("DELETE FROM role WHERE id = ?", roleId);
      }

    // Delete a department
    removeDepartment(departmentId) {
        return this.connection.query(
          "DELETE FROM department WHERE id = ?",
          departmentId
        );
      }


} // End Functions

//export
module.exports = new DB(connection);