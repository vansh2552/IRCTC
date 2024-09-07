const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.connect((err, client) => {
  if (err) throw err;
  console.log('Connected to Postgres');
});

module.exports = pool;
