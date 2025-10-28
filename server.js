import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// Temporary storage for your ideas (in-memory)
let ideas = [
  { id: 1, title: "Morning outfit reel", status: "planned" },
  { id: 2, title: "Diwali makeup look", status: "done" }
];

// ✅ Route 1 — To test if backend is working
app.get("/", (req, res) => {
  res.send("✨ InstaPlanner Backend is running successfully!");
});

// ✅ Route 2 — Get all content ideas
app.get("/ideas", (req, res) => {
  res.json(ideas);
});

// ✅ Route 3 — Add a new content idea
app.post("/ideas", (req, res) => {
  const { title, status } = req.body;
  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }
  const newIdea = { id: Date.now(), title, status: status || "planned" };
  ideas.push(newIdea);
  res.status(201).json(newIdea);
});

// ✅ Route 4 — Delete a content idea
app.delete("/ideas/:id", (req, res) => {
  const id = parseInt(req.params.id);
  ideas = ideas.filter((idea) => idea.id !== id);
  res.json({ message: "Idea deleted" });
});

// ✅ Server start
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('🚀 InstaPlanner backend running on port ${PORT}'));
