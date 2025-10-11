"use server";

import { Resend } from "resend";
import { ZodError } from "zod";
import { contactRateLimit, getClientIpFromHeaders } from "./rate-limit";
import { type ContactFormData, contactFormSchema } from "./validations";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstileToken(
  token: string,
  ip: string,
): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not configured");
    return false;
  }

  try {
    const response = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: secretKey,
          response: token,
          remoteip: ip,
        }),
      },
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Turnstile verification failed:", error);
    return false;
  }
}

function detectSpam(text: string): boolean {
  const spamPatterns =
    /viagra|casino|crypto|cryptocurrency|buy now|click here|make money fast|weight loss|lottery/i;
  return spamPatterns.test(text);
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const validated = contactFormSchema.parse(data);
    const ip = await getClientIpFromHeaders();

    const { success, limit, remaining, reset } =
      await contactRateLimit.limit(ip);

    if (!success) {
      const minutesUntilReset = Math.ceil((reset - Date.now()) / 1000 / 60);
      return {
        success: false,
        error: `Trop de tentatives. Veuillez réessayer dans ${minutesUntilReset} minute${minutesUntilReset > 1 ? "s" : ""}.`,
      };
    }

    const isValidToken = await verifyTurnstileToken(
      validated.turnstileToken,
      ip,
    );

    if (!isValidToken) {
      return {
        success: false,
        error: "Échec de la vérification anti-spam. Veuillez réessayer.",
      };
    }

    if (detectSpam(validated.message) || detectSpam(validated.subject)) {
      console.warn(`Potential spam detected from IP: ${ip}`);
      return {
        success: false,
        error: "Votre message a été détecté comme potentiellement indésirable.",
      };
    }

    const { error } = await resend.emails.send({
      from: "Portfolio <onboarding@simonfontaine.com>",
      to: "contact@simonfontaine.com",
      subject: `[Portfolio] ${validated.subject}`,
      replyTo: validated.email,
      text: `Name: ${validated.name}
Email: ${validated.email}
IP: ${ip}
Rate limit: ${remaining}/${limit} remaining

Message:
${validated.message}`,
    });

    if (error) {
      console.error("Failed to send email:", error);
      return {
        success: false,
        error: "Erreur lors de l'envoi du message. Veuillez réessayer.",
      };
    }

    return { success: true };
  } catch (error) {
    if (error instanceof ZodError) {
      return {
        success: false,
        error:
          "Données du formulaire invalides. Veuillez vérifier votre saisie.",
      };
    }

    console.error("Unexpected error sending email:", error);
    return {
      success: false,
      error: "Une erreur est survenue. Veuillez réessayer plus tard.",
    };
  }
}
