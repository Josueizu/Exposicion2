import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// 👉 MongoDB Local
await mongoose.connect("mongodb://localhost:27017/micro_app_db");
console.log("Risk → MongoDB LOCAL connected");

app.post("/assess", async (req, res) => {
  const tags = req.body.tags || [];
  let score = tags.length * 10;
  let level = score > 50 ? "ALTO" : "BAJO";

  res.json({ score, level });
});

app.listen(5002, () => console.log("Risk running on :5002"));
