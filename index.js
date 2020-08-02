// Set requirements
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

// Initialize Application
function init() {
    console.log("Welcome to your employee management CLI system!")
    loadPrompts();
}

// Create Main Function for Prompting User
// Using ASYNC funtionality!

async function loadPrompts() {
    const {choice} = await prompt([
        {
            type: "list",
            name: "choice",
            message: "How would you like to start?",
            choices: [
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYESS"
                },
                {
                    name: "View Employees by Department",
                    value: "VIEW_BY_DEPARTMENT"
                },
                {
                    name: "View Employees by Manager",
                    value: "VIEW_BY_MANAGER"
                },
                {
                    name: "Add An Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Remove An Employee",
                    value: "REMOVE_EMPLOYEE"
                },
                {
                    name: "Update A Role",
                    value: "UPDATE_ROLE"
                },
                {
                    name: "Update A Manager",
                    value: "UPDATE_MANAGER"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "Add Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Remove Role",
                    value: "REMOVE_ROLE"
                },
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "Add Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Remove Department",
                    value: "REMOVE_DEPARTMENT"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                },
            ]
        }
    ]);

    // Create Switch Cases to direct to the correct function based on what user has chose:
    switch (choice) {
        case "VIEW_EMPLOYEES":
          return viewEmployees();
        case "VIEW_BY_DEPARTMENT":
          return viewByDepartment();
        case "VIEW_BY_MANAGER":
          return viewByManager();
        case "ADD_EMPLOYEE":
          return addEmployee();
        case "REMOVE_EMPLOYEE":
          return removeEmployee();
        case "UPDATE_ROLE":
          return updateRole();
        case "UPDATE_MANAGER":
          return updateManager();
        case "VIEW_DEPARTMENTS":
          return viewDepartments();
        case "ADD_DEPARTMENT":
          return addDepartment();
        case "REMOVE_DEPARTMENT":
          return removeDepartment();
        case "VIEW_ROLES":
          return viewRoles();
        case "ADD_ROLE":
          return addRole();
        case "REMOVE_ROLE":
          return removeRole();
        default:
          return quit();
      }
}

// Create all needed functions within prompts!!

async function viewEmployees();

async function viewByDepartment();

async function viewByManager();

async function addEmployee();

async function removeEmployee();

async function updateRole();

async function viewDepartments();

async function addDepartment();

async function removeDepartment();

async function viewRoles();

async function addRole();

async function removeRole();

function quit() {
    console.log("We hope we were able to help simplify your employee management. Come back soon!")
    process.exit();
}

// Begin!
init();