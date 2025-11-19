const express = require("express");
const mongoose = require("mongoose");

const app = express();
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/micro_app_db")
  .then(() => console.log("Semantic → MongoDB LOCAL connected"))
  .catch(err => console.log(err));

const Schema = new mongoose.Schema({
  text: String,
  tags: [String]
});
const Semantic = mongoose.model("Semantic", Schema);

app.post("/analyze", async (req, res) => {
  const text = req.body.text || "";
  const tags = text.split(" ").filter(w => w.length > 3);

  const doc = await Semantic.create({ text, tags });

  res.json({ tags, id: doc._id });
});

app.listen(5001, () => console.log("Semantic running on :5001"));
