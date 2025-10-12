import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { EducationSection } from "@/components/sections/education";
import { HeroSection } from "@/components/sections/hero";
import { InternshipSection } from "@/components/sections/internship";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

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
