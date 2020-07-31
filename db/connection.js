// Set initial requirements
const mysql = require("mysql");
const util = require("util");

// Create the connection with with username and password
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "employees"
});

// Connect to conncection
connection.connect();

// Set a connection query (this is to use promises, async, and await)
connection.query = util.promisify(connection.query);

// Export connection
module.exports = connection;