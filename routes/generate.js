const express = require("express");
const router = express.Router();
const {
    OpenAI
} = require("openai");

const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
});

router.post("/", async (req, res) => {
    const {
        prompt
    } = req.body;
    if (!prompt) return res.status(400).json({
        error: "Prompt is required"
    });

    try {
        const response = await openai.chat.completions.create({
            model: "openai/gpt-3.5-turbo",
            messages: [{
                    role: "system",
                    content: `You are a travel planning assistant. Respond ONLY with a valid JSON object in the following structure:

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
                          "blogNotes": "..."
                        }
                      ],
                      "totalExpenses": {
                        "accommodation": 0,
                        "food": 0,
                        "transportation": 0,
                        "activities": 0
                      }
                    }
                    Ensure every value is realistic, and DO NOT include markdown or explanation.`,
                },
                {
                    role: "user",
                    content: prompt,
                },
            ],
            temperature: 0.7,
        });

        const text = response.choices[0].message.content;
        const json = JSON.parse(text);
        res.json(json);
    } catch (err) {
        console.error(
            "OpenRouter Error:",
            err?.response?.data || err.message || err
        );
        res.status(500).json({
            error: "Failed to generate itinerary",
            details: err?.response?.data || err.message,
        });
    }
});

module.exports = router;