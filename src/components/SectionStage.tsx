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

  const opacity = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0, 1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0.94, 1, 1, 0.96]);
  const y = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [70, 0, 0, -50]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, scale, y, willChange: "transform, opacity" }}
      className="relative"
    >
      {children}
    </motion.div>
  );
};

export default SectionStage;
