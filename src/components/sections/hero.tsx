import {
  BrandIcon,
  DegreeIcon,
  DownloadIcon,
  LanguagesIcon,
  MailIcon,
  PlaceIcon,
  socialNames,
} from "@/components/icons";
import type { Content } from "@/lib/content";
import { cvHref } from "@/lib/cv";
import { formatPlace } from "@/lib/format";

/** "Role | Specialties" → the role, then the specialties on their own line. */
function splitHeadline(headline: string) {
  const [role, ...rest] = headline.split("|").map((part) => part.trim());
  return { role, specialties: rest.join(", ") };
}

export function Hero({ content }: { content: Content }) {
  const { profile: p, t, locale } = content;
  const { role, specialties } = splitHeadline(p.headline);
  const degree = p.education[0];
  const graduation = degree?.period.end ?? degree?.period.start;
  // The facts a recruiter looks for first.
  const facts = [
    { Icon: PlaceIcon, label: t.hero.basedIn, value: formatPlace(p.location) },
    {
      Icon: LanguagesIcon,
      label: t.hero.languages,
      value: p.languages.map((language) => language.name).join(", "),
    },
    ...(degree
      ? [
          {
            Icon: DegreeIcon,
            label: t.hero.graduated,
            value:
              graduation && graduation !== "present"
                ? `${degree.school}, ${graduation.slice(0, 4)}`
                : degree.school,
          },
        ]
      : []),
  ];

  return (
    <section id="top" aria-labelledby="hero-title" tabIndex={-1}>
      <div className="container-page pt-[clamp(3rem,9vw,6.5rem)] pb-[clamp(2rem,5vw,3.5rem)]">
        <p className="flex items-center gap-2.5 font-semibold">
          <span
            className="size-2.5 shrink-0 rounded-full bg-success"
            aria-hidden="true"
          />
          {p.availability}
        </p>
        <h1
          id="hero-title"
          className="mt-5 text-[clamp(3rem,10vw,6rem)] leading-none font-extrabold tracking-[-0.03em]"
        >
          {p.name}
        </h1>
        <p className="mt-6 font-display text-[clamp(1.375rem,3vw,1.75rem)] leading-tight font-semibold tracking-[-0.02em]">
          {role}
          {specialties && (
            <span className="mt-1 block text-muted-foreground">
              {specialties}
            </span>
          )}
        </p>

        <div className="reading mt-8">
          <p className="text-lg leading-relaxed">{p.summary}</p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            {p.about}
          </p>
        </div>

        <div className="mt-9 flex flex-wrap items-center gap-2.5">
          <a href={cvHref(locale)} download className="btn btn-primary">
            <DownloadIcon aria-hidden="true" />
            {t.actions.downloadCv}
          </a>
          <a href={`mailto:${p.email}`} className="btn btn-secondary">
            <MailIcon aria-hidden="true" />
            {t.actions.contact}
          </a>
          {p.social.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-icon btn-secondary"
              aria-label={`${socialNames[link.id]} ${t.labels.newTab}`}
            >
              <BrandIcon name={link.id} />
            </a>
          ))}
        </div>

        <dl className="mt-12 flex flex-wrap gap-x-8 gap-y-3">
          {facts.map(({ Icon, label, value }) => (
            <div key={label} className="flex items-center gap-2.5">
              <Icon aria-hidden="true" className="size-5 text-accent" />
              <dt className="sr-only">{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
