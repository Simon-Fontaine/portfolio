import { ExternalLink, Section } from "@/components/section";
import { Timeline, TimelineItem } from "@/components/timeline";
import type { Content } from "@/lib/content";
import { formatPeriod, formatPlace } from "@/lib/format";

export function EducationSection({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  return (
    <Section id="education" title={t.sections.education}>
      <Timeline>
        {p.education.map((item) => (
          <TimelineItem
            key={item.id}
            date={formatPeriod(item.period, locale, t.labels.present, "long")}
          >
            <h3 className={item.summary ? "text-2xl" : "text-xl"}>
              {item.degree}
            </h3>
            <p className="meta mt-1.5 flex flex-wrap gap-x-3">
              <span className="font-semibold text-foreground">
                {item.url ? (
                  <ExternalLink href={item.url} newTabLabel={t.labels.newTab}>
                    {item.school}
                  </ExternalLink>
                ) : (
                  item.school
                )}
              </span>
              <span>{formatPlace(item.location)}</span>
            </p>
            {item.summary && <p className="mt-4">{item.summary}</p>}
          </TimelineItem>
        ))}
      </Timeline>

      <div className="mt-14 max-w-[48rem]">
        <h3 className="subhead">{t.sections.languages}</h3>
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
