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
}


// Begin!
init();