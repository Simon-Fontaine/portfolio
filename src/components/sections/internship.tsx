import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import type { Messages } from "@/i18n/messages";
import { SITE_CONFIG } from "@/lib/constants";

export function InternshipSection({ m }: { m: Messages["experience"] }) {
  return (
    <SectionContainer id="experience" background="muted" ariaLabel={m.title}>
      <div className="section-layout">
        <SectionHeading title={m.title} />
        <div className="flex flex-col gap-10">
          <article className="flex flex-col gap-8">
            <div className="flex flex-col gap-3">
              <p className="text-sm text-muted-foreground">{m.period}</p>
              <h3 className="text-2xl sm:text-3xl font-semibold">{m.role}</h3>
              <p className="text-xl text-primary font-medium">
                {SITE_CONFIG.employer}
              </p>
            </div>
            <p className="leading-relaxed text-muted-foreground">
              {m.description}
            </p>
            <ul className="detail-list">
              {Object.entries(m.tasks).map(([id, text]) => (
                <li key={id}>{text}</li>
              ))}
            </ul>
          </article>
          <article className="flex flex-col gap-3 border-t pt-8">
            <p className="text-sm text-muted-foreground">
              {m.studentJobs.period}
            </p>
            <h3 className="text-xl font-semibold">{m.studentJobs.title}</h3>
            <p className="text-muted-foreground">{m.studentJobs.employers}</p>
          </article>
        </div>
      </div>
    </SectionContainer>
  );
}
