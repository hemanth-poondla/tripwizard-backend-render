const { OpenAI } = require("openai");

// GPT via OpenRouter
const callGPT = async (messages) => {
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  return await openai.chat.completions.create({
    model: "openai/gpt-3.5-turbo", // downgrade for cost efficiency
    messages,
    temperature: 0.7,
  });
};

// Claude via OpenRouter
const callClaude = async (messages) => {
  console.log("🚀 Claude function HIT ✅");
  const openai = new OpenAI({
    apiKey: process.env.OPENROUTER_API_KEY,
    baseURL: "https://openrouter.ai/api/v1",
  });

  return await openai.chat.completions.create({
    model: "anthropic/claude-3-haiku", // Free/cheaper model fallback
    messages,
    temperature: 0.7,
  });
};

// Future placeholders
const callGrok = async (messages) => {
  throw new Error("Grok integration not yet implemented.");
};

const callGemini = async (messages) => {
  throw new Error("Gemini integration not yet implemented.");
};

module.exports = {
  callGPT,
  callClaude,
  callGrok,
  callGemini,
};
