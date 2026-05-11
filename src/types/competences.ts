export type ActivityType =
  | "formation"
  | "conference"
  | "visite"
  | "job-day"
  | "salon"
  | "projet"
  | "hackathon"
  | "challenge"
  | "autre";

export const ACTIVITY_TYPE_LABELS: Record<ActivityType, string> = {
  formation: "Formation",
  conference: "Conférence",
  visite: "Visite",
  "job-day": "Job Day",
  salon: "Salon",
  projet: "Projet",
  hackathon: "Hackathon",
  challenge: "Challenge",
  autre: "Autre",
};

export type ProofType =
  | "photo"
  | "certificate"
  | "ticket"
  | "attestation"
  | "link"
  | "capture";

export interface Proof {
  type: ProofType;
  label: string;
  url?: string;
  darkUrl?: string;
  description?: string;
}

export interface Activity {
  id: string;
  title: string;
  themeId: string;
  type: ActivityType;
  date: string | { start: string; end: string };
  hours: number;
  context: string;
  learnings: string;
  skills: string[];
  professionalProjectLink: string;
  reflection: string;
  strengths: string[];
  weaknesses: string[];
  proofs: Proof[];
}

export interface ThemeColorClasses {
  bg: string;
  text: string;
  border: string;
}

export interface Theme {
  id: string;
  title: string;
  description: string;
  colorClasses: ThemeColorClasses;
}

export interface CompetencesData {
  professionalProject: {
    title: string;
    description: string;
  };
  strengths: string[];
  weaknesses: string[];
  themes: Theme[];
  activities: Activity[];
}
