const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function initDb() {
  // 1. Create table if it doesn't exist
  await pool.query(`
    CREATE TABLE IF NOT EXISTS tasks (
      id SERIAL PRIMARY KEY,
      title TEXT NOT NULL,
      done BOOLEAN DEFAULT FALSE
    );
  `);

  // 2. Check if table is empty
  const res = await pool.query('SELECT COUNT(*) FROM tasks');
  const count = parseInt(res.rows[0].count, 10);

  // 3. Seed 3 example tasks only on first run
  if (count === 0) {
    await pool.query(`
      INSERT INTO tasks (title, done) VALUES
      ('Learn Docker basics', true),
      ('Connect Postgres to Express', false),
      ('Verify volume persistence', false);
    `);
    console.log('Database seeded with 3 initial tasks.');
  }
}

module.exports = {
  pool,
  initDb,
};