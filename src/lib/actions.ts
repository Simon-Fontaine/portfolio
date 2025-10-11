"use server";

import { Resend } from "resend";
import { type ContactFormData, contactFormSchema } from "./validations";

const resend = new Resend(process.env.RESEND_API_KEY);

async function verifyTurnstileToken(token: string): Promise<boolean> {
  const secretKey = process.env.TURNSTILE_SECRET_KEY;

  if (!secretKey) {
    console.error("TURNSTILE_SECRET_KEY is not set");
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
        }),
      },
    );

    const data = await response.json();
    return data.success === true;
  } catch (error) {
    console.error("Error verifying Turnstile token:", error);
    return false;
  }
}

export async function sendContactEmail(data: ContactFormData) {
  try {
    const validated = contactFormSchema.parse(data);

    // Vérifier le token Turnstile
    const isValidToken = await verifyTurnstileToken(validated.turnstileToken);

    if (!isValidToken) {
      return {
        success: false,
        error: "Échec de la vérification anti-spam. Veuillez réessayer.",
      };
    }

    await resend.emails.send({
      from: "Portfolio <onboarding@simonfontaine.com>",
      to: "contact@simonfontaine.com",
      subject: `[Portfolio] ${validated.subject}`,
      replyTo: validated.email,
      text: `
      Nom: ${validated.name}
      Email: ${validated.email}
      Message:
      ${validated.message}
      `,
    });

    return { success: true };
  } catch (error) {
    console.error("Error sending email:", error);
    return { success: false, error: "Erreur lors de l'envoi du message" };
  }
}
