"use server";

import { INQUIRY_BUDGETS, INQUIRY_SERVICES, INQUIRY_TIMELINES } from "@/data/content";

export type InquiryField = "name" | "email" | "studio" | "message";

export type InquiryState = {
  status: "idle" | "success" | "error";
  message?: string;
  errors?: Partial<Record<InquiryField, string>>;
  values?: Record<string, string>;
};

const LIMITS = { name: 120, email: 200, studio: 160, message: 4000 } as const;
const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const text = (formData: FormData, key: string) => String(formData.get(key) ?? "").trim();
const pick = (value: string, allowed: readonly string[]) => (allowed.includes(value) ? value : "");

export async function submitInquiry(_prev: InquiryState, formData: FormData): Promise<InquiryState> {
  // Honeypot: real people never see or fill this field.
  if (text(formData, "company_website")) return { status: "success" };

  const values = {
    name: text(formData, "name"),
    email: text(formData, "email"),
    studio: text(formData, "studio"),
    message: text(formData, "message"),
    budget: pick(text(formData, "budget"), INQUIRY_BUDGETS),
    timeline: pick(text(formData, "timeline"), INQUIRY_TIMELINES),
  };
  const services = formData
    .getAll("services")
    .map(String)
    .filter((s) => (INQUIRY_SERVICES as readonly string[]).includes(s));

  const echo = { ...values, services: services.join("|") };

  const errors: InquiryState["errors"] = {};
  if (!values.name) errors.name = "Please tell us your name.";
  if (!EMAIL.test(values.email)) errors.email = "Please enter a valid email address.";
  if (values.message.length < 20) errors.message = "A couple of sentences about your game helps us reply properly.";
  for (const key of Object.keys(LIMITS) as InquiryField[]) {
    if (values[key].length > LIMITS[key]) errors[key] = "That's a little too long.";
  }
  if (Object.keys(errors).length) {
    return { status: "error", message: "Please check the highlighted fields.", errors, values: echo };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.INQUIRY_TO_EMAIL;
  const from = process.env.INQUIRY_FROM_EMAIL ?? "Retro Vision <onboarding@resend.dev>";
  if (!apiKey || !to) {
    // Never pretend: without a mail provider the inquiry is not delivered.
    return {
      status: "error",
      message: "Our inquiry form isn't connected yet, so this message wasn't sent. Please try again soon.",
      values: echo,
    };
  }

  const body = [
    `Name: ${values.name}`,
    `Email: ${values.email}`,
    `Studio / game: ${values.studio || "—"}`,
    `Services: ${services.join(", ") || "—"}`,
    `Budget: ${values.budget || "—"}`,
    `Timeline: ${values.timeline || "—"}`,
    "",
    values.message,
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: values.email,
        subject: `New project inquiry — ${values.studio || values.name}`,
        text: body,
      }),
    });
    if (!response.ok) throw new Error(`Resend responded ${response.status}`);
  } catch (error) {
    // Log the failure, never the visitor's message.
    console.error("Inquiry delivery failed:", error instanceof Error ? error.message : error);
    return {
      status: "error",
      message: "Something went wrong sending your message. Please try again in a moment.",
      values: echo,
    };
  }

  return { status: "success", message: "Thanks — your inquiry is on its way. We'll reply by email." };
}
