import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import type { Messages } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";

export function EducationSection({ m }: { m: Messages["education"] }) {
  return (
    <SectionContainer id="education" ariaLabel={m.title}>
      <div className="section-layout">
        <SectionHeading title={m.title} />
        <div>
          <div className="education-list">
            {Object.entries(m.previous)
              .reverse()
              .map(([id, school]) => (
                <article className="education-item" key={id}>
                  <span className="education-marker" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">
                    {school.period}
                  </p>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">{school.title}</h3>
                    <p>{school.school}</p>
                  </div>
                </article>
              ))}
            {(
              [
                ["summer", SITE_CONFIG.summerSchool],
                ["degree", SITE_CONFIG.school],
              ] as const
            ).map(([id, school]) => {
              const course = m[id];
              return (
                <article
                  className={`education-item${id === "degree" ? " education-item--featured" : ""}`}
                  key={id}
                >
                  <span className="education-marker" aria-hidden="true" />
                  <p className="text-sm text-muted-foreground">
                    {course.period}
                  </p>
                  <div className="flex flex-col gap-3">
                    <h3 className="text-xl font-semibold">{course.title}</h3>
                    <p>{school}</p>
                    <p className="text-muted-foreground leading-relaxed">
                      {course.description}
                    </p>
                  </div>
                </article>
              );
            })}
          </div>
          <div className="border-t mt-10 pt-8">
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
