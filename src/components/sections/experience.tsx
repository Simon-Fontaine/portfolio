import { ExternalLink, Section, TechList } from "@/components/section";
import { Timeline, TimelineItem } from "@/components/timeline";
import type { Content } from "@/lib/content";
import { formatMonths, formatPlace, formatYears } from "@/lib/format";

export function ExperienceSection({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  return (
    <Section id="experience" title={t.sections.experience}>
      <Timeline>
        {p.experience.map((job) => (
          <TimelineItem
            key={job.id}
            years={formatYears(job.period, t.labels.present)}
            months={formatMonths(job.period, locale)}
          >
            <h3 className="text-2xl">{job.role}</h3>
            <p className="meta mt-1.5 flex flex-wrap gap-x-3">
              <span className="font-semibold text-foreground">
                {job.url ? (
                  <ExternalLink href={job.url} newTabLabel={t.labels.newTab}>
                    {job.organization}
                  </ExternalLink>
                ) : (
                  job.organization
                )}
              </span>
              <span>{formatPlace(job.location)}</span>
            </p>
            {job.summary && <p className="mt-4">{job.summary}</p>}
            {job.highlights && (
              <ul className="bullets mt-4">
                {job.highlights.map((item) => (
                  <li key={item.id}>{item.text}</li>
                ))}
              </ul>
            )}
            {job.tech && (
              <TechList
                items={job.tech}
                label={t.labels.technologies}
                className="mt-5"
              />
            )}
          </TimelineItem>
        ))}
      </Timeline>
    </Section>
  );
}
