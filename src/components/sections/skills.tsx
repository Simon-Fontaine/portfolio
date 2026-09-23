import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import type { Messages } from "@/i18n/messages";
import { skillsData } from "@/lib/constants";

export function SkillsSection({ m }: { m: Messages["skills"] }) {
  return (
    <SectionContainer id="skills" background="muted" ariaLabel={m.label}>
      <div className="section-layout">
        <SectionHeading title={m.title} description={m.description} />
        <dl className="divide-y divide-border">
          {Object.entries(skillsData).map(([id, skills]) => (
            <div key={id} className="py-7 first:pt-0 last:pb-0">
              <dt className="font-semibold mb-3">
                {m.groups[id as keyof typeof m.groups]}
              </dt>
              <dd className="text-muted-foreground leading-relaxed">
                {skills.join(" · ")}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </SectionContainer>
  );
}
