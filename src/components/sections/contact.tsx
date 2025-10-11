"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Turnstile } from "@marsidev/react-turnstile";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { SectionContainer } from "@/components/section-container";
import { SocialLinks } from "@/components/social-links";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { sendContactEmail } from "@/lib/actions";
import { SITE_CONFIG } from "@/lib/constants";
import { type ContactFormData, contactFormSchema } from "@/lib/validations";

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState<string>("");
  const [turnstileWidgetId, setTurnstileWidgetId] = useState<string>("");

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
      turnstileToken: "",
    },
  });

  const resetTurnstile = () => {
    if (turnstileWidgetId && window.turnstile) {
      window.turnstile.reset(turnstileWidgetId);
    }
  };

  async function onSubmit(data: ContactFormData) {
    if (!turnstileToken) {
      toast.error("Erreur", {
        description: "Veuillez vérifier que vous êtes humain",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const result = await sendContactEmail({
        ...data,
        turnstileToken,
      });

      if (result.success) {
        toast.success("Message envoyé !", {
          description: "Je vous répondrai dans les plus brefs délais.",
        });
        form.reset();
        setTurnstileToken("");
        resetTurnstile();
      } else {
        toast.error("Erreur", {
          description: result.error || "Une erreur est survenue",
        });
        resetTurnstile();
      }
    } catch (error) {
      console.error("Contact form error:", error);

      toast.error("Erreur", {
        description:
          "Une erreur est survenue lors de l'envoi. Veuillez réessayer.",
      });

      resetTurnstile();
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <SectionContainer id="contact" ariaLabel="Me contacter">
      <div className="max-w-6xl mx-auto">
        <div className="space-y-4 mb-8 sm:mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold">
            Contactez-moi
          </h2>
          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl">
            Une opportunité de stage ? Un projet ? N'hésitez pas à me contacter
            !
          </p>
        </div>

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="p-6 sm:p-8 lg:p-10 rounded-xl border bg-card shadow-sm">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-6"
                >
                  <div className="grid gap-6 sm:grid-cols-2">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom</FormLabel>
                          <FormControl>
                            <Input placeholder="Votre nom" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              placeholder="votre@email.com"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="subject"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Sujet</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Sujet de votre message"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="message"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Message</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Décrivez votre projet, opportunité ou question..."
                            className="min-h-[180px] resize-y"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-6 pt-2">
                    <FormField
                      control={form.control}
                      name="turnstileToken"
                      render={() => (
                        <FormItem>
                          <FormControl>
                            <div className="flex items-center justify-start">
                              <Turnstile
                                siteKey={
                                  process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY ||
                                  ""
                                }
                                options={{
                                  theme: "auto",
                                  size: "normal",
                                }}
                                onSuccess={(token) => {
                                  setTurnstileToken(token);
                                  form.setValue("turnstileToken", token);
                                }}
                                onError={() => {
                                  setTurnstileToken("");
                                  form.setValue("turnstileToken", "");
                                  toast.error("Erreur", {
                                    description:
                                      "Erreur lors de la vérification. Veuillez réessayer.",
                                  });
                                }}
                                onExpire={() => {
                                  setTurnstileToken("");
                                  form.setValue("turnstileToken", "");
                                }}
                                onWidgetLoad={(widgetId) => {
                                  setTurnstileWidgetId(widgetId);
                                }}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <div className="flex flex-col sm:flex-row gap-3 sm:items-center sm:justify-between pt-2">
                      <p className="text-sm text-muted-foreground">
                        Je vous répondrai dans les 24-48h
                      </p>
                      <Button
                        type="submit"
                        size="lg"
                        className="w-full sm:w-auto sm:min-w-[180px]"
                        disabled={isSubmitting || !turnstileToken}
                      >
                        {isSubmitting && <Spinner />}
                        {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                      </Button>
                    </div>
                  </div>
                </form>
              </Form>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Contact direct</h3>
                <p className="text-sm text-muted-foreground">
                  Préférez un contact direct ?
                </p>
              </div>
              <Button
                variant="outline"
                size="lg"
                asChild
                className="w-full justify-start"
              >
                <a href={`mailto:${SITE_CONFIG.email}`}>
                  <Mail className="mr-2 size-4" aria-hidden="true" />
                  <span className="truncate text-sm">{SITE_CONFIG.email}</span>
                </a>
              </Button>
            </div>

            <div className="p-6 rounded-xl border bg-card shadow-sm space-y-4">
              <div className="space-y-2">
                <h3 className="font-semibold text-lg">Réseaux sociaux</h3>
                <p className="text-sm text-muted-foreground">
                  Retrouvez-moi également sur
                </p>
              </div>
              <SocialLinks className="flex items-center gap-3" />
            </div>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
