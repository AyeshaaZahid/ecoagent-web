export async function getEcoAIAdvice(weatherData) {
  const GROQ_API_KEY = import.meta.env.VITE_AI_API_KEY;
  if (!GROQ_API_KEY) {
    console.error("Groq API key missing!");
    return { prediction: "API key missing", reasoning: "Please add your Groq key." };
  }

  const prompt = `
  Analyze the following weather data and predict short-term environmental risks.
  Provide sustainability advice in 2–3 lines.

  Data:
  City: ${weatherData.city}
  Temp: ${weatherData.temp}°C
  Humidity: ${weatherData.humidity}%
  Wind: ${weatherData.wind} m/s
  Condition: ${weatherData.desc}

  Reply in plain English, structured as:
  Prediction:
  Reasoning:
  Advice:
  `;

  try {
    const res = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${VITE_AI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "llama3-8b-8192",
        messages: [{ role: "user", content: prompt }],
        temperature: 0.7,
      }),
    });

    const json = await res.json();
    const text = json.choices?.[0]?.message?.content || "No response from AI.";
    const [prediction, reasoning, advice] = text.split(/Prediction:|Reasoning:|Advice:/).slice(1);

    return {
      prediction: prediction?.trim() || "N/A",
      reasoning: reasoning?.trim() || "N/A",
      advice: advice?.trim() || "N/A",
    };
  } catch (err) {
    console.error("AI error:", err);
    return { prediction: "Error", reasoning: err.message, advice: "Please retry." };
  }
}
