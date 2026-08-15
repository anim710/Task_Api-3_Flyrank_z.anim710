const express = require('express');
const { initDb } = require('./db');
const { TaskRepository } = require('./task.repository');

const app = express();
app.use(express.json());

const repo = new TaskRepository();

// GET /tasks - List all tasks
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await repo.findAll();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// GET /tasks/:id - Get task by ID
app.get('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const task = await repo.findById(id);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(task);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// POST /tasks - Create task
app.post('/tasks', async (req, res) => {
  try {
    const { title, done } = req.body;
    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
    }

    const newTask = await repo.create(title.trim(), Boolean(done));
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// PUT /tasks/:id - Update task
app.put('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const { title, done } = req.body;

    if (!title || typeof title !== 'string' || title.trim() === '') {
      return res.status(400).json({ error: 'Title is required' });
    }

    const updatedTask = await repo.update(id, title.trim(), Boolean(done));
    if (!updatedTask) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

// DELETE /tasks/:id - Remove task
app.delete('/tasks/:id', async (req, res) => {
  try {
    const id = parseInt(req.params.id, 10);
    const deleted = await repo.delete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'Task not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ error: 'Database query failed' });
  }
});

const PORT = process.env.PORT || 3000;

initDb().then(() => {
  app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
}).catch((err) => {
  console.error('Failed to initialize database:', err);
});