import React from 'react';
import { motion } from 'framer-motion';

export function SplitText({ children, className = "", delay = 0, type = "words" }) {
  const content = typeof children === 'string' ? children : '';
  
  if (!content) return <span className={className}>{children}</span>;

  let items = [];
  if (type === "chars") {
    items = content.split("");
  } else {
    items = content.split(" ");
  }

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: delay * i },
    }),
  };

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
    },
  };

  return (
    <motion.div
      style={{ display: "inline-block", overflow: "hidden" }}
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      className={className}
    >
      {items.map((item, index) => (
        <motion.span
          variants={child}
          key={index}
          style={{ display: "inline-block", paddingRight: type === "words" ? "0.3em" : "0" }}
        >
          {item === " " ? "\u00A0" : item}
        </motion.span>
      ))}
    </motion.div>
  );
}
