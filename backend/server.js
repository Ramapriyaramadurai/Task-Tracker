const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Replace this with your actual MongoDB connection string
mongoose.connect("mongodb+srv://Taskuser:user1234@cluster0.vkz1zo5.mongodb.net/tasktracker?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error(" MongoDB connection error:", err);
});

const Task = mongoose.model("Task", new mongoose.Schema({
  name: String
}));

app.post("/tasks", async (req, res) => {
  const task = new Task({ name: req.body.name });
  await task.save();
  res.send(task);
});

app.get("/tasks", async (req, res) => {
  const tasks = await Task.find();
  res.send(tasks);
});
// ❌ DELETE a task by ID
app.delete("/tasks/:id", async (req, res) => {
  const result = await Task.findByIdAndDelete(req.params.id);
  res.send(result);
});


app.listen(5000, () => console.log("🚀 Server running on http://localhost:5000"));
