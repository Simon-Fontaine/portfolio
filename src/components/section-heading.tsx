export function SectionHeading({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="section-title">{title}</h2>
      {description && (
        <p className="text-muted-foreground leading-relaxed max-w-prose">
          {description}
        </p>
      )}
    </div>
  );
}
