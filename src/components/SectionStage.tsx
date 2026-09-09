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

  const opacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.95, 1, 1, 0.97]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [80, 0, 0, -60]);
  const blur = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [8, 0, 0, 6]);
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
