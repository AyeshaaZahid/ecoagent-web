// backend/server.js

import express from "express";
import fetch from "node-fetch";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Helper function to forward request to Groq AI
const callGroqAI = async (prompt) => {
  try {
    const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-mini",
        messages: [
          {
            role: "system",
            content: "You are an AI environmental assistant. Provide Prediction, Reasoning, and Advice in a clear format."
          },
          {
            role: "user",
            content: prompt
          }
        ],
        max_tokens: 300
      }),
    });

    const data = await response.json();
    console.log("Response from Groq:", data); // Log the AI response
    return data;
  } catch (err) {
    console.error("Error calling Groq:", err);
    throw err;
  }
};

// API endpoint for React app
app.post("/api/groq", async (req, res) => {
  try {
    const { prompt } = req.body;
    if (!prompt) return res.status(400).json({ error: "Prompt is required" });

    console.log("Received prompt:", prompt);

    const data = await callGroqAI(prompt);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Start the backend proxy
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Backend proxy running on port ${PORT}`);
});
