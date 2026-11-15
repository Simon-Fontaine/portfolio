import { Section } from "@/components/section";
import type { Content } from "@/lib/content";

export function SkillsSection({ content }: { content: Content }) {
  const { profile: p, t } = content;
  return (
    <Section id="skills" title={t.sections.skills}>
      <p className="reading -mt-3 mb-8 text-muted-foreground">
        {t.intros.skills}
      </p>
      <dl className="rows max-w-[48rem]">
        {p.skills.map((group) => (
          <div key={group.id}>
            <dt>{group.name}</dt>
            <dd>
              <ul className="inline-list">
                {group.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </dd>
          </div>
        ))}
      </dl>
    </Section>
  );
}
