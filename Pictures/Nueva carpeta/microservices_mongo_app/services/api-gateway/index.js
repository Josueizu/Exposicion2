import express from "express";
import cors from "cors";
import axios from "axios";

const app = express();
app.use(cors());
app.use(express.json());

const SERVICE = {
  semantic: "http://localhost:5001",
  risk: "http://localhost:5002",
  cipher: "http://localhost:5003",
  decipher: "http://localhost:5004",
  logging: "http://localhost:5005"
};

app.post("/api/analyze", async (req, res) => {
  try {
    const r = await axios.post(`${SERVICE.semantic}/analyze`, req.body);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Semantic service failed" });
  }
});

app.post("/api/assess", async (req, res) => {
  try {
    const r = await axios.post(`${SERVICE.risk}/assess`, req.body);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Risk service failed" });
  }
});

app.post("/api/encrypt", async (req, res) => {
  try {
    const r = await axios.post(`${SERVICE.cipher}/encrypt`, req.body);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Cipher service failed" });
  }
});

app.post("/api/decrypt", async (req, res) => {
  try {
    const r = await axios.post(`${SERVICE.decipher}/decrypt`, req.body);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Decipher service failed" });
  }
});

app.get("/api/logs", async (req, res) => {
  try {
    const r = await axios.get(`${SERVICE.logging}/logs`);
    res.json(r.data);
  } catch (err) {
    res.status(500).json({ error: "Logging service failed" });
  }
});

app.listen(4000, () =>
  console.log("API Gateway running on http://localhost:4000")
);
