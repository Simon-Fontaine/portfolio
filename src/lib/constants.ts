import profile from "@/data/profile.json";

export const SITE_CONFIG = profile;
export const SECTION_IDS = [
  "hero",
  "experience",
  "projects",
  "skills",
  "education",
  "contact",
] as const;
export const SOCIAL_LINKS = profile.social;
export const skillsData = profile.skills;
export const projects = profile.projects;
export type Project = (typeof projects)[number];

export function cvFileName(locale: string) {
  return `${profile.cvBase}_${locale.toUpperCase()}.pdf`;
}
export function cvUrl(locale: string) {
  return `/api/cv/${locale}`;
}
