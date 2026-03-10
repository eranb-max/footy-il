exports.handler = async function(event) {
  const headers = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Content-Type": "application/json"
  };
  if (event.httpMethod === "OPTIONS") return { statusCode: 200, headers, body: "" };
  if (event.httpMethod !== "POST") return { statusCode: 405, headers, body: "Method Not Allowed" };
  try {
    const { system, messages } = JSON.parse(event.body);
    const r = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "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",
        "anthropic-version": "2023-06-01"
      },
      body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1024, system, messages })
    });
    const data = await r.json();
    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: { message: err.message } }) };
  }
};
