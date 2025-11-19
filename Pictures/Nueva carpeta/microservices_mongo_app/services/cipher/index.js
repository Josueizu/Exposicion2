import express from "express";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const app = express();
app.use(express.json());

// 👉 MongoDB Local
await mongoose.connect("mongodb://localhost:27017/micro_app_db");
console.log("Cipher → MongoDB LOCAL connected");

const Schema = new mongoose.Schema({
  filename: String,
  encrypted: String
});

const CipherFile = mongoose.model("CipherFile", Schema);

app.post("/encrypt", async (req, res) => {
  const { filename, content, key } = req.body;

  const encrypted = CryptoJS.AES.encrypt(content, key).toString();

  const file = await CipherFile.create({ filename, encrypted });

  res.json({ id: file._id, encrypted });
});

app.listen(5003, () => console.log("Cipher running on :5003"));
