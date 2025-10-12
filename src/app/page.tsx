import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero";

const AboutSection = dynamic(
  () =>
    import("@/components/sections/about").then((mod) => ({
      default: mod.AboutSection,
    })),
  {
    loading: () => <SectionSkeleton />,
  },
);

const EducationSection = dynamic(
  () =>
    import("@/components/sections/education").then((mod) => ({
      default: mod.EducationSection,
    })),
  {
    loading: () => <SectionSkeleton />,
  },
);

const SkillsSection = dynamic(
  () =>
    import("@/components/sections/skills").then((mod) => ({
      default: mod.SkillsSection,
    })),
  {
    loading: () => <SectionSkeleton />,
  },
);

const ProjectsSection = dynamic(
  () =>
    import("@/components/sections/projects").then((mod) => ({
      default: mod.ProjectsSection,
    })),
  {
    loading: () => <SectionSkeleton />,
  },
);

const InternshipSection = dynamic(
  () =>
    import("@/components/sections/internship").then((mod) => ({
      default: mod.InternshipSection,
    })),
  {
    loading: () => <SectionSkeleton />,
  },
);

const ContactSection = dynamic(
  () =>
    import("@/components/sections/contact").then((mod) => ({
      default: mod.ContactSection,
    })),
  {
    loading: () => <SectionSkeleton />,
  },
);

function SectionSkeleton() {
  return (
    <div className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-7xl">
        <div className="animate-pulse space-y-4">
          <div className="h-10 bg-muted rounded w-1/4" />
          <div className="h-6 bg-muted rounded w-1/2" />
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutSection />
      <EducationSection />
      <SkillsSection />
      <ProjectsSection />
      <InternshipSection />
      <ContactSection />
    </>
  );
}
