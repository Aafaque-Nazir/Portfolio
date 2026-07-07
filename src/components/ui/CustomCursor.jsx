import React, { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const CustomCursor = () => {
  const [isPointer, setIsPointer] = useState(false);
  
  // Custom cursor position
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  useEffect(() => {
    // Only run on desktop/devices with hover
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const moveCursor = (e) => {
      cursorX.set(e.clientX - 16); // Center the 32x32 cursor (8 * 4px)
      cursorY.set(e.clientY - 16);
    };

    const handleMouseOver = (e) => {
      const target = e.target;
      // Check if hovering over clickable elements
      if (
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-pointer')
      ) {
        setIsPointer(true);
      } else {
        setIsPointer(false);
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, [cursorX, cursorY]);

  // If touch device, render nothing
  if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-cyan-400 pointer-events-none z-[9999] mix-blend-difference hidden lg:flex items-center justify-center transition-colors"
      style={{
        x: cursorX,
        y: cursorY,
      }}
      animate={{
        scale: isPointer ? 1.8 : 1,
        backgroundColor: isPointer ? "rgba(34, 211, 238, 0.2)" : "rgba(34, 211, 238, 0)",
        borderColor: isPointer ? "rgba(34, 211, 238, 0.8)" : "rgba(34, 211, 238, 0.4)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
        animate={{
          opacity: isPointer ? 0 : 1,
          scale: isPointer ? 0 : 1
        }}
      />
    </motion.div>
  );
};

export default CustomCursor;
