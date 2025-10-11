export const SITE_CONFIG = {
  name: "Simon Fontaine",
  title: "Simon Fontaine | Développeur Full-Stack",
  description:
    "Portfolio de Simon Fontaine, développeur full-stack étudiant à l'EPHEC. Spécialisé en React, Node.js, PostgreSQL et technologies web modernes.",
  url: "https://simonfontaine.com",
  email: "contact@simonfontaine.com",
  github: "https://github.com/Simon-Fontaine",
  linkedin: "https://linkedin.com/in/fontaine-simon/",
} as const;

export const NAV_ITEMS = [
  { href: "#about", label: "À propos" },
  { href: "#skills", label: "Compétences" },
  { href: "#formation", label: "Formation" },
  { href: "#projets", label: "Projets" },
  { href: "#contact", label: "Contact" },
] as const;

export const SOCIAL_LINKS = [
  {
    name: "GitHub",
    url: SITE_CONFIG.github,
    icon: "github",
    label: `Profil GitHub de ${SITE_CONFIG.name}`,
  },
  {
    name: "LinkedIn",
    url: SITE_CONFIG.linkedin,
    icon: "linkedin",
    label: `Profil LinkedIn de ${SITE_CONFIG.name}`,
  },
] as const;
