import FadeIn from "./FadeIn";

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <FadeIn className={`max-w-2xl ${align === "center" ? "mx-auto text-center" : "text-left"}`}>
      {eyebrow && (
        <span className="text-xs font-extrabold uppercase tracking-[0.2em] text-rose-500">{eyebrow}</span>
      )}
      <h2 className="mt-3 font-display text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h2>
      {description && <p className="mt-4 text-base leading-relaxed text-ink-soft sm:text-lg">{description}</p>}
    </FadeIn>
  );
}
