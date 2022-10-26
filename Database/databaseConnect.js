//Connecting to the Student database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'StudentDB',
    password: 'isha123',
    port: 5000,
})

module.exports = pool;