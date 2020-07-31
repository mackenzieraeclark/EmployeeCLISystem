// Set requirements
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

// Initialize Application
function init() {
    const logoText = render({ name: "Employee CLI System" });

    console.log(logoText);


}


// Begin!
init();