interface Env {
  GOOGLE_SCRIPT_URL: string;
  ALLOWED_ORIGIN: string;
}

export function corsHeaders(request: Request, env: Env): Record<string, string> {
  const origin = request.headers.get("Origin") || "";
  const allowed = env.ALLOWED_ORIGIN || "*";
  const effectiveOrigin = allowed === "*" ? "*" : origin === allowed ? origin : "";

  return {
    "Access-Control-Allow-Origin": effectiveOrigin,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type",
    "Access-Control-Max-Age": "86400",
  };
}

export function handleOptions(request: Request, env: Env): Response {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(request, env),
  });
}

export function jsonResponse(
  body: Record<string, unknown>,
  status: number,
  request: Request,
  env: Env
): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      ...corsHeaders(request, env),
      "Content-Type": "application/json",
    },
  });
}
