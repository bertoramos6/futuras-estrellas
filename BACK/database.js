const mysql = require('mysql2/promise');

const pool = mysql.createPool({
    host: 'localhost',
    user: 'proyectoHAB',
    password: process.env.PASSWORD_DATABASE,
    database: 'proyectoHAB',
    connectionLimit: 10
});
const getConnection = () => pool.getConnection();

module.exports = {
    getConnection
};
