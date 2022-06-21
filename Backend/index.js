import express from "express";
import "dotenv/config";
import "./database/connectDB.js";
const app = express();
app.get("/", (req, res) => {
  res.json({ ok: true });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log("http://localhost:" + PORT));
