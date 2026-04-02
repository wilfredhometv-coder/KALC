const mysql = require('mysql');

// Create a connection pool
const pool = mysql.createPool({
    connectionLimit: 10, // max number of connections
    host: 'localhost',
    user: 'your_username',
    password: 'your_password',
    database: 'your_database'
});

module.exports = pool;