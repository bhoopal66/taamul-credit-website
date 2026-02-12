import { handleOptions, jsonResponse } from "../_shared/cors";
import { validateNewsletter, sanitize } from "../_shared/validation";

interface Env {
  GOOGLE_SCRIPT_URL: string;
  ALLOWED_ORIGIN: string;
}

export const onRequestOptions: PagesFunction<Env> = async ({ request, env }) => {
  return handleOptions(request, env);
};

export const onRequestPost: PagesFunction<Env> = async ({ request, env }) => {
  try {
    const data = await request.json() as Record<string, unknown>;

    const validation = validateNewsletter(data);
    if (!validation.valid) {
      return jsonResponse({ success: false, errors: validation.errors }, 400, request, env);
    }

    const payload = {
      type: "newsletter",
      email: sanitize(data.email),
    };

    const response = await fetch(env.GOOGLE_SCRIPT_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      redirect: "follow",
    });

    const result = await response.json() as { success: boolean };

    if (!result.success) {
      return jsonResponse({ success: false, error: "Failed to subscribe" }, 500, request, env);
    }

    return jsonResponse({ success: true }, 200, request, env);
  } catch {
    return jsonResponse({ success: false, error: "Internal server error" }, 500, request, env);
  }
};
