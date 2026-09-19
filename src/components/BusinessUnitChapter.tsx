import { lazy, Suspense, useRef, type ReactNode } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import ChapterHeading from "@/components/ChapterHeading";
import { Button } from "@/components/ui/button";
import type { UnitShape } from "@/components/three/UnitObject";

const UnitObject = lazy(() => import("@/components/three/UnitObject"));

interface BusinessUnitChapterProps {
  id?: string;
  eyebrow: string;
  title: string;
  text: string;
  accent: string;
  modelUrl: string;
  shape: UnitShape;
  color: string;
  logo: string;
  logoAlt: string;
  brand: string;
  category: string;
  description: string;
  quote: string;
  route: string;
  cta: string;
  children: ReactNode;
  reverse?: boolean;
  darkLogo?: boolean;
}

/** A full-viewport narrative beat for one existing business-unit model. */
const BusinessUnitChapter = ({
  id,
  eyebrow,
  title,
  text,
  accent,
  modelUrl,
  shape,
  color,
  logo,
  logoAlt,
  brand,
  category,
  description,
  quote,
  route,
  cta,
  children,
  reverse = false,
  darkLogo = false,
}: BusinessUnitChapterProps) => {
  const ref = useRef<HTMLElement>(null);
  const active = useInView(ref, { amount: 0.16 });
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.78, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [48, 0, 0, -42]);
  const modelScale = useTransform(scrollYProgress, [0, 0.25, 0.72, 1], [0.88, 1, 1, 0.92]);

  return (
    <motion.article
      id={id}
      ref={ref}
      style={{ opacity, y }}
      className="relative py-16 md:min-h-[145svh] md:py-0"
    >
      <div className="relative flex min-h-0 items-center overflow-hidden md:sticky md:top-0 md:min-h-[100svh] md:py-20">
        <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,hsl(var(--background)/0.12),hsl(var(--background)/0.48)_48%,hsl(var(--background)/0.18))] max-lg:bg-[linear-gradient(180deg,hsl(var(--background)/0.08),hsl(var(--background)/0.52)_48%,hsl(var(--background)/0.3))]" />
        <div className="mx-auto grid w-full max-w-6xl items-center gap-5 px-4 sm:px-6 lg:grid-cols-2 lg:gap-14">
          <motion.div
            style={{ scale: modelScale }}
            className={`relative min-h-[30svh] max-h-[320px] lg:min-h-[66svh] lg:max-h-none ${reverse ? "lg:order-2" : ""}`}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,hsl(var(--primary)/0.12),transparent_62%)]" />
            <Suspense fallback={null}>
              <UnitObject
                modelUrl={modelUrl}
                shape={shape}
                color={color}
                active={active}
                className="absolute inset-0 h-full w-full"
              />
            </Suspense>
          </motion.div>

          <div className={`relative ${reverse ? "lg:order-1" : ""}`}>
            <ChapterHeading eyebrow={eyebrow} title={title} text={text} accent={accent} />
            <div className="mt-6 border-l border-foreground/15 pl-4 sm:pl-5 md:mt-8 md:pl-7">
              <div className="flex items-center gap-3">
                <span className={`flex h-12 w-12 items-center justify-center p-1.5 ${darkLogo ? "bg-background/70" : "bg-foreground"}`}>
                  <img src={logo} alt={logoAlt} className="h-full w-full object-contain" loading="lazy" />
                </span>
                <div>
                  <h3 className="font-display text-xl font-semibold">{brand}</h3>
                  <p className="mt-1 text-[9px] uppercase tracking-[0.16em] text-muted-foreground sm:tracking-[0.26em]">{category}</p>
                </div>
              </div>
              <p className="mt-4 max-w-lg text-[13px] leading-relaxed text-foreground/72 sm:text-sm md:mt-5 md:text-base">{description}</p>
              <div className="mt-5 grid gap-3 text-[13px] sm:grid-cols-2 sm:text-sm md:mt-6">{children}</div>
              <p className="mt-5 max-w-lg text-[13px] italic text-foreground/70 sm:text-sm md:mt-6">“{quote}”</p>
              <Button asChild variant="ghost" className="mt-4 min-h-11 px-0 text-foreground hover:bg-transparent hover:text-primary md:mt-5">
                <Link to={route}>
                  {cta} <ArrowUpRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default BusinessUnitChapter;