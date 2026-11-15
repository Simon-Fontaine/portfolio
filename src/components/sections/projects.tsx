import Image from "next/image";
import { ExternalLink, Section, TechList } from "@/components/section";
import type { Content } from "@/lib/content";
import { formatPeriod } from "@/lib/format";

type Project = Content["profile"]["projects"][number];

export function ProjectsSection({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  const featured = p.projects.filter((project) => project.featured);
  const others = p.projects.filter((project) => !project.featured);

  const meta = (project: Project) =>
    [
      project.context,
      project.period &&
        formatPeriod(project.period, locale, t.labels.present, "long"),
    ]
      .filter(Boolean)
      .join(", ");

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
      {/* Featured projects: what it is on the left, what I did on the right. */}
      <div className="grid gap-5">
        {featured.map((project) => (
          <article
            key={project.id}
            className="panel"
            aria-labelledby={`project-${project.id}`}
          >
            <div className="grid gap-x-12 gap-y-8 lg:grid-cols-2">
              <div>
                <p className="meta">{meta(project)}</p>
                <h3
                  id={`project-${project.id}`}
                  className="mt-1.5 text-[clamp(1.75rem,4vw,2.25rem)]"
                >
                  {project.name}
                </h3>
                <p className="mt-4">{project.summary}</p>
                <TechList
                  items={project.tech}
                  label={t.labels.technologies}
                  className="mt-4"
                />
                {links(project)}
              </div>
              {project.highlights && (
                <div>
                  <h4 className="subhead">{t.labels.contribution}</h4>
                  <ul className="bullets mt-3">
                    {project.highlights.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            {project.screenshot && (
              <Image
                src={project.screenshot.src}
                alt={project.screenshot.alt}
                width={1600}
                height={1000}
                sizes="(min-width: 1280px) 52rem, 92vw"
                className="mt-8 h-auto w-full rounded-[0.875rem]"
              />
            )}
          </article>
        ))}
      </div>

      {/* Smaller projects. */}
      {others.length > 0 && (
        <>
          <h3 className="subhead mt-12">{t.labels.moreProjects}</h3>
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
                      <p className="meta">{meta(project)}</p>
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
