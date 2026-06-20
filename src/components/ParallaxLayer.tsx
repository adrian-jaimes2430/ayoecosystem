import { motion, useScroll, useTransform, type MotionStyle } from "framer-motion";
import { useRef, type ReactNode } from "react";

interface ParallaxLayerProps {
  children: ReactNode;
  speed?: number; // -1..1. Positive = moves slower (background feel). Negative = moves faster.
  className?: string;
  style?: MotionStyle;
}

/**
 * Lightweight scroll parallax wrapper — unmerco-style ambient depth.
 * Translates Y based on scroll progress of its parent section.
 */
const ParallaxLayer = ({ children, speed = 0.3, className, style }: ParallaxLayerProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const range = 120 * speed;
  const y = useTransform(scrollYProgress, [0, 1], [-range, range]);

  return (
    <motion.div ref={ref} style={{ y, willChange: "transform", ...style }} className={className}>
      {children}
    </motion.div>
  );
};

export default ParallaxLayer;