const express = require("express");
const router = express.Router();
const aiRouter = require("../utils/aiRouter");

router.post("/", async (req, res) => {
  const { prompt } = req.body;

  if (!prompt) {
    return res.status(400).json({ error: "Prompt is required" });
  }

  try {
    const systemPrompt = `You are a travel planning assistant. Respond ONLY with a valid JSON object in the following structure:

{
  "destination": "...",
  "startDate": "...",
  "endDate": "...",
  "destinationOverview": "...",
  "currency": "...",
  "localTimeZone": "...",
  "vibeTags": ["...", "..."],
  "safetyTips": ["...", "..."],
  "mustTryFoods": ["...", "..."],
  "spotifyPlaylist": "...",
  "weatherSummary": "...",
  "emergencyContacts": {
    "localPolice": "...",
    "touristHelpdesk": "..."
  },
  "photos": ["url1", "url2"],
  "days": [
    {
      "day": 1,
      "date": "...",
      "title": "...",
      "activities": ["...", "..."],
      "weather": "...",
      "vibe": "...",
      "expenses": {
        "accommodation": 0,
        "food": 0,
        "transportation": 0,
        "activities": 0
      },
      "groupSplitOptions": ["...", "..."],
      "blogNotes": "...",
      "excitementLevel": 0
    }
  ],
  "totalExpenses": {
    "accommodation": 0,
    "food": 0,
    "transportation": 0,
    "activities": 0
  }
}
Ensure every value is realistic, and DO NOT include markdown or explanation.`;

    const fullPrompt = [
      { role: "system", content: systemPrompt },
      { role: "user", content: prompt },
    ];

    const response = await aiRouter(fullPrompt, {
      tripType: "Adventure",
      costPreference: "low", // Routing decision here
    });

    const content = response.choices[0].message.content;
    const json = JSON.parse(content);
    res.status(200).json(json);
  } catch (err) {
    console.error(
      "AI Router Error:",
      err?.response?.data || err.message || err
    );
    res.status(500).json({
      error: "Failed to generate itinerary",
      details: err?.response?.data || err.message,
    });
  }
});

module.exports = router;
