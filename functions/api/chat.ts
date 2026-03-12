// Cloudflare Pages Function - /api/chat
// This runs as a Cloudflare Worker at the edge

export async function onRequestPost(context) {
  const { request, env } = context;

  // CORS headers
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Content-Type": "application/json",
  };

  try {
    const { message, history = [] } = await request.json();

    if (!message) {
      return new Response(JSON.stringify({ error: "No message provided" }), {
        status: 400,
        headers: corsHeaders,
      });
    }

    // System prompt about Taamul Credit
    const systemPrompt = `You are an AI assistant for Taamul Credit Review Services, a business financing solutions company based in the UAE.

About Taamul Credit:
- Specializes in credit review and business financing solutions
- Services include: Credit Review, Financial Advisory, Due Diligence, Invoice Discounting, Trade Finance, SME Loans, Working Capital Finance
- Partner banks include: Mashreq Bank, RAKBANK, Emirates NBD, Abu Dhabi Commercial Bank, and other UAE banks
- Located in the UAE, serving businesses across the region
- Website: taamulcredit.com
- For appointments and inquiries: customers can contact through the website

Your job:
- Answer questions about Taamul Credit's services clearly and professionally
- Help customers understand which financing solutions suit their needs
- Explain eligibility, processes, and timelines where you know them
- For specific quotes or applications, always direct customers to contact Taamul Credit directly
- Be concise, professional, and helpful
- If you don't know something specific, say so and offer to connect them with the team

Keep responses concise — 2-4 sentences unless more detail is clearly needed.`;

    // Build messages array with history
    const messages = [
      ...history.slice(-10), // keep last 10 messages for context
      { role: "user", content: message },
    ];

    // Call DeepSeek API
    const response = await fetch("https://api.deepseek.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${env.DEEPSEEK_API_KEY}`,
      },
      body: JSON.stringify({
        model: "deepseek-chat",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        max_tokens: 500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error("DeepSeek error:", err);
      return new Response(
        JSON.stringify({ error: "AI service unavailable. Please contact us directly." }),
        { status: 502, headers: corsHeaders }
      );
    }

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";

    return new Response(JSON.stringify({ reply }), {
      status: 200,
      headers: corsHeaders,
    });
  } catch (err) {
    console.error("Chat error:", err);
    return new Response(
      JSON.stringify({ error: "Something went wrong. Please try again." }),
      { status: 500, headers: corsHeaders }
    );
  }
}

// Handle preflight CORS requests
export async function onRequestOptions() {
  return new Response(null, {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
