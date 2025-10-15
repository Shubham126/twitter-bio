export async function generateBio(prompt) {
  const apiKey = import.meta.env.VITE_OPENROUTER_API_KEY;
  const siteUrl = "https://www.twitterbio.io/"; // Change to your site URL
  const siteName = "twitterbio.io"; // Change to your site name

  const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      "HTTP-Referer": siteUrl, // Optional, for OpenRouter rankings
      "X-Title": siteName,     // Optional, for OpenRouter rankings
    },
    body: JSON.stringify({
      model: "google/gemini-2.5-flash-lite-preview-09-2025",
      messages: [
        {
          role: "user",
          content: prompt
        }
      ],
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
