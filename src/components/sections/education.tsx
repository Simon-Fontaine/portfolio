import { ExternalLink, Section } from "@/components/section";
import { Timeline, TimelineItem } from "@/components/timeline";
import type { Content } from "@/lib/content";
import { formatMonths, formatPlace, formatYears } from "@/lib/format";

export function EducationSection({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  return (
    <Section id="education" title={t.sections.education}>
      <Timeline>
        {p.education.map((item) => (
          <TimelineItem
            key={item.id}
            years={formatYears(item.period, t.labels.present)}
            months={formatMonths(item.period, locale)}
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
    </Section>
  );
}
