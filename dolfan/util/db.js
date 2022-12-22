require('dotenv').config();
const mysql = require('mysql2/promise');
const {DB_HOST, DB_USER, DB_PWD, DB_NAME} = process.env;

const mysqlConfig = {
        host: DB_HOST,
        user: DB_USER,
        password: DB_PWD,
        database: DB_NAME
};

mysqlConfig.waitForConnections = true;
mysqlConfig.connectionLimit = 20;

const pool = mysql.createPool(mysqlConfig);

module.exports = {
    pool
};