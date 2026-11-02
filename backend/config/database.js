const mysql = require('mysql2/promise');

const config = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

let pool;

function getPool() {
  if (!pool) {
    pool = mysql.createPool(config);
  }
  return pool;
}

async function connect() {
  const pool = getPool();
  try {
    const connection = await pool.getConnection();
    connection.release();
    return pool;
  } catch (err) {
    console.error('Connection error:', err.message);
    return pool;
  }
}

async function testConnection() {
  const pool = getPool();
  try {
    const connection = await pool.getConnection();
    console.log('Database connected successfully');
    connection.release();
    return true;
  } catch (err) {
    console.error('Database connection failed:', err.message);
    return false;
  }
}

module.exports = {
  connect,
  testConnection,
  getPool,
};