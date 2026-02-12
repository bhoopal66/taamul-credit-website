export function sanitize(input: unknown): string {
  if (!input) return "";
  let str = String(input).trim().substring(0, 500);
  // Prevent spreadsheet formula injection
  if (/^[=+\-@]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

export function isValidEmail(email: unknown): boolean {
  if (!email || typeof email !== "string") return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function isValidPhone(phone: unknown): boolean {
  if (!phone || typeof phone !== "string") return false;
  const digits = phone.replace(/\D/g, "");
  return digits.length >= 7 && digits.length <= 15;
}

interface ValidationResult {
  valid: boolean;
  errors: Record<string, string>;
}

export function validateContact(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    errors.name = "Name is required";
  }
  if (!isValidEmail(data.email)) {
    errors.email = "Valid email is required";
  }
  if (!isValidPhone(data.phone)) {
    errors.phone = "Valid phone number is required";
  }
  if (!data.subject || typeof data.subject !== "string") {
    errors.subject = "Subject is required";
  }
  if (!data.message || typeof data.message !== "string" || !data.message.trim()) {
    errors.message = "Message is required";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateCallback(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!data.name || typeof data.name !== "string" || !data.name.trim()) {
    errors.name = "Name is required";
  }
  if (!isValidPhone(data.phone)) {
    errors.phone = "Valid phone number is required";
  }
  if (!data.preferredTime || !["morning", "afternoon", "evening"].includes(data.preferredTime as string)) {
    errors.preferredTime = "Preferred time is required";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export function validateNewsletter(data: Record<string, unknown>): ValidationResult {
  const errors: Record<string, string> = {};

  if (!isValidEmail(data.email)) {
    errors.email = "Valid email is required";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}
