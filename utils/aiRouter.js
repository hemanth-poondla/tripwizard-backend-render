const { callGPT, callClaude } = require("./aiEngines");

const aiRouter = async (prompt, meta = {}) => {
  const { tripType, costPreference } = meta;

  try {
    // Route based on preference
    if (costPreference === "low") {
      console.log("🧠 Using Claude due to low-cost preference");
      return await callClaude(prompt);
    }

    // Default to GPT
    console.log("🧠 Using GPT (default)");
    return await callGPT(prompt);
  } catch (primaryErr) {
    console.warn("⚠️ Primary engine failed:", primaryErr.message);

    try {
      console.log("🔁 Trying fallback: Claude");
      return await callClaude(prompt);
    } catch (fallbackErr) {
      console.error("❌ Fallback engine also failed:", fallbackErr.message);
      throw fallbackErr;
    }
  }
};

module.exports = aiRouter;
