import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const [isPointer, setIsPointer] = useState(false);

  useEffect(() => {
    // Only run on desktop/devices with hover
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    let mouseX = -100;
    let mouseY = -100;
    let isMoving = false;

    const updateCursor = () => {
      if (cursorRef.current) {
        // Direct DOM manipulation is much faster, no framer/react conflicts here
        cursorRef.current.style.transform = `translate3d(${mouseX - 16}px, ${mouseY - 16}px, 0)`;
      }
      isMoving = false;
    };

    const handleMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isMoving) {
        isMoving = true;
        requestAnimationFrame(updateCursor);
      }
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

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  // If touch device, render nothing
  if (typeof window !== "undefined" && ('ontouchstart' in window || navigator.maxTouchPoints > 0)) {
    return null;
  }

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 pointer-events-none z-[9999] mix-blend-difference hidden lg:flex items-center justify-center will-change-transform"
      style={{
        transform: "translate3d(-100px, -100px, 0)",
      }}
    >
      <motion.div
        className="w-8 h-8 rounded-full border flex items-center justify-center"
        animate={{
          scale: isPointer ? 1.6 : 1,
          backgroundColor: isPointer ? "rgba(34, 211, 238, 0.2)" : "rgba(34, 211, 238, 0)",
          borderColor: isPointer ? "rgba(34, 211, 238, 0.8)" : "rgba(34, 211, 238, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 28, mass: 0.4 }}
      >
        <motion.div 
          className="w-1.5 h-1.5 bg-cyan-400 rounded-full"
          animate={{
            opacity: isPointer ? 0 : 1,
            scale: isPointer ? 0 : 1
          }}
        />
      </motion.div>
    </div>
  );
};

export default CustomCursor;
