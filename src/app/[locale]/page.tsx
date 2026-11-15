import { notFound } from "next/navigation";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { ExperienceSection } from "@/components/sections/experience";
import { Hero } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";
import { isLocale } from "@/i18n/config";
import { type Content, getContent } from "@/lib/content";
import { siteUrl } from "@/lib/site";

/** schema.org Person data for search engines. */
function personJsonLd({ profile: p, locale }: Content) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.headline,
    description: p.summary,
    url: new URL(`/${locale}`, siteUrl).href,
    email: `mailto:${p.email}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: p.location.city,
      addressCountry: p.location.country,
    },
    sameAs: p.social.map((link) => link.url),
    alumniOf: p.education
      .filter((item) => item.url)
      .slice(0, 2)
      .map((item) => ({
        "@type": "EducationalOrganization",
        name: item.school,
        url: item.url,
      })),
    knowsLanguage: p.languages.map((language) => language.name),
    knowsAbout: p.skills.flatMap((group) => group.items),
  };
}

export default async function HomePage({ params }: PageProps<"/[locale]">) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  const content = getContent(locale);
  // Escape "<" so the JSON can never close the <script> tag.
  const jsonLd = JSON.stringify(personJsonLd(content)).replace(/</g, "\\u003c");
  return (
    <>
      <script
        type="application/ld+json"
        // biome-ignore lint/security/noDangerouslySetInnerHtml: escaped JSON-LD built from our own content.
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <Hero content={content} />
      <ExperienceSection content={content} />
      <ProjectsSection content={content} />
      <SkillsSection content={content} />
      <EducationSection content={content} />
      <ContactSection content={content} />
    </>
  );
}
