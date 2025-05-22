const express = require('express');
const router = express.Router();
const { OpenAI } = require('openai');

const openai = new OpenAI({
  apiKey: process.env.OPENROUTER_API_KEY,
  baseURL: "https://openrouter.ai/api/v1"
});

router.post('/', async (req, res) => {
  const { prompt } = req.body;
  if (!prompt) return res.status(400).json({ error: "Prompt is required" });

  try {
    const response = await openai.chat.completions.create({
      model: "mistralai/mixtral-8x7b",
      messages: [
        {
          role: "system",
          content: `You are a travel planning assistant. Format the itinerary in a JSON structure with:
- destination
- startDate, endDate
- days: [ { day, date, title, activities[], expenses{}, groupSplitOptions[], blogNotes } ]
- totalExpenses: {}
Return ONLY valid JSON.`
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.7
    });

    const text = response.choices[0].message.content;
    const json = JSON.parse(text);
    res.json(json);
  } catch (err) {
    console.error("Error from OpenRouter:", err.message);
    res.status(500).json({ error: "Failed to generate itinerary" });
  }
});

module.exports = router;