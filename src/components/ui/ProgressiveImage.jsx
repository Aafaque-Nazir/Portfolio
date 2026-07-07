import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ProgressiveImage = ({ src, alt, className = "", imgClassName = "", ...props }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentSrc, setCurrentSrc] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setIsLoaded(false);
    setCurrentSrc(null);
    
    const img = new Image();
    img.src = src;
    img.onload = () => {
      if (isMounted) {
        setCurrentSrc(src);
        setIsLoaded(true);
      }
    };

    return () => {
      isMounted = false;
    };
  }, [src]);

  return (
    <div className={`relative w-full h-full overflow-hidden bg-zinc-900/40 ${className}`}>
      <AnimatePresence>
        {!isLoaded && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="absolute inset-0 z-10 bg-white/[0.03] animate-pulse"
          />
        )}
      </AnimatePresence>

      {currentSrc && (
        <motion.img
          initial={{ opacity: 0, scale: 1.05, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          src={currentSrc}
          alt={alt}
          className={`w-full h-full object-cover ${imgClassName}`}
          {...props}
        />
      )}
    </div>
  );
};

export default ProgressiveImage;
