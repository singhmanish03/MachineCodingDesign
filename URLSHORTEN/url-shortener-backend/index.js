const express = require("express");
const mongoose = require("mongoose");
const shortid = require("shortid");
const dotenv = require("dotenv");
const cors = require('cors');

const app = express();

app.use(cors());  // Allow all origins (you can restrict this to specific domains if needed)


dotenv.config();

app.use(express.json()); // Parse JSON body

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// URL Schema
const urlSchema = new mongoose.Schema({
  originalUrl: { type: String, required: true ,unique: true},
  shortUrl: { type: String, required: true, unique: true },
});

const Url = mongoose.model("Url", urlSchema);

// Shorten URL endpoint
app.post("/shorten", async (req, res) => {
  const { originalUrl } = req.body;
  const shortUrl = shortid.generate();

  try {
    const url = new Url({ originalUrl, shortUrl });
    await url.save();
    res.status(201).json({ originalUrl, shortUrl: `${req.headers.host}/${shortUrl}`});
  } catch (error) {
    res.status(500).json({ error: "Error saving URL" });
  }
});

// Redirect endpoint
app.get("/:shortUrl", async (req, res) => {
    const { shortUrl } = req.params;
  
    try {
      const url = await Url.findOne({ shortUrl });
      if (url) {
        res.status(200).json({ originalUrl: url.originalUrl });
      } else {
        res.status(404).json({ error: "Short URL not found" });
      }
    } catch (error) {
      res.status(500).json({ error: "Server error" });
    }
  });
  

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
