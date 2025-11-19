import express from "express";
import mongoose from "mongoose";
import CryptoJS from "crypto-js";

const app = express();
app.use(express.json());

// 👉 MongoDB Local
await mongoose.connect("mongodb://localhost:27017/micro_app_db");
console.log("Decipher → MongoDB LOCAL connected");

const CipherSchema = new mongoose.Schema({
  encrypted: String
});

const CipherFile = mongoose.model("CipherFile", CipherSchema);

app.post("/decrypt", async (req, res) => {
  const { id, key } = req.body;

  const file = await CipherFile.findById(id);
  if (!file) return res.json({ error: "File not found" });

  const bytes = CryptoJS.AES.decrypt(file.encrypted, key);
  const decrypted = bytes.toString(CryptoJS.enc.Utf8);

  res.json({ decrypted });
});

app.listen(5004, () => console.log("Decipher running on :5004"));
