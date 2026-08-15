const { pool } = require('./db');

class TaskRepository {
  // GET /tasks helper - SELECT ALL
  async findAll() {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');
    return result.rows;
  }

  // GET /tasks/:id helper - SELECT BY ID
  async findById(id) {
    const result = await pool.query('SELECT * FROM tasks WHERE id = $1', [id]);
    return result.rows[0] || null;
  }

  // POST /tasks helper - INSERT INTO tasks
  async create(title, done = false) {
    const result = await pool.query(
      'INSERT INTO tasks (title, done) VALUES ($1, $2) RETURNING *',
      [title, done]
    );
    return result.rows[0];
  }

  // PUT /tasks/:id helper - UPDATE tasks
  async update(id, title, done) {
    const result = await pool.query(
      'UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *',
      [title, done, id]
    );
    return result.rows[0] || null;
  }

  // DELETE /tasks/:id helper - DELETE FROM tasks
  async delete(id) {
    const result = await pool.query('DELETE FROM tasks WHERE id = $1', [id]);
    return (result.rowCount ?? 0) > 0;
  }
}

module.exports = {
  TaskRepository,
};