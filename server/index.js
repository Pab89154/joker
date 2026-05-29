import cors from "cors";
import express from "express";
import { pickJoke } from "./jokes.js";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.post("/api/joke", (req, res) => {
  const { genre } = req.body;

  if (!genre || typeof genre !== "string") {
    return res.status(400).json({ error: "Genre is required." });
  }

  const joke = pickJoke(genre);

  if (!joke) {
    return res.status(404).json({ error: "No jokes found for that genre." });
  }

  res.json({ joke });
});

app.listen(PORT, () => {
  console.log(`Joker API running at http://localhost:${PORT}`);
});
