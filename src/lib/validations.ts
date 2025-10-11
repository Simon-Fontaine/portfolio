import { z } from "zod";

export const contactFormSchema = z.object({
  name: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.email("Email invalide"),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z
    .string()
    .min(10, "Le message doit contenir au moins 10 caractères"),
  turnstileToken: z.string().min(1, "Veuillez vérifier que vous êtes humain"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
