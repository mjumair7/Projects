const express = require('express');
const app = express();
const PORT = 1200;

// Middleware to parse JSON requests
app.use(express.json());

// Serve static files from the "public" folder
app.use(express.static('public'));

// Task list stored in memory
let tasks = [];

// Get all tasks
app.get('/tasks', (req, res) => {
  res.json(tasks);
});

// Add a new task
app.post('/tasks', (req, res) => {
  const { task } = req.body;
  if (task) {
    tasks.push(task);
    res.json({ task, index: tasks.length - 1 });
  } else {
    res.status(400).json({ error: 'Task content is required' });
  }
});

// Delete a task
app.delete('/tasks/:index', (req, res) => {
  const index = parseInt(req.params.index, 10);
  if (!isNaN(index) && index >= 0 && index < tasks.length) {
    tasks.splice(index, 1);
    res.status(204).send(); // No content
  } else {
    res.status(400).json({ error: 'Invalid index' });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});