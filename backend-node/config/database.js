const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
  max: 10,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const testConnection = async () => {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    client.release();
    console.log(`\x1b[32m[DB]\x1b[0m PostgreSQL connected at ${result.rows[0].now}`);
  } catch (err) {
    console.error('\x1b[31m[DB ERROR]\x1b[0m PostgreSQL connection failed:', err.message);
  }
};

module.exports = { pool, testConnection };