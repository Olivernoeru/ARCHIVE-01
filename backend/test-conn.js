require('dotenv').config();

const db = require('./config/database');

db.testConnection().then(r => {
  console.log('Connection test result:', r);
  process.exit(0);
}).catch(e => {
  console.error('Error:', e.message);
  process.exit(1);
});