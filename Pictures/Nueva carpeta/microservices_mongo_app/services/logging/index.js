import express from "express";
import mongoose from "mongoose";

const app = express();
app.use(express.json());

// 👉 MongoDB Local
await mongoose.connect("mongodb://localhost:27017/micro_app_db");
console.log("Logging → MongoDB LOCAL connected");

const Log = mongoose.model(
  "Log",
  new mongoose.Schema({
    text: String,
    created: { type: Date, default: Date.now }
  })
);

app.post("/log", async (req, res) => {
  const log = await Log.create({ text: req.body.text });
  res.json(log);
});

app.get("/logs", async (req, res) => {
  const logs = await Log.find().sort({ created: -1 });
  res.json(logs);
});

app.listen(5005, () => console.log("Logging running on :5005"));
