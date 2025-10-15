export async function generateBio(prompt) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: "google/gemini-pro",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 200,
      temperature: 0.7
    })
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  const data = await response.json();
  return data.choices[0].message.content;
}
