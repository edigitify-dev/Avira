import type { ContactInput } from "./types";

export const uuidPattern = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function validateContact(body: Record<string, unknown>):
  { data: ContactInput; error?: never } | { error: string; data?: never } {
  const text = (key: string) => typeof body[key] === "string" ? body[key].trim() : "";
  const data: ContactInput = {
    name: text("name"), email: text("email").toLowerCase(),
    organisation: text("organisation"), phone: text("phone"),
    message: text("message"), requestId: text("requestId"),
  };
  if (!data.name || data.name.length > 120) return { error: "Please enter your name (up to 120 characters)." };
  if (data.email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    return { error: "Please enter a valid email address." };
  }
  if (data.organisation.length > 160) return { error: "Please keep the organisation name under 160 characters." };
  if (data.phone.length > 40 || (data.phone && !/^[+\d\s().\-x]{5,40}$/i.test(data.phone))) {
    return { error: "Please enter a valid contact number." };
  }
  if (!data.message || data.message.length > 500) return { error: "Please enter a message of up to 500 characters." };
  if (!uuidPattern.test(data.requestId)) return { error: "Please refresh the page and try again." };
  if ([data.name, data.email, data.organisation, data.phone].some(value => /[\u0000-\u001f\u007f]/.test(value)) || /\u0000/.test(data.message)) {
    return { error: "Please remove unsupported characters and try again." };
  }
  return { data };
}
