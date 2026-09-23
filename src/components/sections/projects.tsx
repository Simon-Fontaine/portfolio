import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { SectionContainer } from "@/components/section-container";
import { SectionHeading } from "@/components/section-heading";
import { Badge } from "@/components/ui/badge";
import { type Messages, message } from "@/i18n/messages";
import { type Project, projects } from "@/lib/constants";

function ProjectLink({
  project,
  common,
}: {
  project: Project;
  common: Messages["common"];
}) {
  return (
    <a
      href={project.githubUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="text-link"
    >
      {message(common.projectLink, { project: project.title })}
      <span className="sr-only"> {common.newTab}</span>
      <ArrowUpRight className="size-4 shrink-0" aria-hidden="true" />
    </a>
  );
}
function Technologies({
  project,
  common,
}: {
  project: Project;
  common: Messages["common"];
}) {
  return (
    <ul
      className="flex flex-wrap gap-2"
      aria-label={message(common.technologies, { project: project.title })}
    >
      {project.technologies.map((tech) => (
        <li key={tech}>
          <Badge variant="outline">{tech}</Badge>
        </li>
      ))}
    </ul>
  );
}
export function ProjectsSection({
  m,
  common,
}: {
  m: Messages["projects"];
  common: Messages["common"];
}) {
  const contentById: Record<
    string,
    Messages["projects"]["items"][keyof Messages["projects"]["items"]]
  > = m.items;
  return (
    <SectionContainer id="projects" ariaLabel={m.title}>
      <div className="flex flex-col gap-12">
        <SectionHeading title={m.title} description={m.description} />
        <div className="divide-y divide-border border-y">
          {projects
            .filter((p) => p.featured)
            .map((project) => {
              const content = contentById[project.id];
              if (!content || !("contributions" in content))
                throw new Error(
                  `Missing featured project content: ${project.id}`,
                );
              return (
                <article key={project.id} className="project-feature">
                  <div className="flex flex-col gap-5">
                    <p className="text-sm text-muted-foreground">
                      {content.context}
                    </p>
                    <h3 className="text-3xl font-semibold">{project.title}</h3>
                    <p className="leading-relaxed text-muted-foreground">
                      {content.description}
                    </p>
                    <ProjectLink project={project} common={common} />
                  </div>
                  <div className="flex flex-col gap-6">
                    <h4 className="font-semibold">
                      {content.contributionTitle}
                    </h4>
                    <ul className="detail-list">
                      {Object.entries(content.contributions).map(
                        ([id, text]) => (
                          <li key={id}>{text}</li>
                        ),
                      )}
                    </ul>
                    <Technologies project={project} common={common} />
                  </div>
                </article>
              );
            })}
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects
            .filter((p) => !p.featured)
            .map((project) => {
              const content = contentById[project.id];
              if (!content || !("imageAlt" in content))
                throw new Error(`Missing project content: ${project.id}`);
              return (
                <article key={project.id} className="project-small">
                  <div className="flex items-center gap-4">
                    {project.image && (
                      <Image
                        src={project.image}
                        alt={content.imageAlt}
                        width={64}
                        height={64}
                        className="size-16 shrink-0 rounded-lg object-contain bg-white p-1"
                      />
                    )}
                    <div>
                      <h3 className="text-2xl font-semibold">
                        {project.title}
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        {content.context}
                      </p>
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">
                    {content.description}
                  </p>
                  <Technologies project={project} common={common} />
                  <ProjectLink project={project} common={common} />
                </article>
              );
            })}
        </div>
      </div>
    </SectionContainer>
  );
}
