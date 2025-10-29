export const fetchGroqAI = async (prompt) => {
  try {
    const response = await fetch("http://localhost:5000/api/groq", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "gpt-4-mini",
        messages: [{ role: "user", content: prompt }],
        max_tokens: 200
      })
    });

    if (!response.ok) {
      const text = await response.text();
      throw new Error("AI API error: " + text);
    }

    const data = await response.json();

    if (data.choices && data.choices.length > 0) {
      return data.choices[0].message.content;
    }

    return "No response";
  } catch (err) {
    console.error(err);
    return "Failed to fetch AI response";
  }
};
