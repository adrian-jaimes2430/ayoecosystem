import { motion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

type Direction = "up" | "down" | "left" | "right" | "scale" | "blur";

const variants = (direction: Direction): Variants => {
  const map: Record<Direction, { from: Record<string, number | string>; to: Record<string, number | string> }> = {
    up: { from: { opacity: 0, y: 60 }, to: { opacity: 1, y: 0 } },
    down: { from: { opacity: 0, y: -60 }, to: { opacity: 1, y: 0 } },
    left: { from: { opacity: 0, x: -60 }, to: { opacity: 1, x: 0 } },
    right: { from: { opacity: 0, x: 60 }, to: { opacity: 1, x: 0 } },
    scale: { from: { opacity: 0, scale: 0.92 }, to: { opacity: 1, scale: 1 } },
    blur: { from: { opacity: 0, filter: "blur(14px)", y: 40 }, to: { opacity: 1, filter: "blur(0px)", y: 0 } },
  };
  return { hidden: map[direction].from, visible: map[direction].to };
};

interface RevealProps {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
}

/**
 * Apple-style scroll reveal — soft, slow easing, generous margin.
 */
const Reveal = ({
  children,
  direction = "up",
  delay = 0,
  duration = 0.9,
  className,
  once = true,
}: RevealProps) => {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-80px" }}
      variants={variants(direction)}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default Reveal;