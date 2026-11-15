import { Section } from "@/components/section";
import type { Content } from "@/lib/content";

export function SkillsSection({ content }: { content: Content }) {
  const { profile: p, t } = content;
  return (
    <Section id="skills" title={t.sections.skills}>
      <div className="max-w-[48rem]">
        <p className="-mt-3 mb-8 text-muted-foreground">{t.intros.skills}</p>
        <dl className="rows">
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

        <h3 className="subhead mt-12">{t.sections.languages}</h3>
        <dl className="rows mt-5">
          {p.languages.map((language) => (
            <div key={language.name}>
              <dt>{language.name}</dt>
              <dd>{language.level}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Section>
  );
}
