import { motion } from "framer-motion";
import type { AOHistoryChapter } from "@/content/aoHistory";

const accents: Record<AOHistoryChapter["unit"] extends infer U ? NonNullable<U> : never, string> = {
  ao: "#e22b2f",
  inverfact: "#d8b35a",
  nomadhive: "#60e0ff",
  anma: "#ff8a2a",
};

type Props = { chapter: AOHistoryChapter; progress: number };

export default function StoryTimeline({ chapter, progress }: Props) {
  const color = accents[chapter.unit ?? "ao"];
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 px-6 md:grid-cols-[minmax(0,1fr)_minmax(320px,520px)] md:px-10 lg:px-14">
        <div className="hidden md:block" />
        <motion.article
          key={chapter.id}
          initial={{ opacity: 0, y: 24, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl md:justify-self-end"
        >
          <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-black/25 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.32em] text-white/65 backdrop-blur-xl">
            <span className="h-2 w-2 rounded-full" style={{ backgroundColor: color, boxShadow: `0 0 18px ${color}` }} />
            {chapter.index} · {chapter.eyebrow}
          </div>

          <h2 className="mt-6 text-4xl font-semibold leading-[0.98] tracking-[-0.04em] text-white md:text-6xl lg:text-7xl">
            {chapter.title}
          </h2>
          <p className="mt-5 max-w-lg text-lg leading-relaxed text-white/72 md:text-xl">
            {chapter.accent}
          </p>
          <p className="mt-5 max-w-lg text-sm leading-7 text-white/52 md:text-base">
            {chapter.body}
          </p>

          {chapter.quote && (
            <div className="pointer-events-auto mt-7 max-w-lg border-l pl-5 text-sm italic leading-6 text-white/80" style={{ borderColor: color }}>
              “{chapter.quote}”
            </div>
          )}

          <div className="mt-8 flex items-center gap-3 text-[10px] uppercase tracking-[0.28em] text-white/35">
            <span>Story / A&amp;O</span>
            <span className="h-px w-10 bg-white/20" />
            <span>{Math.round(progress * 100)}%</span>
          </div>
        </motion.article>
      </div>
    </div>
  );
}
