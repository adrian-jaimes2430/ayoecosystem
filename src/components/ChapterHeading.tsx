import Reveal from "@/components/Reveal";
import TextReveal from "@/components/TextReveal";

interface ChapterHeadingProps {
  /** Small chapter label, e.g. "03 — CAPITAL". */
  eyebrow: string;
  /** Strong editorial headline. */
  title: string;
  /** One short supporting sentence. */
  text?: string;
  /** Accent color for the eyebrow (CSS color or hsl(var(--…))). */
  accent?: string;
  className?: string;
}

/**
 * Editorial chapter header used across the homepage narrative:
 * eyebrow → headline → one short line. Purely presentational.
 */
const ChapterHeading = ({
  eyebrow,
  title,
  text,
  accent = "hsl(var(--primary))",
  className,
}: ChapterHeadingProps) => (
  <Reveal direction="blur" className={className}>
    <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.4em]">
      <span style={{ color: accent }}>{eyebrow}</span>
      <span className="h-px w-10" style={{ background: accent, opacity: 0.5 }} />
    </div>
    <h2 className="mt-5 font-display text-3xl sm:text-4xl md:text-[3.4rem] font-semibold tracking-tight leading-[1.05] max-w-3xl">
      <TextReveal text={title} />
    </h2>
    {text ? (
      <p className="mt-6 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
        {text}
      </p>
    ) : null}
  </Reveal>
);

export default ChapterHeading;
