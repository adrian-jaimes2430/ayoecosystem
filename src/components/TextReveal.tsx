import { motion } from "framer-motion";
import type { ElementType } from "react";

interface TextRevealProps {
  text: string;
  className?: string;
  delay?: number;
  as?: ElementType;
  /** Stagger between words, seconds. */
  stagger?: number;
}

/**
 * Immersive word-by-word reveal (mask + blur + rise), Apple/Active-Theory style.
 * Only animates presentation — the text content is never altered.
 */
const TextReveal = ({
  text,
  className,
  delay = 0,
  as = "span",
  stagger = 0.045,
}: TextRevealProps) => {
  const Comp = motion(as as ElementType);
  const words = text.split(" ");

  return (
    <Comp
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
      aria-label={text}
    >
      {words.map((w, i) => (
        <span key={`${w}-${i}`} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "110%", opacity: 0, filter: "blur(8px)" },
              visible: { y: "0%", opacity: 1, filter: "blur(0px)" },
            }}
            transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
          >
            {w}
            {i < words.length - 1 ? "\u00A0" : ""}
          </motion.span>
        </span>
      ))}
    </Comp>
  );
};

export default TextReveal;
