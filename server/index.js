const express = require("express");
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

let tasks = [];

// Get all tasks
app.get("/api/tasks", (req, res) => {
  res.json(tasks);
});

// Add new task
app.post("/api/tasks", (req, res) => {
  const { text } = req.body;
  if (!text) {
    return res.status(400).json({ error: "Text is required" });
  }
  const newTask = {
    id: Date.now(),
    text,
    completed: false,
  };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// Toggle task completion
app.put("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  let task = tasks.find((task) => task.id == id);
  if (task) {
    task.completed = !task.completed;
    res.json({ message: "Task updated", task });
  } else {
    res.status(404).json({ error: "Task not found" });
  }
});

// Delete task
app.delete("/api/tasks/:id", (req, res) => {
  const { id } = req.params;
  tasks = tasks.filter((task) => task.id != id);
  res.json({ message: "Task deleted" });
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Backend server running at http://localhost:${PORT}`);
});
