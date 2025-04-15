
const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const SNUSBASE_API_KEY = "sb3x8zb76wryysw6z6e7obsakyx4la"; // 👈 Replace this before deploying

app.get("/search", async (req, res) => {
  const query = req.query.q;
  if (!query) return res.status(400).json({ error: "Missing query." });

  try {
    const snusRes = await axios.get(`https://api.snusbase.com/v3/search?q=${encodeURIComponent(query)}`, {
      headers: {
        Authorization: `Bearer ${SNUSBASE_API_KEY}`
      }
    });
    res.json(snusRes.data);
  } catch (err) {
    res.status(500).json({ error: "Error fetching data", detail: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
