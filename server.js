import express from "express";
import cors from "cors";

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Test route (you can edit or add more later)
app.get("/", (req, res) => {
  res.send("🚀 InstaPlanner backend is live and running!");
});

// Example route for testing connection from frontend
app.post("/api/test", (req, res) => {
  const data = req.body;
  res.json({ message: "Received successfully!", yourData: data });
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(✅ Server running on port ${PORT});
});

