import Image from "next/image";
import { ExternalLink, Section, TechList } from "@/components/section";
import { cn } from "@/lib/cn";
import type { Content } from "@/lib/content";
import { formatPeriod } from "@/lib/format";

/** "Juillet 2025" → "juillet 2025" when it follows other text. */
const lowerFirst = (text?: string) =>
  text && text.charAt(0).toLowerCase() + text.slice(1);

type Project = Content["profile"]["projects"][number];

export function ProjectsSection({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  const featured = p.projects.filter((project) => project.featured);
  const others = p.projects.filter((project) => !project.featured);
  const date = (project: Project) =>
    project.period &&
    formatPeriod(project.period, locale, t.labels.present, "long");

  const links = (project: Project) =>
    (project.repository || project.demo) && (
      <p className="mt-5 flex flex-wrap gap-x-6 gap-y-1 font-semibold">
        {project.demo && (
          <ExternalLink href={project.demo} newTabLabel={t.labels.newTab}>
            {t.actions.demo}
          </ExternalLink>
        )}
        {project.repository && (
          <ExternalLink href={project.repository} newTabLabel={t.labels.newTab}>
            <span aria-hidden="true">{t.actions.sourceCode}</span>
            <span className="sr-only">{t.labels.onGithub(project.name)}</span>
          </ExternalLink>
        )}
      </p>
    );

  return (
    <Section id="projects" title={t.sections.projects}>
      {/* Featured projects: the story on one side, the facts on the other.
          The sides alternate from one project to the next. */}
      <div className="grid gap-16">
        {featured.map((project, index) => (
          <article
            key={project.id}
            aria-labelledby={`project-${project.id}`}
            className="grid items-start gap-x-12 gap-y-7 lg:grid-cols-12"
          >
            <div
              className={cn("lg:col-span-7", index % 2 === 1 && "lg:order-2")}
            >
              <h3
                id={`project-${project.id}`}
                className="text-[clamp(1.75rem,4vw,2.25rem)]"
              >
                {project.name}
              </h3>
              <p className="mt-4 text-lg">{project.summary}</p>
              {project.highlights && (
                <>
                  <h4 className="subhead mt-7">{t.labels.contribution}</h4>
                  <ul className="bullets mt-3">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </>
              )}
            </div>
            <div className="sheet panel lg:col-span-5">
              {project.screenshot && (
                <Image
                  src={project.screenshot.src}
                  alt={project.screenshot.alt}
                  width={1600}
                  height={1000}
                  sizes="(min-width: 1024px) 24rem, 92vw"
                  className="mb-6 h-auto w-full rounded-[0.875rem]"
                />
              )}
              <dl>
                <div>
                  <dt>{t.labels.context}</dt>
                  <dd>{project.context}</dd>
                </div>
                {project.period && (
                  <div>
                    <dt>{t.labels.date}</dt>
                    <dd>{date(project)}</dd>
                  </div>
                )}
                <div>
                  <dt>{t.labels.technologies}</dt>
                  <dd>
                    <ul className="inline-list">
                      {project.tech.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </dd>
                </div>
              </dl>
              {links(project)}
            </div>
          </article>
        ))}
      </div>

      {/* Smaller projects. */}
      {others.length > 0 && (
        <>
          <h3 className="subhead mt-16">{t.labels.moreProjects}</h3>
          <ul className="mt-5 grid gap-5 md:grid-cols-2">
            {others.map((project) => (
              <li key={project.id} className="panel">
                <article>
                  <div className="flex items-center gap-4">
                    {project.image && (
                      <Image
                        src={project.image.src}
                        alt={project.image.alt}
                        width={48}
                        height={48}
                        className="logo-tile"
                      />
                    )}
                    <div className="min-w-0">
                      <h4 className="font-display text-2xl leading-tight font-bold tracking-[-0.025em]">
                        {project.name}
                      </h4>
                      <p className="meta">
                        {[project.context, lowerFirst(date(project))]
                          .filter(Boolean)
                          .join(", ")}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4">{project.summary}</p>
                  <TechList
                    items={project.tech}
                    label={t.labels.technologies}
                    className="mt-4"
                  />
                  {links(project)}
                </article>
              </li>
            ))}
          </ul>
        </>
      )}
    </Section>
  );
}
