import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import type { Messages } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";

export function EducationSection({ m }: { m: Messages["education"] }) {
  return (
    <SectionContainer id="education" ariaLabel={m.title}>
      <div className="section-layout">
        <SectionHeading title={m.title} />
        <div className="flex flex-col gap-10">
          {(
            [
              ["degree", SITE_CONFIG.school],
              ["summer", SITE_CONFIG.summerSchool],
            ] as const
          ).map(([id, school]) => {
            const course = m[id];
            return (
              <article className="flex flex-col gap-3" key={id}>
                <p className="text-sm text-muted-foreground">{course.period}</p>
                <h3 className="text-xl font-semibold">{course.title}</h3>
                <p>{school}</p>
                <p className="text-muted-foreground leading-relaxed">
                  {course.description}
                </p>
              </article>
            );
          })}
          <div className="border-t pt-8">
            <h3 className="text-xl font-semibold mb-5">{m.languages.title}</h3>
            <dl className="flex flex-col gap-5">
              <div>
                <dt className="font-medium">{m.languages.french}</dt>
                <dd className="text-muted-foreground">
                  {m.languages.frenchLevel}
                </dd>
              </div>
              <div>
                <dt className="font-medium">{m.languages.english}</dt>
                <dd className="text-muted-foreground leading-relaxed">
                  {m.languages.englishLevel}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </SectionContainer>
  );
}
