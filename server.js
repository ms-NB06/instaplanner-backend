import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// ✅ Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ Connected to MongoDB"))
  .catch((err) => console.error("❌ MongoDB connection error:", err));

// ✅ Schema & Model
const ideaSchema = new mongoose.Schema({
  title: String,
  status: { type: String, default: "planned" },
});

const Idea = mongoose.model("Idea", ideaSchema);

// ✅ Route 1 – Test backend
app.get("/", (req, res) => {
  res.send("✨ InstaPlanner Backend + MongoDB is running successfully!");
});

// ✅ Route 2 – Get all ideas
app.get("/ideas", async (req, res) => {
  const ideas = await Idea.find();
  res.json(ideas);
});

// ✅ Route 3 – Add new idea
app.post("/ideas", async (req, res) => {
  const { title, status } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });

  const newIdea = new Idea({ title, status });
  await newIdea.save();
  res.status(201).json(newIdea);
});

// ✅ Route 4 – Delete idea
app.delete("/ideas/:id", async (req, res) => {
  await Idea.findByIdAndDelete(req.params.id);
  res.json({ message: "Idea deleted" });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('🚀 InstaPlanner backend running on port ${PORT}'));
