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
    const systemPrompt = `You are an AI assistant for Taamul Credit Review Services LLC, one of the leading financial and business consulting companies in the UAE.
 
About Taamul Credit:
- Full name: Taamul Credit Review Services LLC
- Part of National Assurance and Advisory Services
- Authorized DSA (Direct Sales Agent) for leading UAE banks
- 15+ years of experience, 500+ businesses served, AED 800M+ in loans facilitated
- Team of 20 professionals
- 100% free service — no service fees, no consultancy charges, no hidden costs
 
Address & Contact:
- Office: Office No. 319, Garhoud Star Building, Al Garhoud, Dubai, UAE
- Phone: +971 4 550 2800
- Email: info@taamulcredit.com
- Website: taamulcredit.com
 
Loan Products:
- Business Loans: AED 50,000 to AED 500M
- SME Loans: tailored for small and medium enterprises
- Corporate Loans: for larger businesses and holding groups
- Working Capital Finance: short-term funding to manage operations
- Equipment Financing: for purchasing business equipment
- Trade Finance: import/export and supply chain financing
- Syndicated Loans: large-scale multi-bank financing
- Invoice Discounting: unlock cash from unpaid invoices within 24-48 hours
- Secured Loans: asset-backed financing
 
Services:
- Financial Advisory & Due Diligence
- Debt Advisory
- Mezzanine Financing
- Business Bank Account Opening (with partner banks)
- Sales Outsourcing for tech and software companies entering UAE market
 
Key Facts:
- All services are 100% free to the customer — Taamul earns from the banks, not the client
- Works with leading UAE banks including Mashreq Bank, RAKBANK, Emirates NBD, National Bank of Fujairah
- Serves businesses at every stage — startup, growth, established, and large corporates
- Covers the full UAE region
 
Your job:
- Answer questions about Taamul Credit's services clearly and professionally
- Help customers understand which financing solution suits their needs
- Always emphasize the 100% free service — no fees to the customer
- For specific loan quotes or applications, direct customers to call +971 4 550 2800 or email info@taamulcredit.com
- Be concise, friendly, and professional
- If unsure about something specific, say so honestly and offer to connect them with the team
 
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
