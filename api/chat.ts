export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405 });
  }

  try {
    const { textToSubmit, systemInstruction } = await req.json();
    
    // Grabs the secure key from the environment. Use globalThis to avoid "process" not defined in edge runtime.
    const apiKey = (globalThis as any).process?.env?.GEMINI_API_KEY ?? (globalThis as any).GEMINI_API_KEY;

    if (!apiKey) {
      return new Response(
        JSON.stringify({ error: 'API key is missing' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: textToSubmit }] }],
          systemInstruction: { parts: [{ text: systemInstruction }] }
        }),
      }
    );

    const data = await response.json();
    let text = data.candidates?.[0]?.content?.parts?.[0]?.text || "I couldn't think of a response right now.";
    text = text.replace(/\*\*/g, "");

    return new Response(
      JSON.stringify({ text }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (e) {
    console.error(e);
    return new Response(
      JSON.stringify({ text: "My brain is taking a quick nap. Please email Nam directly instead!" }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}