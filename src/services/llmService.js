// Fetch LLM-based suggestions from OpenAI

export async function getLLMSuggestion(currentCode) {
    const response = await fetch("https://api.openai.com/v1/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.REACT_APP_OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-4-code",
        prompt: `Provide a Solidity code suggestion based on the following code:\n${currentCode}`,
        max_tokens: 50
      })
    });
  
    const data = await response.json();
    return data.choices[0].text.trim();
  }
  