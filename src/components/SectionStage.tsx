import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Cinematic stage wrapper: each section enters and exits the shared world
 * (the scroll-scrubbed film behind the page) instead of just appearing.
 */
const SectionStage = ({ children }: { children: ReactNode }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.14, 0.88, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0.975, 1, 1, 0.985]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [44, 0, 0, -36]);
  const blur = useTransform(scrollYProgress, [0, 0.16, 0.86, 1], [5, 0, 0, 4]);
  const filter = useTransform(blur, (b: number) => `blur(${b}px)`);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, filter, willChange: "transform, opacity, filter" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};


export default SectionStage;
