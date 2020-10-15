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
                    name: "Delete An Employee",
                    value: "DELETE_EMPLOYEE"
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
                    name: "Delete Role",
                    value: "DELETE_ROLE"
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
                    name: "Delete Department",
                    value: "DELETE_DEPARTMENT"
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
        case "DELETE_EMPLOYEE":
          return deleteEmployee();
        case "UPDATE_ROLE":
          return updateRole();
        case "UPDATE_MANAGER":
          return updateManager();
        case "VIEW_DEPARTMENTS":
          return viewDepartments();
        case "ADD_DEPARTMENT":
          return addDepartment();
        case "DELETE_DEPARTMENT":
          return deleteDepartment();
        case "VIEW_ROLES":
          return viewRoles();
        case "ADD_ROLE":
          return addRole();
        case "DELETE_ROLE":
          return deleteRole();
        default:
          return quit();
      }
}

// Create all needed functions within prompts!!


// VIEW ALL FUNTIONS

// all employees

async function viewEmployees() {
    const employees = await db.allEmployees();
    console.log("\n");
    console.table(employees);

    loadPrompts();
}

// all departments

async function viewDepartments() {
  const departments = await db.allDepartments();

  console.log("\n");
  console.table(departments);

  loadPrompts();
};

// all roles

async function viewRoles() {
  const roles = await db.allRoles();

  console.log("\n");
  console.table(roles);

  loadPrompts();
};



// VIEW BY FUNCTIONS

// by department

async function viewByDepartment() {
  const departments = await db.allDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt([
    {
      type: "list",
      name: "departmentId",
      message: "Choose a department to view associated employees:",
      choices: departmentChoices
    }
  ]);

  const employees = await db.byDepartment(departmentId);

  console.log("\n");
  console.table(employees);

  loadPrompts();
}

// by manager

async function viewByManager() {
  const managers = await db.allEmployees();

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message: "Choose a manager to view associated employees:",
      choices: managerChoices
    }
  ]);

  const employees = await db.byManager(managerId);

  console.log("\n");

  if (employees.length === 0) {
    console.log("The selected employee has no manager");
  } else {
    console.table(employees);
  }

  loadPrompts();
};



// ADD FUNCTIONS

// employee

async function addEmployee() {
  const roles = await db.allRoles();
  const employees = await db.allEmployees();

  const employee = await prompt([
    {
      name: "first_name",
      message: "What is the employee's first name?"
    },
    {
      name: "last_name",
      message: "What is the employee's last name?"
    }
  ]);

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt({
    type: "list",
    name: "roleId",
    message: "What is the employee's role?",
    choices: roleChoices
  });

  employee.role_id = roleId;

  const managerChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));
  managerChoices.unshift({ name: "None", value: null });

  const { managerId } = await prompt({
    type: "list",
    name: "managerId",
    message: "Who is the employee's manager?",
    choices: managerChoices
  });

  employee.manager_id = managerId;

  await db.makeEmployee(employee);

  console.log(
    `Added ${employee.first_name} ${employee.last_name} to the database`
  );

  loadPrompts();
};

// department

async function addDepartment() {
  const department = await prompt([
    {
      name: "name",
      message: "What is the name of the department?"
    }
  ]);

  await db.makeDepartment(department);

  console.log(`Added ${department.name} to the database`);

  loadPrompts();
};

// role

async function addRole() {
  const departments = await db.allDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const role = await prompt([
    {
      name: "title",
      message: "What is the name of the role?"
    },
    {
      name: "salary",
      message: "What is the salary of the role?"
    },
    {
      type: "list",
      name: "department_id",
      message: "Which department does the role belong to?",
      choices: departmentChoices
    }
  ]);

  await db.makeRole(role);

  console.log(`Added ${role.title} to the database`);

  loadPrompts();
};




// UPDATE FUNCTIONS

//role

async function updateRole() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's role do you want to update?",
      choices: employeeChoices
    }
  ]);

  const roles = await db.allRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message: "What is this employee's most current role?",
      choices: roleChoices
    }
  ]);

  await db.manageRole(employeeId, roleId);

  console.log("Updated employee's role");

  loadPrompts();
};

// manager

async function updateManager() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee's manager do you want to update?",
      choices: employeeChoices
    }
  ]);

  const managers = await db.allManagers(employeeId);

  const managerChoices = managers.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { managerId } = await prompt([
    {
      type: "list",
      name: "managerId",
      message:
        "Set a manager for the employee:",
      choices: managerChoices
    }
  ]);

  await db.manageManager(employeeId, managerId);

  console.log("Updated employee's manager");

  loadPrompts();
};

//



// DELETE FUNCTIONS

// employee

async function deleteEmployee() {
  const employees = await db.allEmployees();

  const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
    name: `${first_name} ${last_name}`,
    value: id
  }));

  const { employeeId } = await prompt([
    {
      type: "list",
      name: "employeeId",
      message: "Which employee do you want to delete from the database?",
      choices: employeeChoices
    }
  ]);

  await db.removeEmployee(employeeId);

  console.log("Removed employee from the database");

  loadPrompts();
};

// department

async function deleteDepartment() {
  const departments = await db.allDepartments();

  const departmentChoices = departments.map(({ id, name }) => ({
    name: name,
    value: id
  }));

  const { departmentId } = await prompt({
    type: "list",
    name: "departmentId",
    message:
      "Which department would you like to delete? (Please be aware that this will also delete associated employees and their respective roles...)",
    choices: departmentChoices
  });

  await db.removeDepartment(departmentId);

  console.log(`Removed department from the database`);

  loadPrompts();
};

// role

async function deleteRole() {
  const roles = await db.allRoles();

  const roleChoices = roles.map(({ id, title }) => ({
    name: title,
    value: id
  }));

  const { roleId } = await prompt([
    {
      type: "list",
      name: "roleId",
      message:
        "Which role do you want to delete? (Please be aware that this will also affect associated employees...)",
      choices: roleChoices
    }
  ]);

  await db.removeRole(roleId);

  console.log("Removed role from the database");

  loadPrompts();
};


/////////////

function quit() {
    console.log("We hope we were able to help simplify your employee management. Come back soon!")
    process.exit();
}

// Begin!
init();