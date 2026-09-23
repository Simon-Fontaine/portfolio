import { notFound } from "next/navigation";
import { setRequestLocale } from "next-intl/server";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { HeroSection } from "@/components/sections/hero";
import { InternshipSection } from "@/components/sections/internship";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { locales } from "@/i18n/generated/locales";
import { loadMessages } from "@/i18n/generated/messages";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!locales.includes(locale)) notFound();
  setRequestLocale(locale);
  const m = await loadMessages(locale);
  return (
    <>
      <HeroSection m={m} locale={locale} />
      <InternshipSection m={m.experience} />
      <ProjectsSection m={m.projects} common={m.common} />
      <SkillsSection m={m.skills} />
      <EducationSection m={m.education} />
      <ContactSection m={m} locale={locale} />
    </>
  );
}
